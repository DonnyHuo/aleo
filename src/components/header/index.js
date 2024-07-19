import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
  useDisconnect,
} from "@web3modal/ethers5/react";
import {
  shortStr,
  getContract,
  getWriteContractLoad,
  chainList,
  checkNetWork,
  sign,
} from "../../utils";
import { Drawer, notification, Button, Modal, Popover, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import erc20Abi from "../../asserts/abi/erc20Abi.json";
import { ethers } from "ethers";
import { useInterval } from "ahooks";
import { useTranslation } from "react-i18next";
import http from "../../request";
import md5 from "crypto-js/md5";
import { resources } from "../../config";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  const logoIcon = require("../../asserts/imgs/logo.png");
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const { open } = useWeb3Modal();

  const [openLang, setOpenLang] = useState(false);
  const langOpenChange = (value) => {
    setOpenLang(value);
  };

  const [currentLang, setCurrentLang] = useState(i18n.language);

  const selectNetworkIcon = (chainId) => {
    return chainList.filter((list) => list.chainId == chainId)[0];
  };

  const [openDrawer, setOpenDrawer] = useState(false);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  // get userID fun
  const dispatch = useDispatch();
  const inviteContract = useSelector((state) => state.inviteContract);

  const reModalOpen = useSelector(
    (state) => state.reModalOpen,
    (pre, next) => pre === next
  );

  const [showList, setShowList] = useState(false);

  const showLang = (lang) => {
    switch (lang) {
      case "en":
        return "English";
      case "ko":
        return "한국인";
      case "vi":
        return "Tiếng Việt";
      case "zh":
        return "简体中文";
      default:
        return "English";
    }
  };

  const LangList = () => {
    const langArr = [];
    for (let key in resources) {
      langArr.push(key);
    }

    return (
      <div className="cursor-pointer">
        {langArr.map((list, index) => {
          return (
            <div key={list}>
              <div className="text-left _text text-sm">
                <div
                  className={
                    "flex item-center justify-between rounded-md px-4 h-8 m-2"
                  }
                  onClick={() => {
                    setOpenLang(false);
                    setCurrentLang(list);
                    i18n.changeLanguage(list);
                    setOpenDrawer(false);
                    window.localStorage.setItem("lang", list);
                  }}
                >
                  <span>{showLang(list)}</span>
                  {i18n.language == list && (
                    <img
                      className="w-5 h-5"
                      src={require("../../asserts/imgs/selected.png")}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, [window.innerWidth]);

  const Ot = (f) => {
    let a = [];
    for (let u = 0; u < f.length; u++) {
      let s = f.charCodeAt(u);
      // no-unused-expressions
      s < 128
        ? a.push(s)
        : s < 2048
        ? a.push(192 | (s >> 6), 128 | (s & 63))
        : s < 55296 || s >= 57344
        ? a.push(224 | (s >> 12), 128 | ((s >> 6) & 63), 128 | (s & 63))
        : (u++,
          (s = 65536 + (((s & 1023) << 10) | (f.charCodeAt(u) & 1023))),
          a.push(
            240 | (s >> 18),
            128 | ((s >> 12) & 63),
            128 | ((s >> 6) & 63),
            128 | (s & 63)
          ));
    }
    return a;
  };

  const q = (f) => {
    return (
      "0x" +
      Ot(f)
        .map((s) => s.toString(16))
        .join("")
    );
  };

  // 获取签名
  const sigFun = async () => {
    if (!localStorage.getItem("sign") || model) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const addr = address.toLowerCase();

      const message = md5(addr + Date.now()).toString();

      const result = await provider.send("personal_sign", [q(message), addr]);

      console.log("result:", addr, message, result);
      loginFun(message, result);
    }
  };

  const [invitecode, setInvitecode] = useState("");

  const loginFun = (msg, sign) => {
    http
      .get("/NewLogin", {
        params: {
          address: address.toLowerCase(),
          msg: msg,
          sign: sign,
          invitecode: invitecode,
        },
      })
      .then((res) => {
        if (res.data.code == 200) {
          // http.defaults.headers.common["Authorization"] = res.data.data.token;
          if (res.data.data.token) {
            localStorage.setItem("sign", res.data.data.token);
            window.location.reload();
          } else {
            messageApi.open({
              type: "error",
              content: t("header.tips"),
              duration: 5,
            });
          }
        } else {
          localStorage.setItem("sign", "");
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.setItem("sign", "");
      });
  };
  useEffect(() => {
    address && sigFun();
  }, address);

  const change = () => {
    dispatch({ type: "CHANGE_USER", payload: Math.random() });
  };

  const [model, setModel] = useState(false);
  // 是否注册过
  const IsExists = () => {
    http
      .get("/IsExists", {
        params: {
          address: address.toLowerCase(),
        },
      })
      .then((res) => {
        if (!(res.data.data.is_exists * 1)) {
          setModel(true);
        } else {
          setModel(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    address && IsExists();
  }, address);

  const handleOk = () => {
    setModel(false);
  };
  const handleCancel = () => {
    setModel(false);
  };

  return (
    <div className="flex items-center justify-between pl-5 pr-5 text-white relative _header">
      <div>
        <Link to="" className="flex items-center justify-between">
          <img className="w-7 mt-4 mb-4" src={logoIcon} alt="" />
          <span className="pl-2 text-xl">Aleo</span>
        </Link>
      </div>
      {contextHolder}

      <div className="flex items-center">
        {isConnected && (
          <button
            className={`btnStyle p-2 text-sm mr-2 flex items-center border ${
              !selectNetworkIcon(chainId) ? "border-red-700" : "_border"
            }`}
            onClick={() => open({ view: "Networks" })}
          >
            {selectNetworkIcon(chainId) ? (
              <img
                className="w-5"
                src={selectNetworkIcon(chainId)?.url}
                alt=""
              />
            ) : (
              <>
                <img
                  className="w-5 _hiddenP"
                  src={require("../../asserts/imgs/warning.png")}
                  alt=""
                />

                <Popover
                  content={t("header.NetworkUnsupported")}
                  trigger="hover"
                  placement="bottom"
                  color={"#1C172A"}
                  overlayClassName="wrongNetwork"
                >
                  <span className="px-2 text-red-500 _hiddenM">
                    {t("header.WrongNetwork")}
                  </span>
                </Popover>
              </>
            )}
          </button>
        )}

        <button
          className={`btnStyle rounded-xl p-2 md:pl-4 md:pr-4 text-sm ${
            address ? "_borderW" : "pl-4 pr-4"
          }`}
        >
          {address ? (
            <div className="flex items-center justify-between">
              <img
                className="w-5"
                src={require("../../asserts/imgs/connect.png")}
                alt=""
              />
              <span className="pl-2">{shortStr(address, 5, 4)}</span>
            </div>
          ) : (
            <span className="text-sm" onClick={() => open()}>
              {t("header.connectWallet")}
            </span>
          )}
        </button>
        <div
          className="_hiddenP p-2 ml-2 btnStyle"
          onClick={() => {
            setOpenDrawer(true);
          }}
        >
          <img className="w-5" src={require("../../asserts/imgs/menu.png")} />
        </div>
      </div>
      <Modal
        title={t('header.register')}
        destroyOnClose={true}
        centered
        maskClosable={false}
        footer={false}
        closeIcon={
          <img
            className="w-6 mt-2 mr-2"
            src={require("../../asserts/imgs/closeModal.png")}
            alt=""
          />
        }
        width={450}
        zIndex={3000}
        open={model}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <div className="text-center">
            <input
              className="w-full h-12 bg-transparent border px-4"
              placeholder={t('header.invite')}
              type="text"
              value={invitecode}
              onChange={(e) => setInvitecode(e.target.value)}
            />
            <button
              className="mt-5 border px-10 py-2"
              onClick={() => {
                address && sigFun();
              }}
            >
              {t('header.registerI')}
            </button>
          </div>
        </div>
      </Modal>
      <Drawer
        width={"100vw"}
        closeIcon={false}
        onClose={onClose}
        open={openDrawer}
      >
        <div className="drawerTitle Medium">
          <div className="h-16 flex items-center">
            <img
              className="h-7 mt-1 mb-1"
              src={require("../../asserts/imgs/logo.png")}
              alt=""
            />
            <div className="text-xl ml-2">Aleo</div>
          </div>
          <div className="p-2 btnStyle">
            <img
              className="w-4"
              src={require("../../asserts/imgs/drawerClose.png")}
              onClick={onClose}
              alt=""
            />
          </div>
        </div>
        <div className="text-base Medium">
          <p className="pt-5 pb-2 ml-6 text"></p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/dashboard" ? "activeTitle" : ""
              }`}
              to="/"
            >
              <span> {t("navigate.navigate1")}</span>
            </Link>
          </p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/market" ? "activeTitle" : ""
              }`}
              to="/raise"
            >
              <span> {t("navigate.navigate2")}</span>
            </Link>
          </p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/liquidation" ? "activeTitle" : ""
              }`}
              to="/mine"
            >
              <span> {t("navigate.navigate3")}</span>
            </Link>
          </p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/liquidation" ? "activeTitle" : ""
              }`}
              to="/about"
            >
              <span> {t("navigate.navigate4")}</span>
            </Link>
          </p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <a className="ml-6 mr-6" href="https://aleo.org" target="_black">
              <span> {t("navigate.navigate5")}</span>
            </a>
          </p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <a
              className="ml-6 mr-6"
              href="https://t.me/AleoXClubzGroup"
              target="_black"
            >
              <span>{t("navigate.navigate6")}</span>
            </a>
          </p>
          <p
            className="pt-2 pb-5"
            onClick={() => setShowList((state) => (state = !state))}
          >
            <div className="ml-6 mr-6 flex items-center justify-between">
              <span>{t("header.Language")}</span>
              <div className="flex items-center">
                <span className="text-sm _text">{showLang(currentLang)}</span>
                <img
                  className={`w-4 ml-1 ${showList && "rotate-90"}`}
                  src={require("../../asserts/imgs/drawerRight.png")}
                  alt=""
                />
              </div>
            </div>
          </p>
          {showList && <LangList />}
        </div>
      </Drawer>
    </div>
  );
};

export default Header;

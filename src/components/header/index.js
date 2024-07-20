import { useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { shortStr } from "../../utils";
import { Drawer, Modal, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
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

  const [openLang, setOpenLang] = useState(false);

  const [currentLang, setCurrentLang] = useState(i18n.language);

  const [openDrawer, setOpenDrawer] = useState(false);

  const getChainId = async () => {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId * 1 !== "0x38") {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: "0x38",
          },
        ],
      });
    }
  };
  useEffect(() => {
    getChainId();
  }, []);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  // get userID fun
  const dispatch = useDispatch();
  const address = useSelector((state) => state.address);
  const token = useSelector((state) => state.token);

  const [showList, setShowList] = useState(false);

  const showLang = (lang) => {
    switch (lang) {
      case "en":
        return "English";
      case "zh":
        return "繁體中文";
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

  const [model, setModel] = useState(false);

  // 获取签名
  const sigFun = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const addr = address.toLowerCase();

    const message = md5(addr + Date.now()).toString();

    const result = await provider.send("personal_sign", [q(message), addr]);

    console.log("result:", addr, message, result);
    loginFun(message, result);
  };

  const [invitecode, setInvitecode] = useState("");

  useEffect(() => {
    const invitecode = location.search.split("=")[1];
    address && setInvitecode(invitecode);
  }, [address]);

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
          if (res.data.data.token) {
            dispatch({ type: "CHANGE_TOKEN", payload: res.data.data.token });
            setModel(false);
          } else {
            messageApi.open({
              type: "error",
              content: t("header.tips"),
              duration: 5,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    window.ethereum.on("accountsChanged", (accounts) => {
      dispatch({ type: "CHANGE_ADDRESS", payload: accounts[0] });
      dispatch({ type: "CHANGE_TOKEN", payload: "" });
    });
  }, [address]);

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    dispatch({ type: "CHANGE_ADDRESS", payload: accounts[0] });
  };

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
          sigFun();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    address && !token && IsExists();
  }, [address, token]); // eslint-disable-line react-hooks/exhaustive-deps

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
            <span className="text-sm" onClick={() => connectWallet()}>
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
        title={t("header.register")}
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
              placeholder={t("header.invite")}
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
              {t("header.registerI")}
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
                location.pathname === "/" ? "activeTitle" : ""
              }`}
              to="/"
            >
              <div className="flex items-center">
                <img
                  className="w-5"
                  src={
                    location.pathname === "/"
                      ? require("../../asserts/imgs/homeActive.png")
                      : require("../../asserts/imgs/home.png")
                  }
                />
                <span className="ml-2 pt-1">{t("navigate.navigate1")}</span>
              </div>
            </Link>
          </p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/raise" ? "activeTitle" : ""
              }`}
              to="/raise"
            >
              <div className="flex items-center">
                <img
                  className="w-5"
                  src={
                    location.pathname === "/raise"
                      ? require("../../asserts/imgs/raiseActive.png")
                      : require("../../asserts/imgs/raise.png")
                  }
                />
                <span className="ml-2 pt-1">{t("navigate.navigate2")}</span>
              </div>
            </Link>
          </p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/black" ? "activeTitle" : ""
              }`}
              to="/black"
            >
              <div className="flex items-center">
                <img
                  className="w-5"
                  src={
                    location.pathname === "/black"
                      ? require("../../asserts/imgs/powerActive.png")
                      : require("../../asserts/imgs/power.png")
                  }
                />
                <span className="ml-2 pt-1">{t("footer.tab2")}</span>
              </div>
            </Link>
          </p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/mine" ? "activeTitle" : ""
              }`}
              to="/mine"
            >
              <div className="flex items-center">
                <img
                  className="w-5"
                  src={
                    location.pathname === "/mine"
                      ? require("../../asserts/imgs/assetsActive.png")
                      : require("../../asserts/imgs/assets.png")
                  }
                />
                <span className="ml-2">{t("navigate.navigate3")}</span>
              </div>
            </Link>
          </p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <a
              className="ml-6 mr-6 block"
              href="https://aleo.org"
              target="_black"
            >
              <div className="flex items-center">
                <img
                  className="w-5"
                  src={require("../../asserts/imgs/website.png")}
                />
                <span className="ml-2"> {t("navigate.navigate5")}</span>
              </div>
            </a>
          </p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/computing" ? "activeTitle" : ""
              }`}
              to="/computing"
            >
              <div className="flex items-center">
                <img
                  className="w-5"
                  src={
                    location.pathname === "/power"
                      ? require("../../asserts/imgs/powerActive.png")
                      : require("../../asserts/imgs/power.png")
                  }
                />
                <span className="ml-2">{t("navigate.navigate8")}</span>
              </div>
            </Link>
          </p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/pledge" ? "activeTitle" : ""
              }`}
              to="/pledge"
            >
              <div className="flex items-center">
                <img
                  className="w-5"
                  src={
                    location.pathname === "/pledge"
                      ? require("../../asserts/imgs/pledgeActive.png")
                      : require("../../asserts/imgs/pledge.png")
                  }
                />
                <span className="ml-2">{t("navigate.navigate9")}</span>
              </div>
            </Link>
          </p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <a
              className="ml-6 mr-6 block"
              href="https://t.me/AleoXClubzGroup"
              target="_black"
            >
              <div className="flex items-center">
                <img
                  className="w-5"
                  src={require("../../asserts/imgs/server.png")}
                />
                <span className="ml-2 pt-1"> {t("navigate.navigate6")}</span>
              </div>
            </a>
          </p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/invite" ? "activeTitle" : ""
              }`}
              to="/invite"
            >
              <div className="flex items-center">
                <img
                  className="w-5"
                  src={
                    location.pathname === "/invite"
                      ? require("../../asserts/imgs/inviteActive.png")
                      : require("../../asserts/imgs/invite.png")
                  }
                />
                <span className="ml-2">{t("navigate.navigate7")}</span>
              </div>
            </Link>
          </p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/about" ? "activeTitle" : ""
              }`}
              to="/about"
            >
              <div className="flex items-center">
                <img
                  className="w-5"
                  src={
                    location.pathname === "/about"
                      ? require("../../asserts/imgs/aboutActive.png")
                      : require("../../asserts/imgs/about.png")
                  }
                />
                <span className="ml-2"> {t("navigate.navigate4")}</span>
              </div>
            </Link>
          </p>

          <p
            className="pt-8 pb-5"
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

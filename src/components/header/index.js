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
import { Drawer, notification, Button, Modal, Popover } from "antd";
import { useSelector, useDispatch } from "react-redux";
import erc20Abi from "../../asserts/abi/erc20Abi.json";
import { ethers } from "ethers";
import { useInterval } from "ahooks";
import { useTranslation } from "react-i18next";
import http from "../../request";
import md5 from "crypto-js/md5";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const logoIcon = require("../../asserts/imgs/logo.png");
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const { walletProvider } = useWeb3ModalProvider();

  const { open } = useWeb3Modal();

  // const { switchNetwork } = useSwitchNetwork();

  // useEffect(() => {
  //   isConnected && chainId && switchNetwork(chainList.filter(list=> list.chainId == chainId)[0].chainId);
  // }, [chainId, isConnected]);

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

  const [openUserAccount, setOpenUserAccount] = useState(false);

  const [api, contextHolder] = notification.useNotification({
    placement: "topRight",
    duration: 3,
    top: openUserAccount ? 120 : 0,
    maxCount: 10,
    zIndex: 100000,
  });

  const handleOpenChange = (newOpen) => {
    setOpenUserAccount(newOpen);
  };

  const { disconnect } = useDisconnect();

  const AccountContent = () => {
    const copy = (address) => {
      api["success"]({ message: "复制成功" });
      navigator.clipboard.writeText(address);
    };
    return (
      <div className="font-medium">
        {contextHolder}
        <div className="flex items-center justify-between border-zinc-800 cursor-pointer">
          <div className="flex items-center" onClick={() => copy(address)}>
            <img
              className="w-7"
              src={require("../../asserts/img/connect.png")}
              alt=""
            />
            <span className="px-2">{shortStr(address)}</span>

            <img
              className="w-4 cursor-pointer"
              src={require("../../asserts/img/copy.png")}
              alt=""
            />
          </div>
          <div
            className="rounded-xl _background3 p-2 flex items-center justify-center closeWallet"
            onClick={() => {
              setOpenUserAccount(false);
              disconnect();
              localStorage.setItem("sign", "");
            }}
          ></div>
        </div>
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
    if (!localStorage.getItem("sign")) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const addr = address.toLowerCase();

      const message = md5(addr + Date.now()).toString();

      const result = await provider.send("personal_sign", [q(message), addr]);

      console.log("result:", addr, message, result);
      loginFun(message, result);
    }
  };
  const loginFun = (msg, sign) => {
    http
      .get("/NewLogin", {
        params: {
          address: address.toLowerCase(),
          msg: msg,
          sign: sign,
          invitecode: "8UA0DJ",
        },
      })
      .then((res) => {
        if (res.data.code == 200) {
          // http.defaults.headers.common["Authorization"] = res.data.data.token;
          localStorage.setItem("sign", res.data.data.token);
          window.location.reload();
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
  }, [address]);

  const change = ()=>{
    dispatch({ type: "CHANGE_USER", payload: Math.random() });
  }

  return (
    <div className="flex items-center justify-between pl-5 pr-5 text-white relative _header">
      <div>
        <Link to="" className="flex items-center justify-between">
          <img className="w-7 mt-4 mb-4" src={logoIcon} alt="" />
          <span className="pl-2 text-xl">Aleo</span>
        </Link>
      </div>
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
                  src={require("../../asserts/img/warning.png")}
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
            <Popover
              content={<AccountContent />}
              trigger="click"
              placement="bottomRight"
              arrow={false}
              color={"#111"}
              open={openUserAccount}
              onOpenChange={handleOpenChange}
              overlayClassName="accountInfo"
            >
              <div className="flex items-center justify-between">
                <img
                  className="w-5"
                  src={require("../../asserts/img/connect.png")}
                  alt=""
                />
                <span className="pl-2 _hiddenM">{shortStr(address, 5, 4)}</span>
                <img
                  className="w-3 ml-2 mt-0.5 _hiddenM"
                  src={require("../../asserts/img/walletDown.png")}
                  alt=""
                />
              </div>
            </Popover>
          ) : (
            <span onClick={() => open()}>Connect Wallet</span>
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
              src={require("../../asserts/img/drawerClose.png")}
              onClick={onClose}
              alt=""
            />
          </div>
        </div>
        <div className="text-lg Medium">
          <p className="pt-5 pb-2 ml-6 text"></p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/dashboard" ? "activeTitle" : ""
              }`}
              to="/"
            >
              <span>首页</span>
            </Link>
          </p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/market" ? "activeTitle" : ""
              }`}
              to="/raise"
            >
              <span>募集</span>
            </Link>
          </p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/liquidation" ? "activeTitle" : ""
              }`}
              to="/mine"
            >
              <span>我的</span>
            </Link>
          </p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/liquidation" ? "activeTitle" : ""
              }`}
              to="/"
            >
              <span>关于我们</span>
            </Link>
          </p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/liquidation" ? "activeTitle" : ""
              }`}
              to="/"
            >
              <span>官网</span>
            </Link>
          </p>
          <p className="pt-2 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/liquidation" ? "activeTitle" : ""
              }`}
              to="/"
            >
              <span>客服</span>
            </Link>
          </p>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;

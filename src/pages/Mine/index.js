import { Modal, Button, message } from "antd";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import http from "../../request";
import {
  useWeb3ModalAccount,
  useDisconnect,
  useWeb3Modal,
} from "@web3modal/ethers5/react";
import { getWriteContractLoad } from "../../utils";
import claimRewardAbi from "../../asserts/abi/claimRewards.json";
import { useInterval } from "ahooks";
import { useTranslation } from "react-i18next";
import copy from "copy-to-clipboard";

const Mine = () => {
  const { t } = useTranslation();
  const { address } = useWeb3ModalAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  const [data, setData] = useState({
    symbol: [],
  });

  const [raiseData, setRaiseData] = useState();

  const [model, setModel] = useState(false);

  const getInfo = () => {
    http
      .get("/Aleo/RaisePage")
      .then((res) => {
        setRaiseData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    http
      .get("/Aleo/UserCenter")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    address && getInfo();
  }, address);

  useInterval(() => {
    address && getInfo();
  }, 5000);

  const handleCancel = () => {
    setModel(false);
  };

  const handleOk = () => {
    setModel(false);
  };

  const [assert, setAssert] = useState();

  const withDraw = (item) => {
    setModel(true);
    setAssert(item);
  };

  const [value, setValue] = useState("");

  const [errContent, setErrContent] = useState("");

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const goWithDraw = () => {
    if (value == "") {
      setErrContent(t("mine.tips1"));
      return setError(true);
    }
    const re = /^[0-9]+(\.?[0-9]+)?$/;

    if (!re.test(value)) {
      setErrContent(t("mine.tips1"));
      return setError(true);
    }
    if (value * 1 > assert.amount * 1) {
      setErrContent(t("noBalance"));
      setError(true);
    } else {
      setError(false);

      const coin = assert.name == "USDT" ? "SignUsdt" : "SignAleox";

      setLoading(true);

      http
        .get(`/Aleo/${coin}`, {
          params: {
            amount: value,
          },
        })
        .then((res) => {
          const dataS = res.data.data;

          claimFun(
            data.ClaimContract,
            dataS.token,
            dataS.amount,
            dataS.expirationTime,
            dataS.nonce,
            dataS.signature
          );
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  const [messageApi, contextHolder] = message.useMessage();

  const claimFun = (
    contractAddress,
    _tokenAddress,
    _claimAmount,
    _endTime,
    _nonce,
    _signature
  ) => {
    // let overrides = {
    //   gasLimit: 100000,
    //   gasPrice: ethers.utils.parseUnits("10", "gwei"),
    // };
    getWriteContractLoad(
      contractAddress,
      claimRewardAbi,
      "claim",
      _tokenAddress,
      _claimAmount,
      _endTime,
      _nonce,
      _signature
      // overrides
    )
      .then((res) => {
        console.log(res);
        setLoading(false);
        setModel(false);
        messageApi.open({
          type: "success",
          content: t("mine.withDrawS"),
          duration: 5,
        });
      })
      .catch((err) => {
        setLoading(false);
        setModel(false);
        console.log(err);
        messageApi.open({
          type: "error",
          content: t("mine.withDrawF"),
          duration: 5,
        });
      });
  };

  const copyUrl = (code) => {
    copy(code);
    message.success(t('header.copyS'));
  };
  return (
    <div className="contentHome">
      <div className="text-white text-left p-5">
        {contextHolder}
        <div className="text-base mt-2 mb-4 text-center">
          <span className="titleBg px-10 py-2">{t("mine.asserts")}</span>
        </div>
        <div className="border text-sm p-4 min-h-52">
          {data?.symbol.map((item, index) => {
            return (
              <div className="mb-4 " key={index}>
                <div>{item?.name}</div>
                <div className="flex items-center justify-between text">
                  <span className="">{item?.amount}</span>
                  {index !== 2 && (
                    <button
                      className="border py-1 px-4 text-white text-sm"
                      onClick={() => {
                        withDraw(item);
                        setValue("");
                        setError(false);
                      }}
                    >
                      {t("mine.withDraw")}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-base mt-10 mb-4 text-center">
          <span className="titleBg px-10 py-2"> {t("mine.raise")}</span>
        </div>
        <div className="border px-4 py-6 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center ">
              <img
                className="w-6 mr-2"
                src={require("../../asserts/imgs/usdt.png")}
              />
              <span> {t("mine.total")}</span>
            </div>
            <span>{raiseData?.raise.total}</span>
          </div>
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center">
              <img
                className="w-6 mr-2"
                src={require("../../asserts/imgs/usdt.png")}
              />
              <span>{t("mine.expected")}</span>
            </div>
            <span>{raiseData?.raise.total}</span>
          </div>
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center">
              <img
                className="w-6 mr-2"
                src={require("../../asserts/imgs/usdt.png")}
              />
              <span>{t("mine.finish")}</span>
            </div>
            <span>{raiseData?.raise.raised}</span>
          </div>
        </div>
      </div>
      <div className="text text-white text-sm px-5 flex items-center justify-between border p-5 m-5">
        <span>{t('header.invitation')}</span>
        <div className="flex items-center">
          <span>{data.invitecode}</span>
          <img
            className="w-4 ml-2"
            src={require("../../asserts/imgs/copy.png")}
            onClick={() => {
              copyUrl(data.invitecode);
            }}
          />
        </div>
      </div>

      <div className="text-center mt-10">
        {address ? (
          <button
            className="text-white border py-2 px-10"
            onClick={() => disconnect()}
          >
            {t("header.loginOut")}
          </button>
        ) : (
          <button
            className="text-white border py-2 px-10"
            onClick={() => open()}
          >
            {t("header.connectWallet")}
          </button>
        )}
      </div>

      <Modal
        title={`${t("mine.withDraw")} ${assert?.name}`}
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
          <div className="text-right mb-2 text-sm">
            <span> {t("mine.balance")}：</span>
            <span>{assert?.amount}</span>
            <span className="ml-1">{assert?.name}</span>
          </div>
          <div className="flex items-center justify-between border px-5 py-2">
            <input
              className="bg-transparent"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button className="text-sm" onClick={() => setValue(assert.amount)}>
              {t("mine.max")}
            </button>
          </div>
          {error && <div className="mt-2 pl-2 text-red-600">{errContent}</div>}
          <div className="flex items-center justify-center">
            <Button
              loading={loading}
              className="mt-5 border text-sm px-10 py-2 h-10"
              onClick={() => goWithDraw()}
            >
              {t("mine.withDraw")}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Mine;

import { Modal, Button, message } from "antd";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import http from "../../request";
import { getWriteContractLoad } from "../../utils";
import claimRewardAbi from "../../asserts/abi/claimRewards.json";
import { useInterval } from "ahooks";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

const Mine = () => {
  const { t } = useTranslation();
  const address = useSelector((state) => state.address);
  const token = useSelector((state) => state.token);

  const [data, setData] = useState({
    symbol: [],
  });
  const dispatch = useDispatch();

  const [blackData, setBlackData] = useState();

  const [model, setModel] = useState(false);

  const getInfo = () => {
    http
      .get("/Aleo/BlackHolePage")
      .then((res) => {
        setBlackData(res.data.data);
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
    token && getInfo();
  }, [token]);

  useInterval(() => {
    token && getInfo();
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

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    dispatch({ type: "CHANGE_ADDRESS", payload: accounts[0] });
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
          <span className="titleBg px-10 py-2">
            {t("mine.HashPowerTransfer")}
          </span>
        </div>
        <div className="border px-4 py-6 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center w-1/2">
              <img
                className="w-10 mr-2"
                src={require("../../asserts/imgs/ALEOX@2x.png")}
              />
              <div>
                <p>ALEOX_EREEZE</p>
                <p className="text text-sm">{data?.symbol[2]?.amount}</p>
              </div>
            </div>
            <img
                className="w-5 mr-2"
                src={require("../../asserts/imgs/transfer.png")}
              />
            <button className="border px-5 py-1" onClick={()=>message.info(t('mine.NotOpenYet'))}>{t('mine.saveTo')}</button>
          </div>
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center w-1/2">
              <img
                className="w-10 mr-2"
                src={require("../../asserts/imgs/AELO@2x.png")}
              />
              <div>
                <p>Aleo(cs) </p>
                <p className="text text-sm">{blackData?.Computing_power}</p>
              </div>
            </div>
            <img
                className="w-5 mr-2"
                src={require("../../asserts/imgs/transfer.png")}
              />
            <button className="border px-5 py-1" onClick={()=>message.info(t('mine.NotOpenYet'))}>{t('mine.saveTo')}</button>
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        {address ? (
          <button
            className="text-white border py-2 px-10"
            onClick={() => {
              dispatch({ type: "CHANGE_ADDRESS", payload: "" });
              dispatch({ type: "CHANGE_TOKEN", payload: "" });
            }}
          >
            {t("header.loginOut")}
          </button>
        ) : (
          <button
            className="text-white border py-2 px-10"
            onClick={() => connectWallet()}
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

import { Modal, Button, message } from "antd";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import http from "../../request";
import { useWeb3ModalAccount, useDisconnect, useWeb3Modal } from "@web3modal/ethers5/react";
import { getWriteContractLoad } from "../../utils";
import claimRewardAbi from "../../asserts/abi/claimRewards.json";

const Mine = () => {
  const { address } = useWeb3ModalAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  const [data, setData] = useState({
    symbol: [],
  });

  const [raiseData, setRaiseData] = useState()

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
        console.log("res.data.data", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    address && getInfo();
  }, address);

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
      setErrContent("请输入正确的数量");
      return setError(true);
    }
    const re = /^[0-9]+(\.?[0-9]+)?$/;

    if (!re.test(value)) {
      setErrContent("请输入正确的数量");
      return setError(true);
    }
    if (value * 1 > assert.amount * 1) {
      setErrContent("余额不足");
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
          const data = res.data.data;

          claimFun(
            data.token,
            data.amount,
            data.expirationTime,
            data.nonce,
            data.signature
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
    _tokenAddress,
    _claimAmount,
    _endTime,
    _nonce,
    _signature
  ) => {
    let overrides = {
      gasLimit: 100000,
      gasPrice: ethers.utils.parseUnits("10", "gwei"),
    };
    getWriteContractLoad(
      "0x6CaB4b5404126EC50922F565F165C5225B914588",
      claimRewardAbi,
      "claim",
      _tokenAddress,
      _claimAmount,
      _endTime,
      _nonce,
      _signature,
      overrides
    )
      .then((res) => {
        console.log(res);
        setLoading(false);
        messageApi.open({
          type: "success",
          content: "提取成功",
          duration: 5,
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        messageApi.open({
          type: "error",
          content: "提取失败",
          duration: 5,
        });
      });
  };

  return (
    <div className="contentHome">
      <div className="text-white text-left p-5">
        {contextHolder}
        <div className="text-base mt-2 mb-4 text-center">
          <span className="titleBg px-10 py-2">我的资产</span>
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
                      提取
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-base mt-10 mb-4 text-center">
          <span className="titleBg px-10 py-2">个人募集</span>
        </div>
        <div className="border px-4 py-6 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center ">
              <img
                className="w-6 mr-2"
                src={require("../../asserts/imgs/usdt.png")}
              />
              <span>总募集量</span>
            </div>
            <span>{raiseData?.raise.total}</span>
          </div>
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center">
              <img
                className="w-6 mr-2"
                src={require("../../asserts/imgs/usdt.png")}
              />
              <span>预计募集</span>
            </div>
            <span>{raiseData?.raise.total}</span>
          </div>
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center">
              <img
                className="w-6 mr-2"
                src={require("../../asserts/imgs/usdt.png")}
              />
              <span>已完成量</span>
            </div>
            <span>{raiseData?.raise.raised}</span>
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        {address ? (
          <button
            className="text-white border py-2 px-10"
            onClick={() => disconnect()}
          >
            退出登录
          </button>
        ) : (
          <button
            className="text-white border py-2 px-10"
            onClick={() => open()}
          >
            连接钱包
          </button>
        )}
      </div>

      <Modal
        title={`提取 ${assert?.name}`}
        destroyOnClose={true}
        centered
        maskClosable={false}
        footer={false}
        closeIcon={
          <img
            className="w-6 mt-2 mr-2"
            src={require("../../asserts/img/closeModal.png")}
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
            <span>余额：</span>
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
              最大
            </button>
          </div>
          {error && <div className="mt-2 pl-2 text-red-600">{errContent}</div>}
          <div className="flex items-center justify-center">
            <Button
              loading={loading}
              className="mt-5 border text-sm px-10 py-2 h-10"
              onClick={() => goWithDraw()}
            >
              提取
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Mine;

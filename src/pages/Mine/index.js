import { Modal, Button } from "antd";

import { useEffect, useState } from "react";
import http from "../../request";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";

const Mine = () => {
  const { address } = useWeb3ModalAccount();

  const [data, setData] = useState({
    symbol: [],
  });

  const [model, setModel] = useState(false);

  const getInfo = () => {
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
          console.log("res.data.data", res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  return (
    <div className="contentHome">
      <div className="text-white text-left p-5">
        <div className="text-lg mt-2 mb-4">我的资产</div>
        <div className="border p-4 min-h-52">
          {data?.symbol.map((item, index) => {
            return (
              <div className="mb-4 " key={index}>
                <div>{item?.name}</div>
                <div className="flex items-center justify-between text">
                  <span className="">{item?.amount}</span>
                  {index !== 2 && (
                    <button
                      className="border py-1 px-4 text-white"
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

        <div className="text-lg mt-10 mb-4">个人募集</div>
        <div className="border px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                className="w-8 mr-2"
                src={require("../../asserts/imgs/usdt.png")}
              />
              <span>总募集量</span>
            </div>
            <span>21312312</span>
          </div>
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center">
              <img
                className="w-8 mr-2"
                src={require("../../asserts/imgs/usdt.png")}
              />
              <span>预计募集</span>
            </div>
            <span>21312312</span>
          </div>
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center">
              <img
                className="w-8 mr-2"
                src={require("../../asserts/imgs/usdt.png")}
              />
              <span>已完成量</span>
            </div>
            <span>212.312</span>
          </div>
        </div>
      </div>
      <Modal
        title={`提取 ${assert?.name}`}
        destroyOnClose={true}
        centered
        maskClosable={false}
        footer={false}
        closeIcon={
          <img
            className="w-7 mt-3 mr-2"
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
          <div className="text-right mb-2">
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
            <button
              className="text-base"
              onClick={() => setValue(assert.amount)}
            >
              最大
            </button>
          </div>
          {error && <div className="mt-2 pl-2 text-red-600">{errContent}</div>}
          <div className="flex items-center justify-center">
            <Button
              loading={loading}
              className="mt-5 border text-base px-10 py-2 h-10"
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

import { ethers } from "ethers";
import { Progress } from "antd";
import { useEffect, useState } from "react";
import http from "../../request";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { getWriteContractLoad } from "../../utils";
import erc20Abi from "../../asserts/abi/erc20Abi.json";

const Raise = () => {
  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const [data, setData] = useState({
    raise: {
      total: "",
      raised: "",
    },
    type_list: [],
    raised_order: [],
  });

  const getInfo = () => {
    http
      .get("/Aleo/RaisePage")
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

  const transfer = (amount) => {
    getWriteContractLoad(
      walletProvider,
      "0xeFd73479d675D760ecd0a19c18eB16657327882A",
      erc20Abi,
      "transfer",
      data.to_address,
      ethers.utils.parseUnits(amount, 6)
    )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="contentHome">
      <div className="text-white text-left p-5">
        <img className="" src={require("../../asserts/imgs/raisebanner.png")} />
        <div className="text-lg mt-10">参与额度</div>
        <div className="flex items-center flex-wrap">
          {data?.type_list.map((item) => {
            return (
              <div
                className="ml-2 mt-4"
                key={item.id}
                onClick={() => {
                  transfer(item.amount);
                }}
              >
                <button className="btn px-2 py-1"> {item.title}</button>
              </div>
            );
          })}
        </div>

        <div className="text-lg mt-10 mb-4">第六期额度</div>
        <Progress percent={50} showInfo={false} />
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <img
              className="w-6 mr-2"
              src={require("../../asserts/imgs/usdt.png")}
            />
            <span>
              {(data?.raise.raised * 1).toFixed(2)} /
              {(data?.raise.total * 1).toFixed(2)}
            </span>
          </div>
          <div>
            {(data?.raise.raised * 100) / (data?.raise.total * 1).toFixed(2)}%
          </div>
        </div>
        <div className="text-lg mt-10 mb-4">募集</div>
        <div className="border p-5 text-left">
          <div className="flex items-center justify-between text-sm">
            <span className="w-1/3">募集时间</span>
            <span className="w-1/3 text-center">募集数量</span>
            <span className="w-1/3 text-right">募集状态</span>
          </div>
          <div className="mt-4 text text-left">
            {data?.raised_order.map((item, index) => {
              return (
                <div className="flex items-center justify-between" key={index}>
                  <span className="w-1/3 ">{item.time}</span>
                  <span className="w-1/3 text-center">
                    {(item.amount * 1).toFixed(2)}
                  </span>
                  <span className="w-1/3 text-right">{item.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Raise;

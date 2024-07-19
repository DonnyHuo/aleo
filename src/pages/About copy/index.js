import { Button } from "antd";
import {
  useWeb3ModalAccount,
  useDisconnect,
  useWeb3Modal,
} from "@web3modal/ethers5/react";
import { useState, useEffect } from "react";
import http from "../../request";
import { useInterval } from "ahooks";

const Black = () => {
  const { address } = useWeb3ModalAccount();

  const [data, setData] = useState();
  const getInfo = () => {
    http
      .get("/Aleo/BlackHolePage")
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
  useInterval(() => {
    address && getInfo();
  }, 5000);
  return (
    <div className="contentHome text-white">
      <div className="p-5 text-center text-sm">
        <img
          className="m-auto w-1/2"
          src={require("../../asserts/imgs/logo.png")}
        />
        <div className="mt-10 mb-5 text-base">
          <span className=" titleBg px-10 py-2">
            全网黑洞销毁总量：{data?.total_amount}
          </span>
        </div>
        <div className="border px-5 py-8 mt-5">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text">ALEO算力（CS）</p>
              <p className="mt-4 text-base">{data?.Computing_power}</p>
            </div>
            <div className="text-center">
              <p className="text">个人销毁</p>
              <p className="mt-4 text-base">{data?.Personal_Destruction}</p>
            </div>
          </div>
          {/* <Button className="border border-1 mt-10 px-16 py-2 h-12">
            点击销毁
          </Button> */}
        </div>
        <div className="mt-10 mb-5 text-base">
          <span className="titleBg px-10 py-2">排行</span>
        </div>
        <div className="border px-5 py-8 mt-5 text-white">
          <div className="flex items-center justify-between">
            <span>时间</span>
            <span>数量</span>
            <span>地址</span>
          </div>
          <div className="text text-sm mt-4">
            {data?.rankings.length > 0 ? (
              <div>
                {data?.rankings.map((item, index) => {
                  return (
                    <div
                      className="flex items-center justify-between py-1"
                      key={index}
                    >
                      <div>{item.time}</div>
                      <div>{item.amount}</div>
                      <div>{item.address}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-20 flex items-center justify-center">
                无数据
              </div>
            )}
          </div>
        </div>
        <div className="mt-10 mb-5 text-base">
          <span className="titleBg px-10 py-2">规则介绍</span>
        </div>
        <div className="border px-5 py-8 mt-5 text-left">
          <div className="flex items-center">
            <div className="text-base w-32 mr-5">黑洞獲利</div>
            <div className="w">
              5萬枚 AleoX 起往黑洞打入 加權分配 60萬 CCS Aleo 礦機算力
            </div>
          </div>
          <div className="mt-5 text-sm">
            例如: 第1天有10人,每人往黑洞打入5萬枚 AleoX那麽就由這10人分配 60萬
            CCS Aleo 礦機算力 第2天如果有50人,往黑洞打入AleoX那麽就由這50人分配
            60萬 CCS Aleo 礦機算力,以此類推...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Black;

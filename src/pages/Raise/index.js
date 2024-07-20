import { ethers } from "ethers";
import { Progress, message } from "antd";
import { useEffect, useState } from "react";
import http from "../../request";
import { getWriteContractLoad, getContract } from "../../utils";
import erc20Abi from "../../asserts/abi/erc20Abi.json";
import { useInterval } from "ahooks";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Raise = () => {
  const { t } = useTranslation();
  const address = useSelector((state) => state.address);
  const token = useSelector((state) => state.token);
  const [messageApi, contextHolder] = message.useMessage();

  const [data, setData] = useState({
    raise: {
      total: "",
      raised: "",
    },
    type_list: [],
    raised_order: [],
  });

  const [usdtAddress, setUsdtAddress] = useState(
    "0x55d398326f99059ff775485246999027b3197955"
  );

  const getInfo = () => {
    http
      .get("/Aleo/RaisePage")
      .then((res) => {
        setData(res.data.data);
        setUsdtAddress(res.data.data.contract);
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

  const transfer = async (amount) => {
    console.log("usdtAddress", usdtAddress);
    const decimals = await getContract(usdtAddress, erc20Abi, "decimals");

    const usdtBalance = await getContract(
      usdtAddress,
      erc20Abi,
      "balanceOf",
      address
    );

    const balance = ethers.utils.formatUnits(usdtBalance, decimals);

    if (balance * 1 >= amount * 1) {
      getWriteContractLoad(
        usdtAddress,
        erc20Abi,
        "transfer",
        data.to_address,
        ethers.utils.parseUnits(amount, decimals)
      )
        .then((res) => {
          messageApi.open({
            type: "success",
            content: "参与成功",
            duration: 5,
          });
          getInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      messageApi.open({
        type: "error",
        content: t("noBalance"),
        duration: 5,
      });
    }
  };
  return (
    <div className="contentHome">
      {contextHolder}
      <div className="text-white text-left p-5">
        {/* <img className="" src={require("../../asserts/imgs/raisebanner.png")} /> */}
        <div>
          <div className="flex items-center justify-between">
            <img className="w-1/3 h-32"
              src={require("../../asserts/imgs/bannerRaise1.png")}
            />
            <img className="pl-2 h-32 w-2/3"
              src={require("../../asserts/imgs/bannerRaise2.png")}
            />
          </div>
          <img
            className="w-full mt-2"
            src={require("../../asserts/imgs/bannerRaise3.png")}
          />
        </div>
        <div className="text-base mt-10 text-center">
          <span className="titleBg px-10 py-2">{t("raise.title1")}</span>
        </div>
        <div className="flex items-center flex-wrap min-h-28 text-sm">
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

        <div className="text-base mt-10 mb-4 text-center">
          <span className="titleBg px-10 py-2">Aleox</span>
        </div>
        <Progress
          percent={data?.raise.raised / data?.raise.total}
          showInfo={false}
        />
        <div className="flex items-center justify-between mt-2 text-sm">
          <div className="flex items-center">
            <img
              className="w-6 mr-2"
              src={require("../../asserts/imgs/usdt.png")}
            />
            <span>
              {(data?.raise.raised * 1).toFixed(2)}/
              {(data?.raise.total * 1).toFixed(2)}
            </span>
          </div>
          <div>
            {data?.raise.raised
              ? ((data?.raise.raised * 100) / (data?.raise.total * 1)).toFixed(
                  2
                )
              : "--"}
            %
          </div>
        </div>
        <div className="text-base mt-10 mb-4 text-center">
          <span className="titleBg px-10 py-2">{t("raise.title2")}</span>
        </div>
        <div className="border p-5 text-left">
          <div className="flex items-center justify-between text-sm">
            <span className="w-1/3">{t("raise.time")}</span>
            <span className="w-1/3 text-center">{t("raise.amount")}</span>
            <span className="w-1/3 text-right">{t("raise.status")}</span>
          </div>
          <div className="mt-4 text text-left">
            {data?.raised_order.length > 0 ? (
              <>
                {data?.raised_order.map((item, index) => {
                  return (
                    <div
                      className="flex items-center justify-between"
                      key={index}
                    >
                      <span className="w-1/3 ">{item.time}</span>
                      <span className="w-1/3 text-center">
                        {(item.amount * 1).toFixed(2)}
                      </span>
                      <span className="w-1/3 text-right">{item.status}</span>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="text-center min-h-20 flex items-center justify-center text-sm">
                {t("black.noData")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Raise;

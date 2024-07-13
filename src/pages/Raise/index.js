import { Link } from "react-router-dom";
import { Progress } from "antd";

const Raise = () => {
  return (
    <div className="contentHome">
      <div className="text-white text-center p-5">
        <img className="" src={require("../../asserts/imgs/raisebanner.png")} />
        <div className="text-lg mt-10 mb-4">第六期额度</div>
        <Progress percent={50} showInfo={false} />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img className="w-6" src={require("../../asserts/imgs/usdt.png")} />
            <span>0.00 / 1,500,000.00</span>
          </div>
          <div>30%</div>
        </div>
        <div className="text-lg mt-10 mb-4">募集</div>
        <div className="border p-5 text-left">
        <div className="flex items-center justify-between">
          <span className="w-1/3">募集时间</span>
          <span className="w-1/3 text-center">募集数量</span>
          <span className="w-1/3 text-right">募集状态</span>
        </div>
        <div className="mt-4 text text-left">
          <div className="flex items-center justify-between">
            <span className="w-1/3 ">2024.07.11</span>
            <span className="w-1/3 text-center">13213</span>
            <span className="w-1/3 text-right">成功</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="w-1/3 ">2024.07.11</span>
            <span className="w-1/3 text-center">13213</span>
            <span className="w-1/3 text-right">成功</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
export default Raise;

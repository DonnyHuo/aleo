import { Link } from "react-router-dom";

const Mine = () => {
  return (
    <div className="contentHome">
      <div className="text-white text-left p-5">
        <div className="text-lg mt-2 mb-4">我的资产</div>
        <div className="border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img className="w-8 mr-2" src={require("../../asserts/imgs/usdt.png")} />
              <span>32132.00</span>
            </div>
            <img className="w-6" src={require("../../asserts/imgs/record.png")} />
          </div>
          <div className="flex items-center mt-5">
            <button className="border p-2 w-1/2 mr-2">存入</button>
            <button className="border p-2 w-1/2">提取</button>
          </div>
        </div>

        <div className="text-lg mt-10 mb-4">个人募集</div>
        <div className="border px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img className="w-8 mr-2" src={require("../../asserts/imgs/usdt.png")} />
              <span>总募集量</span>
            </div>
            <span>21312312</span>
          </div>
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center">
              <img className="w-8 mr-2" src={require("../../asserts/imgs/usdt.png")} />
              <span>预计募集</span>
            </div>
            <span>21312312</span>
          </div>
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center">
              <img className="w-8 mr-2" src={require("../../asserts/imgs/usdt.png")} />
              <span>已完成量</span>
            </div>
            <span>212.312</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Mine;

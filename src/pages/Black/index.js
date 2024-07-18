import { Button } from "antd";
const Black = () => {
  return (
    <div className="contentHome text-white">
      <div className="p-5 text-center text-sm">
        <img
          className="m-auto w-1/2"
          src={require("../../asserts/imgs/logo.png")}
        />
        <div className="mt-10 mb-5 text-base">
          <span className=" titleBg px-10 py-2">全网黑洞销毁总量：000000</span>
        </div>
        <div className="border px-5 py-8 mt-5">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text">ALEO算力（CS）</p>
              <p className="mt-4 text-base">32312</p>
            </div>
            <div className="text-center">
              <p className="text">个人销毁</p>
              <p className="mt-4 text-base">1000</p>
            </div>
            <div className="text-center">
              <p className="text">ALEO算力</p>
              <p className="mt-4 text-base">1000</p>
            </div>
          </div>
          <Button className="border border-1 mt-10 px-16 py-2 h-12">
            点击销毁
          </Button>
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
          <div className="text">
            <div className="flex items-center justify-between mt-5 mb-3">
              <span>2024.02.03</span>
              <span>321312</span>
              <span>0x3213219321</span>
            </div>
            <div className="flex items-center justify-between">
              <span>2024.02.03</span>
              <span>321312</span>
              <span>0x3213219321</span>
            </div>
          </div>
        </div>
        <div className="mt-10 mb-5 text-base">
          <span className="titleBg px-10 py-2">规则介绍</span>
        </div>
        <div className="border px-5 py-8 mt-5 text-left">
          规则介绍规则介绍规则介绍规则介绍规则介绍规则介绍规则介绍规则介绍规则介绍规则介绍
        </div>
      </div>
    </div>
  );
};

export default Black;

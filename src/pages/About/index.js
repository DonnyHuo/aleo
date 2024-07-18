import { Button } from "antd";

const About = () => {
  return (
    <div className="contentHome text-white">
      <div className="text-center py-5 text-base Medium">关于我们</div>
      <div className="text-center text-sm">
        <div className="p-5">
          <img
            className="m-auto w-2/3"
            src={require("../../asserts/imgs/logo.png")}
          />

          <div className="mt-10 mb-5 text-base">
            <span className="titleBg px-10 py-2">AleoX</span>
          </div>
          <div className="text-sm text-center px-5 leading-6">
            AleoX赏金计划是由Aleo投资机构Slow Ventures发起 Slow
            Ventures是一家总部位于旧金山的风险投资机构 其投资和关注领域非常广泛
          </div>
        </div>
        <img
          className="my-5 w-full"
          src={require("../../asserts/imgs/aboutBanner.png")}
        />
        <div className="p-5 leading-6">
          <p>赏金计划是首个社区的形式来推动Aleo隐私技术 </p>
          <p>让更多人知道零知识证明</p>
          <p>打破寡头垄断，重塑隐私共识之路 </p>
          <p>见证区块链技术的腾飞，时代潮流无人可挡</p>
          <p>为时代而来为革命而生</p>
        </div>
      </div>
    </div>
  );
};

export default About;

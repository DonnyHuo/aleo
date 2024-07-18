import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="contentHome">
      <div className="text-white text-center">
        <img
          className="w-full"
          src={require("../../asserts/imgs/banner.png")}
        />
        <div className="px-5 pb-32 pt-5 text-left">
          <div className="text-sm">公告：新版本即将上线</div>
          <div className="_title text-xl py-5 Medium">
            <p>全面解析Aleo</p>
            <p>帮助大家更深入地认识这个项目</p>
          </div>
          <div className="pb-5 text-sm">
            隐私保护/可编程性/可扩展性/合规性/经济模型
          </div>
          <div className="text pb-2 text-sm">
            Aleo是一个致力于提供完全私有应用程序的Layer
            1区块链项目，它采用了零知识证明（ZKP）技术，为用户提供了具有绝对隐私的无限计算。Aleo的愿景是构建一个默认为私有、开源的区块链，解决区块链隐私保护的缺点，让用户能够访问真正个性化的Web服务世界，在得到隐私保障的同时管理自己的数据，享受高效、安全的网络服务。
          </div>
          <div className="text pb-2 text-sm">
            随着区块链技术的不断发展和普及，隐私保护成为了区块链领域的重要议题。Aleo作为第一个采用零知识证明技术的Layer
            1区块链项目，其在隐私保护方面的优势将逐渐凸显出来。未来，Aleo有望在Web3隐私赛道上脱颖而出，成为行业的独角兽。
          </div>
          <div className="text pb-4 text-sm">
            Aleo也在不断完善自身的技术和生态。随着新功能的不断推出和生态系统的不断拓展，Aleo将吸引更多的开发者和用户加入其中，共同推动区块链技术的发展和应用。
          </div>
          <img
            className="w-fll"
            src={require("../../asserts/imgs/banner1.png")}
          />
          <div className="_title text-xl pt-10 pb-5 Medium">隐私保护：</div>
          <div className="pb-2 text-sm">Aleo采用零知识证明技术</div>
          <div className="text text-sm">
            在数字时代，隐私保护成为了人们日益关注的问题。Aleo采用零知识证明技术，确保用户数据在区块链上的安全性和隐私性。这种技术使得用户可以在不透露任何个人信息的情况下进行交易和交互，有效避免了数据泄露的风险
          </div>
          <div className="_title text-xl pt-10 pb-5 Medium">可编程性：</div>
          <div className="pb-2 text-sm">ZK在应用栈各层面均可编程</div>
          <div className="text pb-5 text-sm">
            Aleo提供了全栈的零知识证明解决方案，使得ZK在应用栈各层面均可编程。这为开发者提供了巨大的灵活性，他们可以轻松地在Aleo平台上构建各种去中心化应用，实现大规模去中心化私有计算。
          </div>
          <img
            className="w-fll"
            src={require("../../asserts/imgs/banner2.png")}
          />

          <div className="_title text-xl pt-10 pb-5 Medium">可扩展性：</div>
          <div className="pb-2 text-sm">以太坊所有的灵活性</div>
          <div className="text pb-5 text-sm">
            Aleo通过优化的可扩展架构，带来了以太坊所有的灵活性。矿工无需重复每笔交易，只需验证正确性即可，这大大降低了交易成本，提高了交易效率。
          </div>
          <img
            className="w-fll"
            src={require("../../asserts/imgs/banner3.png")}
          />
          <div className="_title text-xl pt-10 pb-5 Medium">合规性：</div>
          <div className="pb-2 text-sm">
            Aleo构建了安全、合规和公平的Web标准
          </div>
          <div className="text pb-5 text-sm">
            基于零知识证明密码学，Aleo构建了安全、合规和公平的Web标准。这为用户提供了“选择退出隐私”的选项，有效减轻了数据泄露的影响，同时也满足了监管机构的合规要求。
          </div>

          <img
            className="w-fll"
            src={require("../../asserts/imgs/banner4.png")}
          />

          <div className="_title text-xl pt-10 pb-5 Medium">经济模型：</div>
          <div className="pb-2 text-sm">
            Aleo具备稳定的代币经济和可预测的价格
          </div>
          <div className="text pb-5 text-sm">
            Aleo具备稳定的代币经济和可预测的价格，为零知识证明密码学在下一代计算领域的实现打下了坚实基础。这为投资者提供了稳定的投资回报预期，吸引了众多资本进入这个领域。
          </div>
          <img
            className="w-fll"
            src={require("../../asserts/imgs/banner5.png")}
          />
          <div className="text-xl text-center pt-14 pb-5">合作机构</div>
          <div className="flex flex-wrap">
            <img
              className="w-1/3"
              src={require("../../asserts/imgs/wallet1.png")}
            />
            <img
              className="w-1/3"
              src={require("../../asserts/imgs/wallet2.png")}
            />
            <img
              className="w-1/3"
              src={require("../../asserts/imgs/wallet3.png")}
            />
            <img
              className="w-1/3"
              src={require("../../asserts/imgs/wallet4.png")}
            />
            <img
              className="w-1/3"
              src={require("../../asserts/imgs/wallet5.png")}
            />
            <img
              className="w-1/3"
              src={require("../../asserts/imgs/wallet6.png")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;

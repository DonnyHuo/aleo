import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const App = () => {
  const { t } = useTranslation();

  return (
    <div className="contentHome">
      <div className="text-white text-center">
        <img
          className="w-full"
          src={require("../../asserts/imgs/banner.png")}
        />
        <div className="px-5 pb-32 pt-5 text-left">
          <div className="text-sm">{t("home.announcement")}</div>
          <div className="_title text-xl py-5 Medium">
            <p>{t("home.title1")}</p>
            <p>{t("home.title2")}</p>
          </div>
          <div className="pb-5 text-sm">{t("home.nav_title_01")}</div>
          <div className="text pb-2 text-sm">{t("home.desc_01")}</div>
          <div className="text pb-2 text-sm">{t("home.desc_02")}</div>
          <div className="text pb-4 text-sm">{t("home.desc_03")}</div>
          <img
            className="w-fll"
            src={require("../../asserts/imgs/banner1.png")}
          />
          <div className="_title text-xl pt-10 pb-5 Medium">
            {" "}
            {t("home.nav_title_02")}
          </div>
          <div className="pb-2 text-sm">{t("home.desc_11")}</div>
          <div className="text text-sm">{t("home.desc_12")}</div>
          <div className="_title text-xl pt-10 pb-5 Medium">
            {" "}
            {t("home.nav_title_03")}
          </div>
          <div className="pb-2 text-sm">{t("home.desc_21")}</div>
          <div className="text pb-5 text-sm">{t("home.desc_22")}</div>
          <img
            className="w-fll"
            src={require("../../asserts/imgs/banner2.png")}
          />

          <div className="_title text-xl pt-10 pb-5 Medium">
            {" "}
            {t("home.nav_title_04")}
          </div>
          <div className="pb-2 text-sm">{t("home.desc_31")}</div>
          <div className="text pb-5 text-sm">{t("home.desc_32")}</div>
          <img
            className="w-fll"
            src={require("../../asserts/imgs/banner3.png")}
          />
          <div className="_title text-xl pt-10 pb-5 Medium">
            {" "}
            {t("home.nav_title_05")}
          </div>
          <div className="pb-2 text-sm">{t("home.desc_41")}</div>
          <div className="text pb-5 text-sm">{t("home.desc_42")}</div>

          <img
            className="w-fll"
            src={require("../../asserts/imgs/banner4.png")}
          />

          <div className="_title text-xl pt-10 pb-5 Medium">
            {" "}
            {t("home.nav_title_06")}
          </div>
          <div className="pb-2 text-sm">{t("home.desc_51")}</div>
          <div className="text pb-5 text-sm">{t("home.desc_52")}</div>
          <img
            className="w-fll"
            src={require("../../asserts/imgs/banner5.png")}
          />
          <div className="text-xl text-center pt-14 pb-5">
            {" "}
            {t("home.nav_title_07")}
          </div>
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

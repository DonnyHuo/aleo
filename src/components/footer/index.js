import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div
      className="fixed bottom-0 left-0 w-full h-14"
      style={{ background: "#1F1F1E" }}
    >
      <div className="text-white flex items-center justify-around p-2 text-sm">
        <div className="flex flex-col items-center">
          <Link to="/raise" className="flex flex-col items-center">
            <img
              className="w-5"
              src={require("../../asserts/imgs/icon1.png")}
            />
            <p className="pt-1.5 text-xs">{t("footer.tab1")}</p>
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <Link to="/black" className="flex flex-col items-center">
            <img
              className="w-5"
              src={require("../../asserts/imgs/icon2.png")}
            />
            <p className="pt-1.5 text-xs">{t("footer.tab2")}</p>
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <Link to="/" className="flex flex-col items-center">
            <img
              className="w-5"
              src={require("../../asserts/imgs/icon3.png")}
            />
            <p className="pt-1.5 text-xs">{t("footer.tab3")}</p>
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <Link to="/" className="flex flex-col items-center">
            <img
              className="w-5"
              src={require("../../asserts/imgs/icon4.png")}
            />
            <p className="pt-1.5 text-xs">{t("footer.tab4")}</p>
          </Link>
        </div>
        <div className="">
          <Link to="/mine" className="flex flex-col items-center">
            <img
              className="w-5"
              src={require("../../asserts/imgs/icon5.png")}
            />
            <p className="pt-1.5 text-xs">{t("footer.tab5")}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;

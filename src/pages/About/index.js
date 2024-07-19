import { Button } from "antd";
import { useTranslation } from "react-i18next";
const About = () => {
  const {t} = useTranslation()
  return (
    <div className="contentHome text-white">
      <div className="text-center py-5 text-base Medium">{t('about.aboutUs')}</div>
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
           {t('about.des1')}
          </div>
        </div>
        <img
          className="my-5 w-full"
          src={require("../../asserts/imgs/aboutBanner.png")}
        />
        <div className="p-5 leading-6">
        {t('about.des2')}
        </div>
      </div>
    </div>
  );
};

export default About;

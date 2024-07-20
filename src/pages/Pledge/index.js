import { useTranslation } from "react-i18next";
const Pledge = () => {
  const { t } = useTranslation();
  return <div className="contentHome text-white">
    <div className="contentHome text-white">
      <div className="m-auto text-center pt-52 text-base flex flex-col items-center">
        <img
          className="w-14"
          src={require("../../asserts/imgs/comeSoon.png")}
        />
        <span className="mt-4"> {t("comingSoon")}</span>
      </div>
    </div>
  </div>;
};
export default Pledge;

import { useTranslation } from "react-i18next";

const Team = () => {
  const { t } = useTranslation();
  return (
    <div className="contentHome text-white">
      <div className="text-center my-5 text-base">{t("team.myTeam")}</div>
      <div className="border mx-5 p-5 text-center">
        <div className="flex items-center justify-between text-sm mb-7">
          <span className="w-1/4 text-left">{t("team.time")}</span>
          <span className="w-1/4">{t("team.number")}</span>
          <span className="w-1/4">{t("team.TeamPerformance")}</span>
          <span className="w-1/4 text-right">{t("team.address")}</span>
        </div>
        <div className="flex items-center justify-between text-sm text mt-2">
          <span className="w-1/4 text-left">2024.07.11</span>
          <span className="w-1/4">1</span>
          <span className="w-1/4">2</span>
          <span className="w-1/4 text-right">sas…qu1e</span>
        </div>
        <div className="flex items-center justify-between text-sm text mt-2">
          <span className="w-1/4 text-left">2024.07.11</span>
          <span className="w-1/4">1</span>
          <span className="w-1/4">2</span>
          <span className="w-1/4 text-right">sas…qu1e</span>
        </div>
      </div>
    </div>
  );
};

export default Team;

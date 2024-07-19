import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import http from "../../request";
import { useInterval } from "ahooks";

const Team = () => {
  const { t } = useTranslation();
  const address = useSelector((state) => state.address);

  const [data, setData] = useState("");
  const getInfo = () => {
    http
      .get("/Aleo/UserCenter")
      .then((res) => {
        setData(res.data.data.recommend);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    address && getInfo();
  }, [address]);

  useInterval(() => {
    address && getInfo();
  }, 5000);

  return (
    <div className="contentHome text-white">
      <div className="text-center my-5 text-base">{t("team.myTeam")}</div>
      <div className="border mx-5 p-5 text-center">
        <div className="flex items-center justify-between text-sm mb-7">
          <span className="text-center">{t("team.time")}</span>
          {/* <span className="w-1/4">{t("team.number")}</span>
          <span className="w-1/4">{t("team.TeamPerformance")}</span> */}
          <span className="text-center">{t("team.address")}</span>
        </div>
        {data.length > 0 ? (
          data.map((list, index) => {
            return (
              <div
                className="flex items-center justify-between text-sm text mt-2"
                key={index}
              >
                <span className="text-left">{list.date}</span>
                {/* <span className="w-1/4">1</span>
                <span className="w-1/4">2</span> */}
                <span className="text-right">{list.address}</span>
              </div>
            );
          })
        ) : (
          <div className="text-sm text">{t("black.noData")}</div>
        )}
      </div>
    </div>
  );
};

export default Team;

import { Button, message } from "antd";
import { useState, useEffect } from "react";
import http from "../../request";
import { useInterval } from "ahooks";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import copy from "copy-to-clipboard";
import { useSelector } from "react-redux";

const Invite = () => {
  const { t } = useTranslation();

  const address = useSelector((state) => state.address);
  const token = useSelector((state) => state.token);

  const [data, setData] = useState();
  const getInfo = () => {
    http
      .get("/Aleo/UserCenter")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    address && token &&  getInfo();
  }, [address, token]);
  useInterval(() => {
    address && getInfo();
  }, 5000);

  const [messageApi, contextHolder] = message.useMessage();

  const copyUrl = (code) => {
    copy(code);
    message.success(t("header.copyS"));
  };
  return (
    <div className="text-white">
      <div className="inviteContent">
        <div className="flex items-center justify-center pt-10 text-sm">
          <button className="border px-10 py-2">
            {t("navigate.navigate7")}
          </button>
          <Link to="/team">
            <button className="border px-10 py-2 ml-6">
              {t("team.myTeam")}
            </button>
          </Link>
        </div>
        <div className="absolute bottom-20 w-full">
          {contextHolder}
          <div className="text text-white text-sm px-5 flex items-center justify-between border p-5 m-5 h-12">
            <div className="flex items-center justify-between">
              <div
                className="w-4/5"
                style={{
                  overflow: "clip",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {data?.invitecode}
              </div>
              <img
                className="w-4 ml-2 absolute right-10"
                src={require("../../asserts/imgs/copy.png")}
                onClick={() => {
                  copyUrl(data?.invitecode);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invite;

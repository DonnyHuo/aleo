import axios from "axios";
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
  useDisconnect,
} from "@web3modal/ethers5/react";

const http = axios.create({
  baseURL: "https://aleox.co/api/",
  timeout: 10000,
  headers: { Authorization: localStorage.getItem("sign") },
});

http.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  (req) => {
    return req;
  },
  (err) => {
    localStorage.setItem("sign", "");
    return Promise.reject(err);
  }
);

export default http;

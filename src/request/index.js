import axios from "axios";
import store from "../store";

const http = axios.create({
  baseURL: "https://aleox.co/api/",
  timeout: 10000,
});

http.interceptors.request.use(
  (req) => {
    const token = store.getState().token;
    req.headers['Authorization'] = token;
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

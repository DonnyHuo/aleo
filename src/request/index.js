import axios from "axios";

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

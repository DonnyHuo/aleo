import axios from "axios";

const http = axios.create({
  baseURL: "https://aleox.co/api/",
  timeout: 10000,
  headers: { Authorization: localStorage.getItem("sign") },
});



export default http;

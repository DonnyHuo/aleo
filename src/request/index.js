import axios from "axios";

const http = axios.create({
  baseURL: "http://54.179.164.7:88/api/",
  timeout: 10000,
  headers: { Authorization: localStorage.getItem("sign") },
});



export default http;

import axios from "axios";

const API = axios.create({
  baseURL: "/api", // Backend URL
});

export default API;

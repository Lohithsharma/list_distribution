import axios from "axios";

const API = axios.create({
  baseURL: "/api", // relative path, works on deployed Render app
});

export default API;

import axios from "axios";

const api = axios.create({
  baseURL: "/", // points to /public
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

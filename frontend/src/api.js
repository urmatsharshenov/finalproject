import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "./const";

// Get the session id from the cookie
const sessionId = Cookies.get("sessionId");

// Create an Axios instance
const ApiClient = axios.create({
  baseURL: API_URL,
  timeout: 2000,
  headers: {
    "X-Session-Id": sessionId,
  },
});

// Request interceptor
ApiClient.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = "Token " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiClient;

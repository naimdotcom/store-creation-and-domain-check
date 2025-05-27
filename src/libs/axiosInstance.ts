import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://interview-task-green.vercel.app/task/domains/check/",
});

export default axiosInstance;

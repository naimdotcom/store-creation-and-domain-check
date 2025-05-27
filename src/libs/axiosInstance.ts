import axios from "axios";

const axiosInstance = () => {
  return axios.create({
    baseURL: "https://interview-task-green.vercel.app/task/domains/check/",
  });
};

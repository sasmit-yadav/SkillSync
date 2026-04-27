import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // Make sure your backend is running on this
  withCredentials: true,
});

export default instance;
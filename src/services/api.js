// api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://ats-resume-analyzer-backend-enli.onrender.com/api",
});

export default API;

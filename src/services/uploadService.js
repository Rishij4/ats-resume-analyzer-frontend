import axios from "axios";

const API = axios.create({
  baseURL: "https://ats-resume-analyzer-backend-enli.onrender.com/api",
});

export const uploadResume = async (formData) => {
  const response = await API.post(
    "/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

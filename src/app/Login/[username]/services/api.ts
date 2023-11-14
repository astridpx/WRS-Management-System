import axios from "axios";

export const SendEmailCode = async (Data: any) => {
  const { data } = await axios.post("/api/login/forgot-password", { ...Data });

  return data;
};

export const VerifyCode = async (Data: any) => {
  const { data } = await axios.post("/api/login/verify-code", { ...Data });

  return data;
};

export const ChangePassword = async (Data: any) => {
  const { data } = await axios.post("/api/login/change-password", { ...Data });

  return data;
};

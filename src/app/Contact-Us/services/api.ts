import axios from "axios";

export const SendEmailMessage = async (Data: any) => {
  const { data } = await axios.post("/api/contact-us", { ...Data });

  return data;
};

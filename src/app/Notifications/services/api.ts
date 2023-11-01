import axios from "axios";

export const getAllNotifications = async () => {
  const { data } = await axios.get("/api/notifications");

  return data.data;
};

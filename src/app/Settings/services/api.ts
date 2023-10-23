import axios from "axios";
import { format } from "date-fns";

// GET PROFILE
export const getMyProfile = async (id: any) => {
  const { data } = await axios.post("/api/accounts/profile", { ...id });

  return data.data;
};

// http://localhost:3000/api/accounts/profile/6513906b0ccefccfaf391982
export const changePassword = async (Data: any, id: any) => {
  const { data } = await axios.post(`/api/accounts/profile/${id}`, {
    ...Data,
  });

  return data;
};

export const updateDetails = async (Data: any, id: any) => {
  const { data } = await axios.put(`/api/accounts/profile/${id}`, { ...Data });

  return data;
};

export const updateProfilePic = async (Data: any, id: any) => {
  const { data } = await axios.delete(`/api/accounts/profile/${id}`, {
    ...Data,
  });

  return data;
};

import axios from "axios";

// GET CUSTOMRE PROFILE DETAILS
export const CustomerProfile = async (id: any) => {
  const { data } = await axios.post("/api/customers/profile", { ...id });

  return data.data;
};

// UPDATE DETAILS
export const UpdateDetails = async (Data: any, id: any) => {
  const { data } = await axios.put(`/api/customers/profile/${id}`, {
    ...Data,
  });

  return data;
};

export const CustomerChangePassword = async (Data: any, id: any) => {
  const { data } = await axios.post(`/api/customers/profile/${id}`, {
    ...Data,
  });

  return data;
};

export const VerifyEmail = async (email: any) => {
  const { data } = await axios.put(
    `/api/customers/email-verification/${email}`
  );

  return data;
};

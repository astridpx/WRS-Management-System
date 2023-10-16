import axios from "axios";
import { format } from "date-fns";

export const getAllAccounts = async () => {
  const { data } = await axios.get("/api/accounts");

  const Data = await data.data.map((d: any) => {
    const newData = {
      ...d,
      fullname: `${d.first_name} ${d.last_name}`,
      last_active: format(new Date(d.last_active), "LLL dd, y"),
    };

    return newData;
  });

  return Data;
};

export const createNewAccount = async (Data: any) => {
  const { data } = await axios.post("/api/accounts", {
    ...Data,
  });

  return data;
};

export const editAccessAccount = async (Data: any, id: any) => {
  const { data } = await axios.put(`/api/accounts/${id}`, {
    ...Data,
  });

  return data;
};
export const deleteAccount = async (id: any) => {
  const { data } = await axios.delete(`/api/accounts/${id}`);

  return data;
};

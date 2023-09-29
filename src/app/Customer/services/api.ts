import Axios from "axios";
import { INewUser, IUserEdit } from "../../../../typings";

const axios = Axios.create({
  baseURL: "http://localhost:3000",
});

export const addNewUser = async (Data: INewUser) => {
  const { data } = await axios.post("/api/customers", {
    ...Data,
  });

  return data;
};

export const getAllCustomers = async () => {
  const { data } = await axios.get("/api/customers");

  return data;
};

export const UpdateCustomer = async (Data: IUserEdit, id: any) => {
  const { data } = await axios.put(`/api/customers/${id}`, {
    ...Data,
  });

  return data;
};

export const DeleteUser = async (id: any) => {
  const { data } = await axios.delete(`/api/customers/${id}`);

  return data;
};

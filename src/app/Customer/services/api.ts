import axios from "axios";
import { IUser, IGallons } from "../../../../typings";

// const axios = Axios.create({
//   baseURL: "http://localhost:3000",
// });

interface IUserWithGallon extends IUser, IGallons {}

export const addNewUser = async (Data: IUser) => {
  const { data } = await axios.post("/api/customers", {
    ...Data,
  });

  return data;
};

export const getAllCustomers = async () => {
  const { data } = await axios.get("/api/customers");

  return data;
};

export const UpdateCustomer = async (Data: IUserWithGallon, id: any) => {
  const { data } = await axios.put(`/api/customers/${id}`, {
    ...Data,
  });

  return data;
};

export const DeleteUser = async (id: any) => {
  const { data } = await axios.delete(`/api/customers/${id}`);

  return data;
};

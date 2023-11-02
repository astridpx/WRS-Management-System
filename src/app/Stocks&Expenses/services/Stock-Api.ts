import axios from "axios";
import { IStocks } from "../../../../typings";

// const axios = Axios.create({
//   baseURL: "http://localhost:3000",
// });

export const getAllStocks = async () => {
  const { data } = await axios.get("/api/items");

  return data;
};

export const deleteStockHistory = async (fieldId: string, ID: string) => {
  const { data } = await axios.put(`/api/stocks/${ID}`, { fieldId });

  return data;
};

export const stockIn = async (Data: any, id: any) => {
  const { data } = await axios.put(
    `/api/stocks/in/
    ${id}`,
    {
      ...Data,
    }
  );

  return data;
};

export const stockOut = async (Data: IStocks, id: any) => {
  const { data } = await axios.put(
    `/api/stocks/out/
    ${id}`,
    {
      ...Data,
    }
  );

  return data;
};

export const CreateNotif = async (Data: any) => {
  const { data } = await axios.post("/api/notifications", { ...Data });

  return data;
};

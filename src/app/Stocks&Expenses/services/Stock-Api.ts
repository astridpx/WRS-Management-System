import Axios from "axios";
import { IStocks } from "../../../../typings";

const axios = Axios.create({
  baseURL: "http://localhost:3000",
});

export const getAllStocks = async () => {
  const { data } = await axios.get("/api/stocks");

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

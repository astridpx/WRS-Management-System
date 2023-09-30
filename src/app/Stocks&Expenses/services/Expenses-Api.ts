import Axios from "axios";
import { IExpenses } from "../../../../typings";
import { format } from "date-fns";

const axios = Axios.create({
  baseURL: "http://localhost:3000",
});

export const createExpenses = async (Data: any) => {
  const { data } = await axios.post("/api/expenses", {
    ...Data,
  });

  return data;
};

export const getAllExpenses = async () => {
  const { data } = await axios.get("/api/expenses");

  const newData = await data.data.map((d: IExpenses) => {
    const Data = {
      ...d,
      sort_date: format(new Date(d.date), "LLL dd, y"),
    };
    return Data;
  });

  return newData;
};

export const updateExpenses = async (Data: any, id: any) => {
  const { data } = await axios.put(`/api/expenses${id}`, {
    ...Data,
  });

  return data;
};

export const deleteExpenses = async (id: any) => {
  const { data } = await axios.delete(`/api/expenses${id}`);

  return data;
};

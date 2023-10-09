import axios from "axios";
import { IExpenses, IItems } from "../../../../typings";

// const axios = Axios.create({
//   baseURL: "http://localhost:3000",
// });

export const createItem = async (Data: any) => {
  const { data } = await axios.post("/api/items", {
    ...Data,
  });

  return data;
};

export const getAllItems = async () => {
  const { data } = await axios.get("/api/items");

  return data.data;
};

export const updateItem = async (Data: IItems, id: any) => {
  const { data } = await axios.put(
    `/api/items/
  ${id}`,
    {
      ...Data,
    }
  );

  return data;
};

export const deleteItem = async (id: any) => {
  const { data } = await axios.delete(`/api/items/${id}`);

  return data;
};

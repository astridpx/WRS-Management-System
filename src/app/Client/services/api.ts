import axios from "axios";

export const getAllItems = async () => {
  const { data } = await axios.get("/api/items");

  return data.data;
};

// CREATE TRANSACTION
export const createTransaction = async (Data: any) => {
  const { data } = await axios.post("/api/transaction", {
    ...Data,
  });

  return data;
};

// CREATE NOTIFICATION API
export const CreateNotif = async (Data: any) => {
  const { data } = await axios.post("/api/notifications", { ...Data });

  return data;
};

// LESSEN POS ITEM STOCK IF BUYED
export const stockOut = async (Data: any, id: any) => {
  const { data } = await axios.put(
    `/api/stocks/out/
    ${id}`,
    {
      ...Data,
    }
  );

  return data;
};

import axios from "axios";

export const revalidate = 10;

export const getAllHistory = async () => {
  const { data } = await axios.get("/api/transaction_history");

  return data.data;
};

export const getAllExpenses = async () => {
  const { data } = await axios.get("/api/expenses");

  return data.data;
};

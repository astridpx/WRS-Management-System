import axios from "axios";
import { IExpenses, IUser } from "../../../../typings";
import { format } from "date-fns";

export const getTransactions = async () => {
  // const { data } = await axios.get("/api/transaction_history");
  const { data } = await axios.get("/api/transaction");

  const Data = await data.data.map((d: any) => {
    const addr = d.isVillage
      ? ` P-${d.customer.phase} BLK-${d.customer.blk} L-${d.customer.lot}`
      : ` ${d.customer.address}`;

    const newData = {
      ...d,
      fullname: `${d.customer.first_name} ${d.customer.last_name}`,
      customers: `${d.customer.first_name} ${d.customer.last_name} ${addr}`,
      new_address: addr,
      sort_date: format(new Date(d.date), "LLL dd, y"),
      new_order: d.orders.map((d: any) => {
        return {
          ...d,
          borrowed: d.qty,
        };
      }),
    };

    return newData;
  });

  return Data;
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

export const deleteTransaction = async (id: any) => {
  const { data } = await axios.delete(`/api/transaction/${id}`);

  return data;
};

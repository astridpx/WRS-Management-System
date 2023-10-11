import axios from "axios";
import { IUser } from "../../../../typings";
import { format } from "date-fns";

export const getTransactions = async () => {
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

// SET ORDER INTO In transit
export const setInTransit = async (Data: any) => {
  const { data } = await axios.post("/api/transaction/transit", {
    ...Data,
  });

  return data;
};

//   SET ORDER AS DELIVERED
export const setDelivered = async (Data: any) => {
  const { data } = await axios.post("/api/transaction/delivered", {
    ...Data,
  });

  return data;
};

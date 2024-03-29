import axios from "axios";

export const getTransactions = async () => {
  const { data } = await axios.get("/api/transaction");

  const Data = await data.data.map((d: any) => {
    const addr = d.isMain
      ? ` ${d.customer.street} ${d.customer.brgy} ${d.customer.city}`
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

// SET ORDER INTO status To Ship
export const setToShip = async (Data: any) => {
  const { data } = await axios.post("/api/transaction/pending", {
    ...Data,
  });

  return data;
};

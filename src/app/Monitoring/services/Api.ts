import axios from "axios";
import { IUser } from "../../../../typings";
import { format } from "date-fns";

export const getLastReturn = async () => {
  // const { data } = await axios.get("/api/monitoring/last_return");
  const { data } = await axios.get("/api/customers");

  const LastReturnGallon: any = [];

  if (Array.isArray(data?.data)) {
    // Filter the persons with borrowed count greater than 0
    const LastReturn = data?.data?.filter(
      (person: any) =>
        Array.isArray(person.borrowed_gal) &&
        person.borrowed_gal.some((item: any) => item.borrowed > 0)
    );

    LastReturnGallon.push(LastReturn);
  } else {
    console.error(
      "Data is not an array or does not have the expected structure."
    );
  }

  const Data = await LastReturnGallon[0].map((d: IUser) => {
    const addr = d.isVillage
      ? ` P-${d.phase} BLK-${d.blk} L-${d.lot}`
      : ` ${d.address}`;

    const date = d.borrowed_gal?.[0]?.last_return;
    const newData = {
      ...d,
      fullname: `${d.first_name} ${d.last_name}`,
      sort_date: format(new Date(date as Date), "MMM dd, yyyy"),
      customer: `${d.first_name} ${d.last_name} ${addr}`,
      new_address: addr,
    };

    return newData;
  });

  return Data;
};

export const getAllCredits = async () => {
  const { data } = await axios.get("/api/monitoring/credit");

  const Data = await data.data.map((d: any) => {
    const addr = d.customer.isVillage
      ? ` P-${d.customer.phase} BLK-${d.customer.blk} L-${d.customer.lot}`
      : ` ${d.customer.address}`;

    const newData = {
      ...d,
      fullname: `${d.customer.first_name} ${d.customer.last_name}`,
      customers: `${d.customer.first_name} ${d.customer.last_name} ${addr}`,
      sort_date: format(new Date(d.date), "LLL dd, y"),
      borrowed_gal: d.orders.map((d: any) => {
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

export const payCredit = async (Data: any) => {
  const { data } = await axios.put("/api/monitoring/credit", {
    ...Data,
  });

  return data;
};

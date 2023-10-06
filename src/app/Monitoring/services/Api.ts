import axios from "axios";
import { IUser } from "../../../../typings";
import { format } from "date-fns";

// const axios = Axios.create({
//   baseURL: "http://localhost:3000",
// });

export const getLastReturn = async () => {
  const { data } = await axios.get("/api/monitoring/last_return");

  const Data = await data.data.map((d: IUser) => {
    const addr = d.isVillage
      ? ` P-${d.phase} BLK-${d.blk} L-${d.lot}`
      : ` ${d.address}`;

    const date = d?.borrowed_gal?.slim?.last_return
      ? d?.borrowed_gal?.slim?.last_return
      : d?.borrowed_gal?.round?.last_return;

    const newData = {
      ...d,
      fullname: `${d.first_name} ${d.last_name}`,
      sort_date: format(new Date(date), "LLL dd, y"),
      customer: `${d.first_name} ${d.last_name} ${addr}`,
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
      customer: `${d.customer.first_name} ${d.customer.last_name} ${addr}`,
      sort_date: format(new Date(d.date), "LLL dd, y"),
    };

    return newData;
  });

  return Data;
};

// const newCustomer = users?.data?.map((user: any) => {
//     const User = {
//       fullname: `${user.first_name} ${user.last_name}`,
//       new_address: user.isVillage
//         ? `P-${user.phase} BLK-${user.blk} L-${user.lot}`
//         : user.address,
//       ...user,
//     };
//     return User;
//   });

const x = {
  borrowed_gal: {
    slim: {
      borrowed: 2,
      gal_type: "Slim",
    },
    round: {
      borrowed: 3,
      gal_type: "Round",
    },
  },
};

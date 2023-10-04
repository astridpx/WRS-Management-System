import Axios from "axios";
import { IUser } from "../../../../typings";

const axios = Axios.create({
  baseURL: "http://localhost:3000",
});

export const getLastReturn = async () => {
  const { data } = await axios.get("/api/monitoring/last_return");

  const Data = await data.data.map((d: IUser) => {
    const newData = {
      ...d,
      customer: `${d.first_name} ${d.last_name} d.isVillage
      ? P-${d.phase} BLK-${d.blk} L-${d.lot}
      : d.address`,
    };

    return newData;
  });

  return Data;
};
export const getAllCredits = async () => {
  const { data } = await axios.get("/api/monitoring/credit");

  const Data = await data.data.map((d: any) => {
    const newData = {
      ...d,
      fullname: `${d.first_name} ${d.last_name}`,
      customer: `${d.first_name} ${d.last_name} d.isVillage
      ? P-${d.phase} BLK-${d.blk} L-${d.lot}
      : d.address`,
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

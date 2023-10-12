import axios from "axios";

export const getAllCustomers = async () => {
  const { data } = await axios.get("/api/customers");

  const newCustomer = data?.data?.map((user: any) => {
    const User = {
      fullname: `${user.first_name} ${user.last_name}`,
      new_address: user.isVillage
        ? `P-${user.phase} BLK-${user.blk} L-${user.lot}`
        : user.address,
      ...user,
    };
    return User;
  });

  return newCustomer;
};

export const getGallons = async () => {
  const { data } = await axios.get("/api/pos/gallons");

  return data.data;
};

export const getBottles = async () => {
  const { data } = await axios.get("/api/pos/bottles");

  return data.data;
};

// CREATE TRANSACTION
export const createTransaction = async (Data: any) => {
  const { data } = await axios.post("/api/transaction", {
    ...Data,
  });

  return data;
};
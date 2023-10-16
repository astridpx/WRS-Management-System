import axios from "axios";

export const getAllAccounts = async () => {
  const { data } = await axios.get("/api/accounts");

  const Data = await data.data.map((d: any) => {
    const newData = {
      ...d,
      fullname: `${d.first_name} ${d.last_name}`,
    };

    return newData;
  });

  return Data;
};

import { format } from "date-fns";

export const GetAllYears = async (data: any) => {
  const formatYear = await data.map((data: any) => {
    const year = format(new Date(data.date), "yyyy");

    return year;
  });

  const Allyears = Array.from(new Set(formatYear));

  return Allyears;
};

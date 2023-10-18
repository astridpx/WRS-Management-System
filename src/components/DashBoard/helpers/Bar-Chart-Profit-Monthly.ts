import { format } from "date-fns";
import { months as MonthLabel } from "@/utils/Dashboard/Months-data";

// Months getter function
const MonthsGetter = (date: Date) => {
  const months = format(new Date(date), "MMM");
  const year = format(new Date(date), "yyyy");

  const my = `$${months} ${year}`;

  return months;
};

export const MonthlyBarChartProfit = async (
  dataHistory: any,
  expenseHistory: any
) => {
  const formatMonth = await dataHistory.map((data: any) => {
    const months = MonthsGetter(data.date);

    return months;
  });

  const getExpMonth = await expenseHistory.map((data: any) => {
    const months = MonthsGetter(data.date);

    return months;
  });

  const mergedMonths = [...formatMonth, ...getExpMonth];

  const allDMonths = Array.from(new Set(mergedMonths));

  const ProfitData = await MonthLabel.map((uMonths: any) => {
    const filtered = dataHistory.filter((filDate: any) => {
      const months = MonthsGetter(filDate.date);
      return months === uMonths;
    });

    const filteredExp = expenseHistory.filter((filDate: any) => {
      const month = MonthsGetter(filDate.date);
      return month === uMonths;
    });

    const totalMonthProfit = filtered.reduce(
      (acc: any, transaction: any) => acc + transaction.amount,
      0
    );

    const totalMonthExpense = filteredExp.reduce(
      (acc: any, exp: any) => acc + exp.amount,
      0
    );

    const MonthlyProfit = totalMonthProfit - totalMonthExpense;

    return MonthlyProfit;
  });

  return ProfitData;
};

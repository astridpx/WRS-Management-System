import { format } from "date-fns";
import { months as MonthLabel } from "@/utils/Dashboard/Months-data";

// Months getter function
const MonthsGetter = (date: Date) => {
  const months = format(new Date(date), "MMM");

  return months;
};

export const MonthlyBarChartProfit = async (
  dataHistory: any,
  expenseHistory: any,
  year: string
) => {
  const ProfitData = await MonthLabel.map((uMonths: any) => {
    const filtered = dataHistory.filter((filDate: any) => {
      const months = MonthsGetter(filDate.date);
      const filYear = format(new Date(filDate.date), "yyyy");
      return months === uMonths && filYear === year;
    });

    const filteredExp = expenseHistory.filter((filDate: any) => {
      const month = MonthsGetter(filDate.date);
      const filYear = format(new Date(filDate.date), "yyyy");
      return month === uMonths && filYear === year;
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

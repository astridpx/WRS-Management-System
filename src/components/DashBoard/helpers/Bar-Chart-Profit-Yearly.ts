import { format } from "date-fns";

export const YearlyBarChartProfit = async (
  dataHistory: any,
  expenseHistory: any,
  allYears: any
) => {
  const ProfitData = await allYears.map((cYear: any) => {
    const filtered = dataHistory.filter((filDate: any) => {
      const filYear = format(new Date(filDate.date), "yyyy");
      return filYear === cYear;
    });

    const filteredExp = expenseHistory.filter((filDate: any) => {
      const filYear = format(new Date(filDate.date), "yyyy");
      return filYear === cYear;
    });

    const totalProfit = filtered.reduce(
      (acc: any, transaction: any) => acc + transaction.amount,
      0
    );

    const totalExpense = filteredExp.reduce(
      (acc: any, exp: any) => acc + exp.amount,
      0
    );

    const Profit = totalProfit - totalExpense;

    return Profit;
  });

  return ProfitData;
};

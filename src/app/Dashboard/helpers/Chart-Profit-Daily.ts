import { format, getDaysInMonth } from "date-fns";

const DayGetter = (date: Date) => {
  const day = format(new Date(date), "dd");
  return day;
};

export const DailyChartProfit = async (
  dataHistory: any,
  expenseHistory: any,
  dayLength: number,
  year: string,
  month: any
) => {
  const filteredSaleHistory = dataHistory.filter((filDate: any) => {
    const filMonth = format(new Date(filDate.date), "MMM");
    const filYear = format(new Date(filDate.date), "yyyy");

    return filMonth === month && filYear === year;
  });

  const filteredExpenseHistory = expenseHistory.filter((filDate: any) => {
    const filMonth = format(new Date(filDate.date), "MMM");
    const filYear = format(new Date(filDate.date), "yyyy");

    return filMonth === month && filYear === year;
  });

  const ProfitData = await Array.from({ length: dayLength }, (_, index) => {
    const filtered = filteredSaleHistory.filter((filDate: any) => {
      const Day = DayGetter(filDate.date);
      return parseInt(Day) === index + 1;
    });

    const filteredExp = filteredExpenseHistory.filter((filDate: any) => {
      const Day = DayGetter(filDate.date);

      return parseInt(Day) === index + 1;
    });

    const totalhProfit = filtered.reduce(
      (acc: any, transaction: any) => acc + transaction.amount,
      0
    );

    const totalExpense = filteredExp.reduce(
      (acc: any, exp: any) => acc + exp.amount,
      0
    );
    const Profit = totalhProfit - totalExpense;

    // return as array
    const DataSet = {
      Bar: Profit,
      Line: {
        sales: totalhProfit,
        expenses: totalExpense,
      },
    };

    return DataSet;
  });

  return ProfitData;
};

import { format, getDaysInMonth } from "date-fns";

// Months getter function
const MonthsGetter = (date: Date) => {
  const month = format(new Date(date), "MMM yyyy");
  return month;
};

const DayGetter = (date: Date) => {
  const day = format(new Date(date), "dd");
  return day;
};

export const DailyBarChartProfit = async (
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

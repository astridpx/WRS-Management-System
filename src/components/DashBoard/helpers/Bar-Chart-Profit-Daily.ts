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
  expenseHistory: any
) => {
  const MonthYear = "Oct 2023";

  const month = 10;
  const year = 2023;

  const day = getDaysInMonth(new Date(year, month));

  const filteredSaleHistory = dataHistory.filter((filDate: any) => {
    const months = MonthsGetter(filDate.date);
    return months === MonthYear;
  });

  const filteredExpenseHistory = expenseHistory.filter((filDate: any) => {
    const months = MonthsGetter(filDate.date);
    return months === MonthYear;
  });

  const ProfitData = await Array.from({ length: day }, (_, index) => {
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

    const i = index + 1;

    console.log(i + ":" + totalMonthProfit);
    console.log(i + ":" + MonthlyProfit);

    return MonthlyProfit;
  });

  return ProfitData;
};

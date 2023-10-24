import { startOfMonth, endOfMonth, eachWeekOfInterval, format } from "date-fns";

// Sample daily sales data for the month
const salesData = [
  { date: new Date(2023, 9, 1), amount: 100 },
  { date: new Date(2023, 9, 2), amount: 150 },
  // Add more daily sales data for the entire month
  // ...
];

const WeeklyProfitChart = async () => {
  // Calculate the start and end of the month
  const startDate = startOfMonth(new Date());
  const endDate = endOfMonth(new Date());

  // Create an array of weekly intervals for the month
  const weeklyIntervals = eachWeekOfInterval(
    { start: startDate, end: endDate },
    { weekStartsOn: 1 }
  );

  // Iterate through weekly intervals and calculate weekly sales
  weeklyIntervals.forEach((weekStartDate) => {
    const weekEndDate = endOfWeek(weekStartDate, { weekStartsOn: 1 });
    const weeklySales = salesData.reduce((total, sale) => {
      if (sale.date >= weekStartDate && sale.date <= weekEndDate) {
        return total + sale.amount;
      }
      return total;
    }, 0);

    console.log(
      `Week of ${format(weekStartDate, "MM/dd/yyyy")} - ${format(
        weekEndDate,
        "MM/dd/yyyy"
      )}`
    );
    console.log(`Weekly Sales: $${weeklySales}`);
  });

  function endOfWeek(date: any, options: any) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + ((6 - date.getDay() + options.weekStartsOn) % 7)
    );
  }
};

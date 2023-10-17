import { format } from "date-fns";

// Months getter function
const MonthsGetter = (date: Date) => {
  const months = format(new Date(date), "MMMM");
  const year = format(new Date(date), "yyyy");

  const my = `$${months} ${year}`;

  return my;
};

export const MonthlySalesReport = async (
  dataHistory: any,
  expenseHistory: any
) => {
  // get alldates and format
  //   SALES DATA
  const formatMonth = await dataHistory.map((data: any) => {
    const months = MonthsGetter(data.date);

    return months;
  });

  //   EXPENSES DATA
  const getExpMonth = await expenseHistory.map((data: any) => {
    const months = MonthsGetter(data.date);

    return months;
  });

  // merge history month and expenses month
  const mergedMonths = [...formatMonth, ...getExpMonth];

  const allDMonths = Array.from(new Set(mergedMonths)); // remove duplicates dates from combine months

  // map the combine unique months
  // the filter the months that match
  // then compute the total of discount, profit or amount and balance
  const salesData = await allDMonths.map((uMonths: any) => {
    const filtered = dataHistory.filter((filDate: any) => {
      const months = MonthsGetter(filDate.date);
      return months === uMonths;
    });

    const filteredExp = expenseHistory.filter((filDate: any) => {
      const month = MonthsGetter(filDate.date);
      return month === uMonths;
    });

    const totalAmount = filtered.reduce(
      (acc: any, transaction: any) => acc + transaction.amount,
      0
    );
    const totalDiscount = filtered.reduce(
      (acc: any, transaction: any) => acc + transaction.discount,
      0
    );
    const totalBalance = filtered.reduce(
      (acc: any, transaction: any) => acc + transaction.balance,
      0
    );

    // variable for total order gallon and bottle
    let GalQty = 0;
    let BottleQty = 0;

    // Total Gallon computation
    filtered.forEach((order: any) => {
      // Iterate through each order in the "orders" array
      order.orders.forEach((orderItem: any) => {
        // Check if the orderItem's category is "container"
        if (orderItem.item.category === "container") {
          // Add the quantity to the totalQuantity
          return (GalQty += orderItem.qty);
        }
      });
    });

    // Total Bottle computatiom
    filtered.forEach((order: any) => {
      // Iterate through each order in the "orders" array
      order.orders.forEach((orderItem: any) => {
        // Check if the orderItem's category is "container"
        if (orderItem.item.category === "bottle") {
          // Add the quantity to the totalQuantity
          return (BottleQty += orderItem.qty);
        }
      });
    });

    // Total Expenses
    const totalExpense = filteredExp.reduce(
      (acc: any, exp: any) => acc + exp.amount,
      0
    );

    const newData = {
      Date: uMonths,
      tProfit: totalAmount,
      tDiscount: totalDiscount,
      tBalance: totalBalance,
      tGallon: GalQty,
      tBottle: BottleQty,
      tExpense: totalExpense,
      sorted_data: filtered,
    };

    console.log(newData);

    return newData;
  });

  return salesData;
};

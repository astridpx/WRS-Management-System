import { format } from "date-fns";

// SALES REPORT DATA
export const DailySalesReport = async (
  dataHistory: any,
  expenseHistory: any
) => {
  // get alldates and format
  const formatDate = await dataHistory.map((data: any) => {
    const dates = format(new Date(data.date), "LLL dd, y");
    return dates;
  });

  const getExpDate = await expenseHistory.map((data: any) => {
    return data.sort_date;
  });

  // merge history dates and expenses dates
  const mergedDates = [...formatDate, ...getExpDate];

  const allDates = Array.from(new Set(mergedDates)); // remove duplicates dates from combine dates

  // order data by date
  allDates.sort((a: any, b: any) => {
    const dateA: any = new Date(a);
    const dateB: any = new Date(b);

    return dateB - dateA;
  });

  // map the combine unique dates
  // the filter the dates that match
  // then compute the total of discount, profit or amount and balance
  const salesData = await allDates.map((udate: any) => {
    const filtered = dataHistory.filter(
      (filDate: any) => format(new Date(filDate.date), "LLL dd, y") === udate
    );
    const filteredExp = expenseHistory.filter(
      (filDate: any) => filDate.sort_date === udate
    );

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
      Date: udate,
      tProfit: totalAmount,
      tDiscount: totalDiscount,
      tBalance: totalBalance,
      tGallon: GalQty,
      tBottle: BottleQty,
      tExpense: totalExpense,
      sorted_data: filtered,
    };

    return newData;
  });

  return salesData;
};

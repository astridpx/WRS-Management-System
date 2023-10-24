// DASHBOARD CARDS DATA
export const DashboardCardsData = async (
  dataHistory: any,
  expenseHistory: any
) => {
  const totalSales = await dataHistory.reduce(
    (acc: any, transaction: any) => acc + transaction.amount,
    0
  );
  const totalExpenses = await expenseHistory.reduce(
    (acc: any, expense: any) => acc + expense.amount,
    0
  );

  const totalBalance = await dataHistory.reduce(
    (acc: any, transaction: any) => acc + transaction.balance,
    0
  );
  const totalProfit = totalSales - totalExpenses;

  const Data = [totalProfit, totalSales, totalExpenses, totalBalance];

  return Data;
};

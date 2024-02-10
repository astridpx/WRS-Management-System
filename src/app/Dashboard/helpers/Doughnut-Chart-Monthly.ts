import { format } from "date-fns";

// DOIGHNUT CHART DATA
export const MonthlyDoughNutChart = async (
  dataHistory: any,
  year: any,
  month: any
) => {
  const getLabels = await dataHistory.map((d: any) => {
    return d.customer.brgy;
  });

  const removeUndefined = getLabels.filter(
    (element: any) => element !== undefined
  );

  const BrgyLabel = Array.from(new Set(removeUndefined));

  const Data_Sales = BrgyLabel.map((p: any) => {
    const filtered = dataHistory.filter((filDate: any) => {
      const filMonth = format(new Date(filDate.date), "MMM");
      const filYear = format(new Date(filDate.date), "yyyy");

      return (
        filDate.customer.brgy === p &&
        filDate.customer.isMain === true &&
        filMonth === month &&
        filYear === year
      );
    });

    const totalSale = filtered.reduce(
      (acc: any, transaction: any) => acc + transaction.amount,
      0
    );

    const BRGY_Sale = {
      label: p,
      // label_index: ,
      sale: totalSale,
    };

    return BRGY_Sale;
  });

  //   get total amount from not village
  const filteredOther = dataHistory.filter((filDate: any) => {
    const filMonth = format(new Date(filDate.date), "MMM");
    const filYear = format(new Date(filDate.date), "yyyy");

    return (
      filMonth === month &&
      filYear === year &&
      filDate.customer.isMain === false
    );
  });

  const totalSaleOfOther = filteredOther.reduce(
    (acc: any, transaction: any) => acc + transaction.amount,
    0
  );

  const SaleOfOther = {
    label: "others",
    sale: totalSaleOfOther,
  };

  Data_Sales.push(SaleOfOther);

  // remove the data where sale is equal to 0
  const FilterData = Data_Sales.filter((item) => item.sale !== 0);

  return FilterData;
};

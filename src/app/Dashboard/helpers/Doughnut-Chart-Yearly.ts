import { format } from "date-fns";

// DOIGHNUT CHART DATA
export const YearlyDoughNutChart = async (dataHistory: any, year: any) => {
  const getLabels = await dataHistory.map((d: any) => {
    return d.customer.brgy;
  });

  const removeUndefined = getLabels.filter(
    (element: any) => element !== undefined
  );

  const Brgy_Label = Array.from(new Set(removeUndefined));

  const Data_Sales = Brgy_Label.map((p: any) => {
    const filtered = dataHistory.filter((filDate: any) => {
      const filYear = format(new Date(filDate.date), "yyyy");

      return (
        filDate.customer.brgy === p &&
        filDate.customer.isMain === true &&
        filYear === year
      );
    });

    const totalSale = filtered.reduce(
      (acc: any, transaction: any) => acc + transaction.amount,
      0
    );

    const Brgy_Sale = {
      label: p,
      sale: totalSale,
    };

    return Brgy_Sale;
  });

  //   get total amount from not village
  const filteredOther = dataHistory.filter((filDate: any) => {
    const filMonth = format(new Date(filDate.date), "MMM");
    const filYear = format(new Date(filDate.date), "yyyy");

    return filYear === year && filDate.customer.isMain === false;
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

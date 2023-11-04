import { format } from "date-fns";

// DOIGHNUT CHART DATA
export const YearlyDoughNutChart = async (dataHistory: any, year: any) => {
  const getLabels = await dataHistory.map((d: any) => {
    return d.customer.phase;
  });

  const removeUndefined = getLabels.filter(
    (element: any) => element !== undefined
  );

  const PhaseLabel = Array.from(new Set(removeUndefined));

  PhaseLabel.sort((a: any, b: any) => {
    return a - b;
  });

  const SaleOfVillage = PhaseLabel.map((p: any) => {
    const filtered = dataHistory.filter((filDate: any) => {
      const filYear = format(new Date(filDate.date), "yyyy");

      return (
        filDate.customer.phase === p &&
        filDate.customer.isVillage === true &&
        filYear === year
      );
    });

    const totalSale = filtered.reduce(
      (acc: any, transaction: any) => acc + transaction.amount,
      0
    );

    const VillageSale = {
      label: p,
      sale: totalSale,
    };

    return VillageSale;
  });

  //   get total amount from not village
  const filteredOther = dataHistory.filter((filDate: any) => {
    const filMonth = format(new Date(filDate.date), "MMM");
    const filYear = format(new Date(filDate.date), "yyyy");

    return filYear === year && filDate.customer.isVillage === false;
  });

  const totalSaleOfOther = filteredOther.reduce(
    (acc: any, transaction: any) => acc + transaction.amount,
    0
  );

  const SaleOfOther = {
    label: "others",
    sale: totalSaleOfOther,
  };

  SaleOfVillage.push(SaleOfOther);

  return SaleOfVillage;
};

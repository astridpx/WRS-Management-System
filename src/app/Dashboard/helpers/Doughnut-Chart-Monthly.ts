import { format } from "date-fns";
import { BarangaysOfCities } from "@/utils/Brgy-Lists/Barangays";

// DOIGHNUT CHART DATA
export const MonthlyDoughNutChart = async (
  dataHistory: any,
  year: any,
  month: any,
  option: any,
  city: Number
) => {
  // SALES CALCULATOR
  const Sales_Calculator = (data: any, opt: any) => {
    return data.map((p: any) => {
      const filtered = dataHistory.filter((filDate: any) => {
        const filMonth = format(new Date(filDate.date), "MMM");
        const filYear = format(new Date(filDate.date), "yyyy");

        return (
          // filDate.customer.isMain === true &&
          filDate.customer[opt] === p && filMonth === month && filYear === year
        );
      });

      const totalSale = filtered.reduce(
        (acc: any, transaction: any) => acc + transaction.amount,
        0
      );

      const Sale = {
        label: p,
        // label_index: ,
        sale: totalSale,
      };
      return Sale;
    });
  };

  // GET BRGY LABELS
  const getBrgyLabels = await dataHistory.map((d: any) => {
    return d.customer.brgy;
  });

  const removeUndefined = getBrgyLabels.filter(
    (element: any) => element !== undefined
  );

  const BrgyLabel = Array.from(new Set(removeUndefined));

  // Filter remove the data that not it the same city
  const get_brgy_list = BarangaysOfCities.filter((data) => data.id === city);

  // remove the data that don't have sale
  // Now the BRGY Sales (depdend of what city choice) is now ready to calculate
  const brgy_data = get_brgy_list[0].barangays.filter((d) =>
    BrgyLabel.includes(d)
  );

  // CITY DATA SALES
  const getCityLabels = await dataHistory.map((d: any) => {
    return d.customer.city;
  });

  const removeCityUndefined = getCityLabels.filter(
    (element: any) => element !== undefined
  );
  const CityLabel = Array.from(new Set(removeCityUndefined));

  const Data_Sales =
    option === "brgy"
      ? Sales_Calculator(brgy_data, "brgy")
      : Sales_Calculator(CityLabel, "city");

  // remove the sale that has a value of 0
  const FilterData = Data_Sales.filter((item: any) => item.sale !== 0);

  return FilterData;

  // #  Remove the "Others", The "street" label can use to enter the blk, lot, & phase.
  // #  Removing the "other" tab in form will make the data analytics in doughnut more specific

  //   get total amount from "Others"
  // const filteredOther = dataHistory.filter((filDate: any) => {
  //   const filMonth = format(new Date(filDate.date), "MMM");
  //   const filYear = format(new Date(filDate.date), "yyyy");

  //   return (
  //     filMonth === month &&
  //     filYear === year &&
  //     filDate.customer.isMain === false
  //   );
  // });

  // const totalSaleOfOther = filteredOther.reduce(
  //   (acc: any, transaction: any) => acc + transaction.amount,
  //   0
  // );

  // const SaleOfOther = {
  //   label: "others",
  //   sale: totalSaleOfOther,
  // };

  // Data_Sales.push(SaleOfOther);

  // // remove the data where sale is equal to 0
};

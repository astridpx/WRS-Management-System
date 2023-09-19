import React, { use } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { DeliveryColumns } from "./Delivery-Column";
import { DataTable } from "@/components/react-table/main-table";
import fakeCustomer from "@/utils/table-data/MOCK_DATA_CUSTOMER_SEARCH.json";

async function getData() {
  const Data = await fakeCustomer.map((d: any) => {
    const data = {
      ...d,
      fullname: `${d.first_name} ${d.last_name}`,
      address: `P-${d.phase} BLK-${d.blk}`,
    };

    return data;
  });

  return Data;
}
const dataPromise = getData();

const Deliverypage = () => {
  const prodData = use(dataPromise);

  return (
    <>
      <PageWrapper>
        <div className="relative ">
          <div className="flex justify-end "></div>
          <DataTable columns={DeliveryColumns} data={prodData} />
        </div>
      </PageWrapper>
    </>
  );
};

export default Deliverypage;

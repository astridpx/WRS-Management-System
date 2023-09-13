// 'use client'

import { use } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { DataTable } from "@/components/react-table/main-table";
import { monitoringHistoryColumns } from "./Monitoring-History-Column";
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

//   const DataGet = getData();

const MonitoringPage = async () => {
  // const monitoringData = use(DataGet);
  const monitoringData = await getData();

  return (
    <>
      <PageWrapper>
        <div className="relative ">
          <div className="flex justify-end "></div>

          <DataTable columns={monitoringHistoryColumns} data={monitoringData} />
        </div>
      </PageWrapper>
    </>
  );
};

export default MonitoringPage;

"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { DataTable } from "@/components/react-table/main-table";
import { PendingOrderColumns } from "./Order-Pending-Column";
import { getTransactions, setToShip } from "./services/api";
import { useQuery } from "react-query";
import Loader from "@/components/loader/Spinner";
import { useMutation, useQueryClient } from "react-query";
import { UserStore } from "@/lib/zustand/User/user.store";

const MyOrdersPage = () => {
  const queryClient = useQueryClient();
  const { user } = UserStore();
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["transactions, delivery"],
    queryFn: getTransactions,
  });

  // FILTERING DATA
  const Pending = data?.filter(
    // (item: any) => item.service === "Deliver" && item.status !== "Delivered"
    (item: any) =>
      item.customer._id === user._id &&
      item.service === "Deliver" &&
      item.status !== "Delivered"
  );

  return (
    <>
      <PageWrapper>
        <div className="relative bg-white rounded ">
          {!isSuccess ? (
            <div className="relative w-full h-[78vh] flex items-center justify-center flex-col space-y-2">
              <Loader />
              <p className="text-gray-400 ">Loading...</p>
            </div>
          ) : (
            <DataTable columns={PendingOrderColumns} data={Pending} />
          )}
        </div>
      </PageWrapper>
    </>
  );
};

export default MyOrdersPage;

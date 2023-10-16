"use client";

import React, { useState } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { DataTable } from "@/components/react-table/main-table";
import { AccountsColumns } from "./Account-column";
import { Button } from "@/components/ui/button";
import { NewAccModal } from "./_components/New-Acc-Modal";
import { useQuery } from "react-query";
import { getAllAccounts } from "./services/api";
import Loader from "@/components/loader/Spinner";

export default function AccountsPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const {
    isLoading,
    data: accounts,
    isSuccess,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: getAllAccounts,
  });
  return (
    <>
      <NewAccModal modal={showModal} toggleModal={setShowModal} />

      <PageWrapper>
        <div className="relative">
          <Button
            className="absolute right-4 top-3 dark:border dark:border-blue-400 dark:bg-transparent dark:text-blue-400"
            onClick={() => setShowModal(true)}
          >
            Create Account
          </Button>

          {!isSuccess ? (
            <div className="relative w-full h-[78vh] flex items-center justify-center flex-col space-y-2">
              <Loader />
              <p className="text-gray-400 ">Loading...</p>
            </div>
          ) : (
            <DataTable columns={AccountsColumns} data={accounts} />
          )}
        </div>
      </PageWrapper>
    </>
  );
}

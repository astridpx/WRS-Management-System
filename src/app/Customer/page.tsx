"use client";

import { userColumns } from "./users-column";
import { DataTable } from "../../components/react-table/main-table";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import AddNewCustomerModal from "@/components/Add-Customer/Add-Customer-Modal";
import addUserModalStore from "@/lib/zustand/CustomerPage-store/AddNew-Modal-store";
import { Button } from "@/components/ui/button";
import { useQuery } from "react-query";
import { getAllCustomers } from "./services/api";
import Loader from "@/components/loader/Spinner";
import EditUserModal from "./Edit-User-Modal";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const { toggleShowCustomerForm } = addUserModalStore();
  const {
    isLoading,
    isError,
    data: users,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });
  const [customer, setCustomer] = useState<any>([]);

  useEffect(() => {
    if (isSuccess) {
      const newCustomer = users?.map((user: any) => {
        console.log(user);
        const User = {
          fullname: `${user.first_name} ${user.last_name}`,
          new_address: user.Main
            ? `${user.street} ${user.brgy} L-${user.city}`
            : user.address,
          ...user,
        };
        return User;
      });

      setCustomer(newCustomer);
    }
  }, [isSuccess, users]);

  return (
    <>
      <AddNewCustomerModal />
      <EditUserModal />

      <PageWrapper>
        <div className="relative ">
          <div className="flex justify-end ">
            <Button
              onClick={() => toggleShowCustomerForm(true)}
              className="dark:border dark:border-blue-400 dark:bg-transparent dark:text-blue-400"
            >
              Add New
            </Button>
          </div>
          {isLoading ? (
            <div className="relative w-full h-[78vh] flex items-center justify-center flex-col space-y-2">
              <Loader />
              <p className="text-gray-400 ">Loading...</p>
            </div>
          ) : (
            <DataTable columns={userColumns} data={customer} />
          )}
        </div>
      </PageWrapper>
    </>
  );
}

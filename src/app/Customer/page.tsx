"use client";

import { userColumns } from "./users-column";
import { DataTable } from "../../components/react-table/main-table";
import UserfakeData from "@/utils/table-data/MOCK_USERS_DATA .json";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import AddNewCustomerModal from "@/components/Add-Customer/Add-Customer-Modal";
import addUserModalStore from "@/lib/zustand/CustomerPage-store/AddNew-Modal-store";
import { Button } from "@/components/ui/button";
import { useQuery } from "react-query";
import { getUser } from "./APIs/api";
import Loader from "@/components/loader/Spinner";
import EditUserModal from "./Edit-User-Modal";
import { useTheme } from "next-themes";

export default function UsersPage() {
  const { toggleShowCustomerForm } = addUserModalStore();
  const {
    isLoading,
    isError,
    data: users,
    error,
    isSuccess,
  }: any = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });
  const newUser = users?.data?.map((user: any) => {
    const User = {
      fullname: `${user.first_name} ${user.last_name}`,
      ...user,
    };
    return User;
  });

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
            <DataTable columns={userColumns} data={newUser} />
          )}
        </div>
      </PageWrapper>
    </>
  );
}

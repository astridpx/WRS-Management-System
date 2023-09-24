"use client";

import React from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { ReportPageModalStore } from "@/lib/zustand/ReportPage-store/Btn-Modal";
import { DataTableRowProps } from "../../../../typings";

function ModalBtnIcon<TData>({ row }: DataTableRowProps<TData>) {
  const { toggleDetailModal } = ReportPageModalStore();

  return (
    <>
      <BsBoxArrowUpRight
        size={20}
        className="cursor-pointer hover:text-blue-600"
        onClick={() => toggleDetailModal(true)}
      />
    </>
  );
}

export default ModalBtnIcon;

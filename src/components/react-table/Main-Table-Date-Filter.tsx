// ? Table component ith date filter

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "../Date-Picker/Date-Picker";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  HiMiniChevronDoubleLeft,
  HiMiniChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
// import DataTablePagination from "./data-tables-pagination";

// ? TYPESOF DATA TABLE
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTableFilterDate<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>(new Date());

  const [tableFilter, setTableFilter] = useState<string>("");
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: tableFilter,
    },
    onGlobalFilterChange: setTableFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <div className="rounded-md border">
        <div className="flex items-center justify-between p-4  border-b ">
          <Input
            placeholder="Search..."
            value={tableFilter}
            onChange={(e) => setTableFilter(e.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
            onClick={() => console.warn(dateFrom?.getFullYear())}
          />

          <div className="flex items-center gap-x-4">
            <DatePicker
              variant={"outline"}
              calendar_width={"w-[13rem]"}
              calendar_text={"Pick a date from"}
              date={dateFrom}
              setDate={setDateFrom}
              isValid={
                dateFrom !== undefined && dateTo !== undefined
                  ? dateFrom > dateTo
                    ? "border-2 border-red-400"
                    : false
                  : false
              }
            />
            <DatePicker
              variant={"outline"}
              calendar_width={"w-[13rem]"}
              calendar_text={"Pick a date to"}
              date={dateTo}
              setDate={setDateTo}
            />
          </div>
        </div>

        <Table className="dark:text-dark_text">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-slate-400 dark:text-dark_text">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* // ? PAGINATION */}
        {/* <DataTablePagination table={table} /> */}
        <div className="w-full flex justify-end items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <HiMiniChevronDoubleLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <HiChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <HiChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <HiMiniChevronDoubleRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}

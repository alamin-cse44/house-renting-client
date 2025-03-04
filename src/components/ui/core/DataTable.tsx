import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { IUserDetails } from "@/types";

interface TableProps {
  data: IUserDetails[];
  columns: ColumnDef<IUserDetails>[];
  //   onDelete: (id: number) => void;
  //   onRoleChange: (id: number, newRole: string) => void;
}

export default function DataTable({ data, columns }: TableProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [globalFilter, setGlobalFilter] = useState(
    searchParams.get("search") || ""
  );
  const [roleFilter, setRoleFilter] = useState(searchParams.get("role") || "");
  const [pageSize, setPageSize] = useState(
    Number(searchParams.get("limit")) || 3
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (globalFilter) params.set("search", globalFilter);
    if (roleFilter) params.set("role", roleFilter);
    params.set("limit", pageSize.toString());
    router.push(`${pathname}?${params.toString()}`);
  }, [globalFilter, roleFilter, pageSize]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search users..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full max-w-sm"
        />
        {/* <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value)}>
          <SelectItem value="">All Roles</SelectItem>
          <SelectItem value="Admin">Admin</SelectItem>
          <SelectItem value="Landlord">Landlord</SelectItem>
          <SelectItem value="Tenant">Tenant</SelectItem>
        </Select> */}
        <Select
          value={roleFilter}
          onValueChange={(value) => setRoleFilter(value)}
        >
          <SelectTrigger className="w-[150px]">
            {" "}
            {/* Ensure a width for visibility */}
            <span>Filter by role</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="landLord">Landlord</SelectItem>
            <SelectItem value="tenant">Tenant</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={pageSize.toString()}
          onValueChange={(value) => setPageSize(Number(value))}
        >
          <SelectTrigger className="w-[150px]">
            {" "}
            {/* Ensure a width for visibility */}
            <span>{pageSize} Rows</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">2 Rows</SelectItem>
            <SelectItem value="10">10 Rows</SelectItem>
            <SelectItem value="20">20 Rows</SelectItem>
            <SelectItem value="50">50 Rows</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="p-3 text-left border-b cursor-pointer"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc"
                      ? " ▲"
                      : header.column.getIsSorted() === "desc"
                      ? " ▼"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <Button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className="bg-gray-500"
        >
          Previous
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          className="bg-gray-500"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

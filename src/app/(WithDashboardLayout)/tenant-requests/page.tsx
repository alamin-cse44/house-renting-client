"use client";

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IRentalRequest } from "@/types";
import { blockUser } from "@/services/AdminService";
import { toast } from "sonner";
import DeleteConfirmationModal from "@/components/ui/core/DeleteConfirmationModal";
import { getAllMyRequests } from "@/services/RentingService";

const TenantRequestsTable = () => {
  const router = useRouter();
  const [requests, setRequests] = useState<IRentalRequest[]>([]);
  const [status, setStatus] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const fetchRequests = async () => {
    setLoading(true); // Show loader before fetching

    try {
      const queryParams: Record<string, string> = {};
      if (status && status !== "") queryParams.isBlocked = status;
      if (pageSize) queryParams.limit = pageSize.toString();
      if (pageIndex) queryParams.page = pageIndex.toString();

      const query = new URLSearchParams(queryParams).toString();
      router.push(`${pathname}?${query}`);

      const res = await getAllMyRequests(query);

      if (!res) throw new Error("Failed to fetch users");
      console.log(res);

      setRequests(res?.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // Hide loader after fetching
    }
  };
  // Fetch requests
  useEffect(() => {
    fetchRequests();
  }, [status, pageSize, pageIndex]);

  console.log("requests", requests);

  // Paginate the data using useMemo
  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return requests.slice(start, end);
  }, [requests, pageIndex, pageSize]);

  // Handle delete
  const handlePayment = async (data: IRentalRequest) => {
    console.log(data);
    setSelectedId(data?._id as string);
    // setSelectedItem(data?.name as string);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await blockUser(selectedId);
        console.log(res);
        if (res.success) {
          fetchRequests();
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const columns: ColumnDef<IRentalRequest>[] = [
    { accessorKey: "landlord.name", header: "Landlord" },
    { accessorKey: "landlord.email", header: "Landlord Email" },
    { accessorKey: "listing.category", header: "Apartment Type" },
    { accessorKey: "listing.bedrooms", header: "Bedrooms" },
    { accessorKey: "moveInDate", header: "Move In Date" },
    {
      accessorKey: "rentalStatus",
      header: "Renting Status",
      cell: ({ row }) => (
        <>
          {row.original.rentalStatus === "pending" && (
            <p
              className={`text-center px-2 rounded bg-blue-500 text-white p-2 `}
            >
              Pending
            </p>
          )}
          {row.original.rentalStatus === "approved" && (
            <p
              className={`text-center px-2 rounded bg-green-500 text-white p-2 `}
            >
              Approved
            </p>
          )}
          {row.original.rentalStatus === "rejected" && (
            <p
              className={`text-center px-2 rounded bg-red-500 text-white p-2 `}
            >
              Rejected
            </p>
          )}
        </>
      ),
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: ({ row }) => (
        <>
          {row.original.paymentStatus === "successed" ? (
            <p
              className={`text-center px-2 rounded bg-green-800 text-white p-2 `}
            >
              Successed
            </p>
          ): (
            <p
              className={`text-center px-2 rounded bg-red-500 text-white p-2 `}
            >
              NO
            </p>
          )}


        </>
      ),
    },
    {
      accessorKey: "action",
      header: "Payment Action",
      cell: ({ row }) => (
        <>
          {row.original.rentalStatus === "approved" ? (
            <Button className="w-full">Click to pay</Button>
          ): ""}
        </>
      ),
    },
  ];

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4 p-4">
      {/* Search & Filter Inputs */}
      <div className="flex gap-2 w-[200px]">
        <Select
          onValueChange={(value) => setStatus(value === "all" ? "" : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Renting Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="all">
              All
            </SelectItem>
            <SelectItem className="cursor-pointer" value="pending">
              Pending
            </SelectItem>
            <SelectItem className="cursor-pointer" value="approved">
              Approved
            </SelectItem>
            <SelectItem className="cursor-pointer" value="rejected">
              Rejected
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border p-2 bg-gray-100">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {loading && "Loading..."}
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2 border">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center p-2">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 ">
        <div>
          <Select onValueChange={(value) => setPageSize(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder={`Rows: ${pageSize}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="cursor-pointer" value="2">
                2
              </SelectItem>
              <SelectItem className="cursor-pointer" value="10">
                10
              </SelectItem>
              <SelectItem className="cursor-pointer" value="20">
                20
              </SelectItem>
              <SelectItem className="cursor-pointer" value="50">
                50
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Button
            disabled={pageIndex === 0}
            onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          >
            Prev
          </Button>
          <span className="mx-4">
            Page {pageIndex + 1} of {Math.ceil(requests?.length / pageSize)}
          </span>
          <Button
            disabled={(pageIndex + 1) * pageSize >= requests?.length}
            onClick={() => setPageIndex((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default TenantRequestsTable;

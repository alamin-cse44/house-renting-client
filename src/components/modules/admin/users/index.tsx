"use client";

import { NMTable } from "@/components/ui/core/NMTable";
import { IUserDetails } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

const ManageUsers = ({ users }: { users: IUserDetails[] }) => {
  console.log("users", users);

  const handleDelete = async (data: IUserDetails) => {};

  const columns: ColumnDef<IUserDetails>[] = [
    // {
    //   accessorKey: "image",
    //   header: () => <div>Category Name</div>,
    //   cell: ({ row }) => (
    //     <div className="flex items-center space-x-3">
    //       <Image
    //         src={row.original?.image}
    //         alt={row.original?.name}
    //         width={40}
    //         height={40}
    //         className="w-8 h-8 rounded-full"
    //       />
    //       <span className="truncate">{row.original.name}</span>
    //     </div>
    //   ),
    // },
    {
      accessorKey: "name",
      header: () => <div>Name</div>,
      cell: ({ row }) => (
        <div>
          <h2>{row.original?.name}</h2>
        </div>
      ),
    },

    {
      accessorKey: "email",
      header: () => <div>Email</div>,
      cell: ({ row }) => (
        <div>
          <h2>{row.original?.email}</h2>
        </div>
      ),
    },

    {
      accessorKey: "phone",
      header: () => <div>Phone</div>,
      cell: ({ row }) => (
        <div>
          <h2>{row.original?.phone}</h2>
        </div>
      ),
    },

    {
      accessorKey: "role",
      header: () => <div>Role</div>,
      cell: ({ row }) => (
        <div>
          {row.original?.role === "admin" && (
            <p className="text-white border bg-primary   text-center py-1 rounded">
              {row.original?.role}
            </p>
          )}
          {row.original?.role === "landLord" && (
            <p className="text-white border bg-indigo-500  text-center py-1 rounded">
              {row.original?.role}
            </p>
          )}
          {row.original?.role === "tenant" && (
            <p className="text-white border bg-lime-600  text-center py-1 rounded">
              {row.original?.role}
            </p>
          )}
        </div>
      ),
    },

    {
      accessorKey: "isBlocked",
      header: () => <div>isBlocked</div>,
      cell: ({ row }) => (
        <div>
          {row.original.isBlocked ? (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              Blocked
            </p>
          ) : (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              Active
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <button
          className="text-red-500"
          title="Delete"
          onClick={() => handleDelete(row.original)}
        >
          <Trash className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <h1>Manage users</h1>
      <NMTable data={users} columns={columns} />
    </div>
  );
};

export default ManageUsers;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormItem } from "@/components/ui/form";
import useAxiosSecure from "@/hooks/AxiosSecure";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { Edit } from "lucide-react"; // Import the edit icon from Lucide
import { TUser } from "@/types/user/user";

const ManageUsers: React.FC = () => {
  const axios = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [editLoading, setEditLoading] = useState(false); // State for edit loading
  const [editModalOpen, setEditModalOpen] = useState(false); // State for edit modal
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null); // To hold the selected slot ID


  const [editStatus, setEditStatus] = useState(""); // State to hold the new status

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(`/users/get-users`);
      console.log(res?.data);
      setUsers(res?.data?.data);
    };
    getUsers();
  }, [!editLoading]);


  
  // Define the columns for the slots table
  const columns = useMemo<ColumnDef<TUser>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="text-center">
            {row.original.name || "N/A"}
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className="text-center">
            {row.original.email || "N/A"}
          </div>
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => (
          <div className="text-center">
            {row.original.phone || "N/A"}
          </div>
        ),
      },
      {
        accessorKey: "address",
        header: "Address",
        cell: ({ row }) => (
          <div className="text-center">
            {row.original.address || "N/A"}
          </div>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <div className="capitalize">{row.original.role}</div>
            <Button
              onClick={() => {
                setSelectedSlotId(row.original._id);
                setEditModalOpen(true);
                // You can set any additional state if needed
              }}
              variant="outline"
              className="ml-2"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );
  
  const table = useReactTable({
    data: users || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });



  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      const response = await axios.post(`/auth/update-user/${selectedSlotId}`, {
        role: editStatus, // Send the updated status
      });
      toast.success(response?.data?.message);
      setEditModalOpen(false);
    } catch (error: any) {
      console.log(error.response?.data);
      toast.error(error?.response?.data?.message);
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditStatus(e.target.value);
  };


  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
          Manage Users
        </h2>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="table-auto w-full border-2 border-gray-300/50-collapse">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="border border-gray-300 px-4 py-2 text-center">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b hover:bg-gray-100">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="border border-gray-300 px-4 py-2 text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Edit Slot Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogTrigger asChild>
        </DialogTrigger>
        <DialogContent className="max-w-full sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Slot</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <FormItem className="mb-4">
              <label htmlFor="role" className="block mb-1">
                Update Booking Status
              </label>
              <select
                id="role"
                value={editStatus}
                onChange={handleEditStatusChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </FormItem>
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={editLoading}>
                {editLoading ? <Loader className="animate-spin" /> : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageUsers;

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
import { Input } from "@/components/ui/input";
import useAxiosSecure from "@/hooks/AxiosSecure";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import useSlots from "@/hooks/useSlots";
import { TSlot } from "@/types/services";
import useAxiosPublic from "@/hooks/AxiosPublic";
import { Edit } from "lucide-react"; // Import the edit icon from Lucide

const ManageSlots: React.FC = () => {
  const axiosPublic = useAxiosPublic();
  const axios = useAxiosSecure();
  const [services, setServices] = useState([]);
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false); // State for edit loading

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false); // State for edit modal
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null); // To hold the selected slot ID
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    startTime: "01:00",
    endTime: "23:00",
  });

  const [editStatus, setEditStatus] = useState(""); // State to hold the new status

  useEffect(() => {
    const getServices = async () => {
      const res = await axiosPublic.get(`/services`);
      setServices(res?.data?.data);
    };
    getServices();
  }, [axiosPublic]);

  const { data: slots, isLoading, isError, refetch } = useSlots();
  console.log(slots);
  
  // Define the columns for the slots table
  const columns = useMemo<ColumnDef<TSlot>[]>(
    () => [
      {
        accessorKey: "service.name",
        header: "Service Name",
        cell: ({ row }) => {
          return (
            <div className="text-center">
              {(row.original.service as any)?.name || "N/A"}
            </div>
          );
        },
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
          <div className="text-center">{row.original.date}</div>
        ),
      },
      {
        accessorKey: "startTime",
        header: "Start Time",
        cell: ({ row }) => (
          <div className="text-center">{row.original.startTime}</div>
        ),
      },
      {
        accessorKey: "endTime",
        header: "End Time",
        cell: ({ row }) => (
          <div className="text-center">{row.original.endTime}</div>
        ),
      },
      {
        accessorKey: "isBooked",
        header: "Booking Status",
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <div
              className={`capitalize ${
                row.getValue("isBooked") === "cancelled" || row.getValue("isBooked") === "booked"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {row.original.isBooked}
            </div>
            <Button
              onClick={() => {
                setSelectedSlotId(row.original._id);
                setEditModalOpen(true);
                setEditStatus(row.getValue("isBooked"));
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
    data: slots || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    try {
      const response = await axios.post("/services/slots", formData); // Replace with your actual API route
      toast.success(response?.data?.message);
      refetch();
      setIsModalOpen(false);
    } catch (error:any) {
      console.log(error.response?.data);
      toast.error(error?.response?.data?.message);
    } finally {
      setAddLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      const response = await axios.patch(`/update-slot/${selectedSlotId}`, {
        status: editStatus, // Send the updated status
      });
      toast.success(response?.data?.message);
      refetch();
      setEditModalOpen(false);
    } catch (error: any) {
      console.log(error.response?.data);
      toast.error(error?.response?.data?.message);
    } finally {
      setEditLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, service: e.target.value });
  };

  const handleEditStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditStatus(e.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading slots</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
          Manage Slots
        </h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="bg-primary text-white px-4 py-2"
            >
              Add Slot
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-full sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Slot</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              {/* Service Selection */}
              <FormItem className="mb-4">
                <label htmlFor="service" className="block mb-1">
                  Select a Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleSelectChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {services?.map((service: any) => (
                    <option key={service?._id} value={service?._id}>
                      {service?.name}
                    </option>
                  ))}
                </select>
              </FormItem>

              {/* Date */}
              <FormItem className="mb-4">
                <label htmlFor="date" className="block mb-1">
                  Date
                </label>
                <Input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </FormItem>

              {/* Start Time */}
              <FormItem className="mb-4">
                <label htmlFor="startTime" className="block mb-1">
                  Start Time
                </label>
                <Input
                  id="startTime"
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                />
              </FormItem>

              {/* End Time */}
              <FormItem className="mb-4">
                <label htmlFor="endTime" className="block mb-1">
                  End Time
                </label>
                <Input
                  id="endTime"
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                />
              </FormItem>

              <DialogFooter>
                <Button type="submit" className="w-full" disabled={addLoading}>
                  {addLoading ? <Loader className="animate-spin" /> : "Submit"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="table-auto w-full border-2 border-gray-300/50-collapse">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="border px-4 py-2 text-center">
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
                  <td key={cell.id} className="border px-4 py-2 text-center">
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
              <label htmlFor="editStatus" className="block mb-1">
                Update Booking Status
              </label>
              <select
                id="editStatus"
                value={editStatus}
                onChange={handleEditStatusChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="available">Available</option>
                <option value="cancelled">Cancelled</option>
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

export default ManageSlots;

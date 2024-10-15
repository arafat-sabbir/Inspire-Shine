import React, { useState, useMemo } from "react";
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
import { TService } from "@/types/services";
import useServices from "@/hooks/useServices";
import useAxiosSecure from "@/hooks/AxiosSecure";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const categoryOptions = [
  "basic wash",
  "interior detailing",
  "exterior shine",
  "engine cleaning",
  "headlight restoration",
  "full service",
] as const;

type TCategory = typeof categoryOptions[number];

const ManageServices: React.FC = () => {
  const axios = useAxiosSecure();
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { data: services, isLoading, isError, refetch } = useServices();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<TService | null>(null);
  const [confirmDeleteService, setConfirmDeleteService] =
    useState<TService | null>(null);

  const columns = useMemo<ColumnDef<TService>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Service Name",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "price",
        header: "Price ($)",
      },
      {
        accessorKey: "category",
        header: "Category",
        cell({getValue}) {
          return <h1 className="capitalize text-center">{getValue() as TCategory}</h1>
        }
      },
      {
        accessorKey: "duration",
        header: "Duration (mins)",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setEditingService(row.original);
                setIsModalOpen(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(row.original)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: services,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading services</div>;

  const handleDelete = (service: TService) => {
    console.log("akldfj");
    setConfirmDeleteService(service);
    setIsDeleteDialogOpen(true);
  };

  const handleAddSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAddLoading(true);
    const formData = new FormData(event.currentTarget);
    const newService = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      duration: Number(formData.get("duration")),
      category: formData.get("category") as TCategory,
    };
    try {
      const response = await axios.post("/services", newService);
      toast.success(response?.data?.message);
      setIsModalOpen(false);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setAddLoading(false);
    }
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingService) return;
    setEditLoading(true);
    const formData = new FormData(event.currentTarget);
    const updatedService = {
      ...editingService,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      duration: Number(formData.get("duration")),
    };
    try {
      const response = await axios.put(
        `/services/${editingService._id}`,
        updatedService
      );
      toast.success(response?.data?.message);
      setIsModalOpen(false);
      setEditingService(null);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setEditLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!confirmDeleteService) return;
    setDeleteLoading(true);
    try {
      const response = await axios.delete(
        `/services/${confirmDeleteService._id}`
      );
      toast.success(response?.data?.message);
      setIsDeleteDialogOpen(false);
      setConfirmDeleteService(null);
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
          Manage Services
        </h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingService(null);
                setIsModalOpen(true);
              }}
            >
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-full sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingService ? "Edit Service" : "Add Service"}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={editingService ? handleEditSubmit : handleAddSubmit}
            >
              <FormItem>
                <label htmlFor="name" className="mb-2 font-medium">
                  Service Name
                </label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingService?.name || ""}
                  required
                />
              </FormItem>
              <FormItem>
                <label htmlFor="description" className="mb-2 font-medium">
                  Description
                </label>
                <Input
                  id="description"
                  name="description"
                  defaultValue={editingService?.description || ""}
                  required
                />
              </FormItem>
              <FormItem>
                <label htmlFor="category" className="mb-2 font-medium">
                  Category
                </label>
                <Select
                  defaultValue={editingService?.category || ""}
                  name="category"
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((category:TCategory) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
              <FormItem>
                <label htmlFor="price" className="mb-2 font-medium">
                  Price
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  defaultValue={editingService?.price || ""}
                  required
                />
              </FormItem>
              <FormItem>
                <label htmlFor="duration" className="mb-2 font-medium">
                  Duration (mins)
                </label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  defaultValue={editingService?.duration || ""}
                  required
                />
              </FormItem>
              <DialogFooter>
                <Button disabled={addLoading || editLoading} type="submit">
                  {editingService ? (
                    <>
                      Update Service{" "}
                      {editLoading && (
                        <Loader className="animate-spin ml-2 h-4 w-4" />
                      )}
                    </>
                  ) : (
                    <>
                      Add Service{" "}
                      {addLoading && (
                        <Loader className="animate-spin ml-2 h-4 w-4" />
                      )}
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-[100vw] md:w-full overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm lg:text-base"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm lg:text-base"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDeleteDialogOpen && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="max-w-full sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={deleteLoading}
              >
                Confirm{" "}
                {deleteLoading && (
                  <Loader className="animate-spin ml-2 h-4 w-4" />
                )}
              </Button>
              <Button onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ManageServices;

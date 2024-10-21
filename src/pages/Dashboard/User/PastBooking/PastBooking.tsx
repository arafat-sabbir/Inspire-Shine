/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useMemo } from "react";
import useBookings from "@/hooks/useBookingData";
import { TBooking } from "@/types/booking/booking";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { Loader } from "lucide-react";

const PastBooking = () => {
  const { isLoading, isError, error, isPending, data } = useBookings();
  console.log(error);

  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time to midnight for accurate comparison

  // Filter past bookings
  const pastBookings = useMemo(() => {
    if (!data) return [];
    return data.filter((booking: TBooking) => {
      const bookingDate = new Date(booking.slot?.date);
      return bookingDate < today; // Only include bookings before today
    });
  }, [data, today]);

  // Define the table columns
  const columns = useMemo<ColumnDef<TBooking>[]>(
    () => [
      {
        accessorKey: "customer.name", // Accessing nested property
        header: () => <div className="text-center">Customer Name</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.original.customer.name}</div>
        ),
      },
      {
        accessorKey: "customer.email",
        header: () => <div className="text-center">Email</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.original.customer.email}</div>
        ),
      },
      {
        accessorKey: "customer.phone",
        header: () => <div className="text-center">Phone</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.original.customer.phone}</div>
        ),
      },
      {
        accessorKey: "service.name",
        header: () => <div className="text-center">Service Name</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.original.service.name}</div>
        ),
      },
      {
        accessorKey: "slot.date",
        header: () => <div className="text-center">Date</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.original.slot?.date}</div>
        ),
      },
      {
        accessorKey: "slot.startTime",
        header: () => <div className="text-center">Start Time</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.original.slot?.startTime}</div>
        ),
      },
      {
        accessorKey: "slot.endTime",
        header: () => <div className="text-center">End Time</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.original.slot?.endTime}</div>
        ),
      },
      {
        accessorKey: "isPaid",
        header: () => <div className="text-center">Payment Status</div>,
        cell: ({ row }) => (
          <div className="text-center">
            {row.original.isPaid ? "Paid" : "Not Paid"}
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: pastBookings || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading || isPending) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <div>Something Went Wrong</div>;
  }

  return (
    <div>
      <p className="text-center font-semibold tracking-wide text-2xl py-2">
        Total Past Bookings: {pastBookings.length}
      </p>
      {pastBookings.length > 0 ? (
        <table className="min-w-full bg-white border dark:bg-gray-700 dark:text-white">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-2 px-4 bg-gray-100 dark:bg-gray-700 dark:text-white border"
                  >
                    {header.isPlaceholder
                      ? null
                      : (header.column.columnDef.header as any)?.()}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-2 px-4 border dark:text-white"
                  >
                    {cell.getValue() as ReactNode}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No past bookings available.</p>
      )}
    </div>
  );
};

export default PastBooking;

import { useMemo, useEffect, useState } from "react";
import useBookings from "@/hooks/useBookingData";
import { TBooking } from "@/types/booking/booking";
import { Loader } from "lucide-react";

const UpcomingBooking = () => {
  const { isLoading, isPending, isError, data } = useBookings();

  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time to midnight for accurate comparison

  // Filter upcoming bookings
  const upcomingBookings = useMemo(() => {
    return data?.filter((booking: TBooking) => {
      const bookingDate = new Date(booking.slot?.date);
      return bookingDate > today; // Only include bookings after today
    });
  }, [data, today]);

  const [countdowns, setCountdowns] = useState<string[]>([]);

  // Countdown timer function
  const getCountdown = (date: Date) => {
    const now = new Date();
    const timeDiff = date.getTime() - now.getTime();
    if (timeDiff <= 0) return "Started"; // Already started
    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    const hours = Math.floor((timeDiff / 1000 / 3600) % 24);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    // Update countdown every second
    const intervalId = setInterval(() => {
      if (upcomingBookings) {
        const newCountdowns = upcomingBookings.map((booking: TBooking) =>
          getCountdown(new Date(booking.slot.date))
        );
        setCountdowns(newCountdowns);
      }
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [upcomingBookings]);

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
        Total Upcoming Bookings: {upcomingBookings?.length || 0}
      </p>
      {upcomingBookings && upcomingBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingBookings.map((booking: TBooking, index: number) => (
            <div
              key={booking._id}
              className="border rounded-lg p-4 shadow-md bg-white dark:bg-gray-700 dark:text-white"
            >
              <div>
                <strong>Date:</strong>{" "}
                {new Date(booking.slot.date).toLocaleString()}
              </div>
              <div>
                <strong>Service:</strong> {booking.service?.name || "N/A"}
              </div>
              <div className="mt-2">
                <strong>Countdown:</strong>{" "}
                {countdowns[index] || getCountdown(new Date(booking.slot.date))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No upcoming bookings available.</p>
      )}
    </div>
  );
};

export default UpcomingBooking;

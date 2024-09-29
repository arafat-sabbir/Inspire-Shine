import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/layout/Container/Container";
import { Calendar } from "@/components/ui/calendar";
import moment from "moment";
import { TSlot } from "@/types/services";
const ServiceDetail = () => {
  const navigate = useNavigate();
  // Scroll to top of the page when component loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { state: data } = useLocation();

  // State for quantity and booking
  const [selectedSlot, setSelectedSlot] = useState<TSlot | null>(null);

  // Add to cart mutation handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { slots, ...service } = data;
  const handleBookService = () => {
    navigate("/book", { state: { service, slot: selectedSlot } });
  };

  return (
    <Container className="py-10">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
        {/* Service Information */}
        <div className="space-y-6 p-6 max-h-[250px] bg-white dark:bg-[#1B1B1B] rounded-lg shadow-md transition-all duration-300">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            {service?.name}
          </h1>
          <p className="text-xl font-bold text-gray-900 dark:text-gray-300">
            Price : ৳{service?.price}
          </p>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
            {service?.description}
          </p>
          <p className="text-lg font-medium text-gray-800 dark:text-gray-300">
            Duration:{" "}
            {moment.duration(service?.duration, "minutes").hours() > 0 &&
              `${moment.duration(service?.duration, "minutes").hours()}h `}
            {moment.duration(service?.duration, "minutes").minutes() > 0 &&
              `${moment
                .duration(service?.duration, "minutes")
                .minutes()} minutes`}
          </p>
        </div>

        {/* Booking Section */}
        {data?.slots.length > 0 ? (
          <div className="space-y-6 p-6 bg-white dark:bg-[#1B1B1B] rounded-lg shadow-md transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Book This Service
            </h2>

            {/* Calendar for Date Selection */}
            <div className="space-y-4">
              <h3 className="text-md font-medium text-gray-800 dark:text-gray-300">
                Select Date:
              </h3>
              <Calendar
                mode="single"
                selectedDate={new Date(data?.slots[0].date)}
                disabled={true}
                showOutsideDays
              />
            </div>

            {/* Time Slots for Booking */}
            <div className="space-y-4">
              <h3 className="text-md font-medium text-gray-800 dark:text-gray-300">
                Select Time Slot:
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {data?.slots?.map((slot:TSlot, index:number) => (
                  <Button
                    key={index}
                    disabled={slot?.isBooked === "booked"}
                    className={`${
                      selectedSlot?._id === slot?._id
                        ? "bg-primary text-white"
                        : "bg-gray-500 dark:bg-gray-700"
                    } hover:bg-primary-dark transition-colors duration-300 disabled:cursor-not-allowed`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot?.startTime} - {slot?.endTime}
                  </Button>
                ))}
              </div>
            </div>

            {/* Book Service Button */}
            <Button
              disabled={!selectedSlot || service?.isDeleted}
              className="w-full bg-primary text-white hover:bg-primary-dark transition-colors duration-300"
              onClick={handleBookService}
            >
              Book This Service
            </Button>
          </div>
        ) : (
          <div className="space-y-6 p-6 bg-white dark:bg-[#1B1B1B] rounded-lg shadow-md transition-all duration-300 text-xl text-primary font-medium">
            No Slots Available For This Service
          </div>
        )}
      </div>
    </Container>
  );
};

export default ServiceDetail;

import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import useMutateData from "@/hooks/MutateData";
import Container from "@/layout/Container/Container";
import { TService } from "@/types/services";
import { Calendar } from "@/components/ui/calendar";

const ServiceDetail = () => {
  // Scroll to top of the page when component loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { id } = useParams();
  const { state: data } = useLocation();
  const service: TService = data;

  // State for quantity and booking
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);  // Mock available slots
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Fetch available slots based on the selected date
  useEffect(() => {
    // Fetch slots based on selected date
    const fetchAvailableSlots = async (date: Date) => {
      // Mock API call for available slots
      const slots = [
        "09:00 AM",
        "10:00 AM",
        "12:00 PM",
        "02:00 PM",
        "04:00 PM"
      ];
      setAvailableSlots(slots);
    };

    fetchAvailableSlots(selectedDate);
  }, [selectedDate]);

  // Add to cart mutation handler
  const { mutate, isPending } = useMutateData(
    "post",
    "/cart/add-to-cart",
    {
      product: service?._id,
      quantity,
      date: selectedDate,
      timeSlot: selectedSlot,
    },
    ["cart", "service"]
  );

  const handleBookService = () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }
    mutate();
  };

  return (
    <Container className="py-10">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
        {/* Service Information */}
        <div className="space-y-6 p-6 bg-white dark:bg-[#1B1B1B] rounded-lg shadow-md transition-all duration-300">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            {service?.name}
          </h1>
          <p className="text-xl font-bold text-gray-900 dark:text-gray-300">
            ৳{service?.price}
          </p>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
            {service?.description}
          </p>
          <p className="text-lg font-medium text-gray-800 dark:text-gray-300">
            Duration: {service?.duration} hours
          </p>
        </div>

        {/* Booking Section */}
        <div className="space-y-6 p-6 bg-white dark:bg-[#1B1B1B] rounded-lg shadow-md transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Book This Service
          </h2>

          {/* Calendar for Date Selection */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-gray-800 dark:text-gray-300">
              Select Date:
            </h3>
            <Calendar selectedDate={selectedDate} onChange={setSelectedDate} />
          </div>

          {/* Time Slots for Booking */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-gray-800 dark:text-gray-300">
              Select Time Slot:
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {availableSlots.map((slot, index) => (
                <Button
                  key={index}
                  disabled={/* Logic to disable booked slots */ false}
                  className={`${
                    selectedSlot === slot
                      ? "bg-primary text-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  } hover:bg-primary-dark transition-colors duration-300`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              -
            </Button>
            <h1 className="w-[30px] mx-auto text-center text-lg font-semibold">
              {quantity}
            </h1>
            <Button
              variant="outline"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>

          {/* Book Service Button */}
          <Button
            disabled={isPending || !selectedSlot || service?.isDeleted}
            className="w-full bg-primary text-white hover:bg-primary-dark transition-colors duration-300"
            onClick={handleBookService}
          >
            {isPending ? (
              <>
                Booking
                <Loader className="animate-spin ml-2" size={20} />
              </>
            ) : (
              "Book This Service"
            )}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ServiceDetail;

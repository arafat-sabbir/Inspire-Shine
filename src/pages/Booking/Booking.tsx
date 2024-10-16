import { Input } from "@/components/ui/input";
import Container from "@/layout/Container/Container";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/features/hooks";
import { TService, TSlot } from "@/types/services";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import useAxiosSecure from "@/hooks/AxiosSecure";
import { toast } from "sonner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import date picker styles
import { useState } from "react";
import { Loader } from "lucide-react";

const vehicleTypes = [
  "car",
  "truck",
  "SUV",
  "van",
  "motorcycle",
  "bus",
  "electricVehicle",
  "hybridVehicle",
  "bicycle",
  "tractor",
] as const;

const bookingSchema = z.object({
  vehicleType: z.enum(vehicleTypes, {
    required_error: "Vehicle Type is required",
  }),
  vehicleBrand: z.string().min(1, "Vehicle Brand is required"),
  vehicleModel: z.string().min(1, "Vehicle Model is required"),
  manufacturingYear: z.number({
    required_error: "Manufacturing Year is required",
  }), // Updated to use Date type for year
  registrationPlate: z.string().min(1, "Registration Number is required"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const Booking = () => {
  const { state: data } = useLocation();
  const user = useAppSelector(selectCurrentUser);
  const { slot, service }: { slot: TSlot; service: TService } = data;

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      vehicleType: undefined,
      vehicleBrand: "",
      vehicleModel: "",
      manufacturingYear: undefined,
      registrationPlate: "",
    },
  });
  const axios = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values: BookingFormValues) => {
    setLoading(true);
    const bookingData = {
      ...values,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      name: user?.name,
      slotId: slot._id,
      serviceId: service._id,
      price: service.price,
    };
    console.log(values.manufacturingYear);
    try {
      const response = await axios.post("/bookings", bookingData);
      console.log(response?.data?.data?.payment_url);
      if (response?.data?.data?.payment_url) {
        window.location.href = response?.data?.data?.payment_url;
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="flex flex-col lg:flex-row gap-10 justify-between p-6 lg:p-12">
      {/* Left Side - Selected Service and Slot Information */}
      <div className="lg:w-1/2 p-6 bg-white shadow-lg rounded-md mb-6 lg:mb-0">
        <h2 className="text-3xl font-semibold text-primary mb-4">
          Booking Summary
        </h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {service.name}
          </h3>
          <p className="text-gray-600 mb-2">{service.description}</p>
          <p className="text-lg text-primary font-semibold">
            Price: ${service.price}
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Time Slot
          </h3>
          <p className="text-gray-600">
            Date:{" "}
            <span className="font-medium text-gray-800">
              {new Date(slot.date).toLocaleDateString()}
            </span>
          </p>
          <p className="text-gray-600">
            Start Time:{" "}
            <span className="font-medium text-gray-800">{slot.startTime}</span>
          </p>
          <p className="text-gray-600">
            End Time:{" "}
            <span className="font-medium text-gray-800">{slot.endTime}</span>
          </p>
        </div>
      </div>

      {/* Right Side - User Form */}
      <div className="lg:w-1/2 p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-3xl font-semibold text-primary mb-4">
          Your Information
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Disabled User Info */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Name
              </label>
              <Input
                type="text"
                disabled
                value={user?.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <Input
                type="email"
                disabled
                value={user?.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Phone
              </label>
              <Input
                type="text"
                disabled
                value={user?.phone}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Address
              </label>
              <Input
                type="text"
                disabled
                value={user?.address}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Vehicle Type Select */}
            <div>
              <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Type</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="" disabled>
                          Select vehicle type
                        </option>
                        {vehicleTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Other Fields */}
            <div>
              <FormField
                control={form.control}
                name="vehicleBrand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Brand</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your vehicle brand"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="vehicleModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Model</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your vehicle model"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Manufacturing Year as Date Picker */}
            <div>
              <FormField
                control={form.control}
                name="manufacturingYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manufacturing Year</FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={field.value ? new Date(field.value, 0) : null} // Ensure only the year is passed
                        onChange={
                          (
                            date: Date | null // Update the parameter type to Date | null
                          ) => field.onChange(date ? date.getFullYear() : null) // Set only the year
                        }
                        showYearPicker
                        dateFormat="yyyy"
                        placeholderText="Select Year"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="registrationPlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your vehicle registration number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={loading} type="submit" className="w-full bg-primary text-white">
              Confirm Booking {loading&&<Loader className="animate-spin ml-2"/>}
            </Button>
          </form>
        </Form>
      </div>
    </Container>
  );
};

export default Booking;

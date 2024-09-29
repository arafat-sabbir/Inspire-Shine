import Container from "@/layout/Container/Container";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/features/hooks";
import React from "react";
import { useLocation } from "react-router-dom";

export type TService = {
  _id: string;
  name: string;
  description: string;
  price: number;
  slots: [TSlot[]];
  duration: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface TSlot {
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Booking = () => {
  const { state: data } = useLocation();
  const user = useAppSelector(selectCurrentUser)
  const { slot, service }: { slot: TSlot; service: TService } = data;

  return (
    <Container className="flex flex-col lg:flex-row gap-10 justify-between p-6 lg:p-12 ">
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
            Date:
            <span className="font-medium text-gray-800">
              {new Date(slot.date).toLocaleDateString()}
            </span>
          </p>
          <p className="text-gray-600">
            Start Time:
            <span className="font-medium text-gray-800">{slot.startTime}</span>
          </p>
          <p className="text-gray-600">
            End Time:
            <span className="font-medium text-gray-800">{slot.endTime}</span>
          </p>
        </div>
      </div>

      {/* Right Side - User Form */}
      <div className="lg:w-1/2 p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-3xl font-semibold text-primary mb-4">
          Your Information
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              disabled
              value={user?.name}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              disabled
              value={user?.email}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Selected Time
            </label>
            <input
              type="text"
              value={`${new Date(slot.date).toLocaleDateString()} ${
                slot.startTime
              } - ${slot.endTime}`}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 text-center bg-primary text-white rounded-md hover:bg-primary-dark transition-all"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Booking;

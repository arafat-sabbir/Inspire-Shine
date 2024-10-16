interface TCustomer {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    address: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
  }
  
  interface TService {
    _id: string;
    name: string;
    description: string;
    price: number;
    duration: number; // Duration in seconds or minutes
    isDeleted: boolean;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
  }
  
  interface TSlot {
    _id: string;
    service: string; // Reference to service ID
    date: string; // Date in "YYYY-MM-DD" format
    startTime: string; // Start time in "HH:mm" format
    endTime: string; // End time in "HH:mm" format
    isBooked: string; // Booking status (e.g., "booked", "available", etc.)
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
  }
  
 export interface TBooking {
    _id: string;
    customer: TCustomer;
    service: TService;
    slot: TSlot; // Updated to reflect the structure of the slot object
    vehicleType: string;
    vehicleBrand: string;
    vehicleModel: string;
    manufacturingYear: string;
    registrationPlate: string;
    price: number; // Price of the service
    isPaid: boolean; // Indicates if the booking is paid
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
  }
  
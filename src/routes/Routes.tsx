import App from "@/App";
import NotFound from "@/components/NotFound/NotFound";
import MainLayout from "@/layout/MainLayout";
import Booking from "@/pages/Booking/Booking";
import Dashboard from "@/pages/Dashboard/Dashboard";
import ManageServices from "@/pages/Dashboard/Admin/Services/ManageServices";
import PastBooking from "@/pages/Dashboard/User/PastBooking/PastBooking";
import Profile from "@/pages/Dashboard/User/Profile/Profile";
import UpcomingBooking from "@/pages/Dashboard/User/UpcomingBooking/UpcomingBooking";
import Login from "@/pages/login/Login";
import Register from "@/pages/Register/Register";
import ServiceDetail from "@/pages/ServiceDetail/ServiceDetail";
import Services from "@/pages/Services/Services";
import { createBrowserRouter } from "react-router-dom";
import ManageSlots from "@/pages/Dashboard/Admin/Slots/ManageSlots";
import ManageUsers from "@/pages/Dashboard/Admin/Users/ManageUsers";
import BookingPage from "@/pages/Booking/BookingPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />, // Specify the error element here
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "/service/:id",
        element: <ServiceDetail />,
      },
      {
        path: "/book",
        element: <Booking />,
      },
      {
        path: "/booking",
        element: <BookingPage />,
      },
      // Additional nested routes can be added here
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "services",
        element: <ManageServices />,
      },
      {
        path: "slots",
        element: <ManageSlots />,
      },
      {
        path: "services/pastBookings",
        element: <PastBooking />,
      },
      {
        path: "users",
        element: <ManageUsers />,
      },
      {
        path: "services/upComingBookings",
        element: <UpcomingBooking />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "*", // Wildcard route for unmatched paths (optional, as it's handled above)
    element: <NotFound />, // Render NotFound component if you want to handle it at a higher level
  },
]);

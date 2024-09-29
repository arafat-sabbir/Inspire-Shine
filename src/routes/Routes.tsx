import App from "@/App";
import NotFound from "@/components/NotFound/NotFound";
import MainLayout from "@/layout/MainLayout";
import Booking from "@/pages/Booking/Booking";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Login from "@/pages/login/Login";
import Register from "@/pages/Register/Register";
import ServiceDetail from "@/pages/ServiceDetail/ServiceDetail";
import Services from "@/pages/Services/Services";
import { createBrowserRouter } from "react-router-dom";

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
        path:"/service/:id",
        element: <ServiceDetail />
      },
      {
        path:"/book",
        element: <Booking />
      }
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
  },
  {
    path: "*", // Wildcard route for unmatched paths (optional, as it's handled above)
    element: <NotFound />, // Render NotFound component if you want to handle it at a higher level
  }
]);

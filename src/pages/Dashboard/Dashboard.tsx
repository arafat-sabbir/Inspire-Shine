import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, List, Sun, Moon, ChevronDown, ChevronUp } from "lucide-react"; // Import relevant icons
import { Button } from "@/components/ui/button";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/features/hooks";

const sidebarVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 30,
    },
  },
  closed: {
    opacity: 0,
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 30,
    },
  },
};

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768); // Default to open on large devices
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
    if (window.innerWidth >= 768) {
      setIsOpen(true); // Keep sidebar open on large devices
    } else {
      setIsOpen(false); // Close sidebar on mobile
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const user = useAppSelector(selectCurrentUser);
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <motion.div
        className={`h-full w-[250px] border-r-2 border-r-gray-200 fixed top-0 left-0  md:relative  text-white flex flex-col z-50`}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        {isOpen && (
          <Link to="/" className="text-xl font-bold mb-4 mx-auto">
            <img
              src={
                theme === "dark"
                  ? "/images/logo.png"
                  : "/images/inspire-shine.png"
              }
              alt="Logo"
              className="w-[100px]  h-[100px]"
            />
          </Link>
        )}
        <nav className={`flex flex-col ${isOpen ? "mt-[50px]" : "mt-[80px]"}`}>
          {/* Services Section */}
          {user?.role === "admin" && (
            <div className="flex flex-col">
              <ul className="space-y-4">
                <NavLink
                  to={"/dashboard/services"}
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`flex items-center py-2 px-4 text-title-dark bg-slate-700 hover:bg-gray-700 ${
                    isOpen ? "justify-between" : "justify-center"
                  }`}
                >
                  Manage Services
                </NavLink>
                <NavLink
                  to={"/dashboard/slots"}
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`flex items-center py-2 px-4 text-title-dark bg-gray-700 hover:bg-gray-700 ${
                    isOpen ? "justify-between" : "justify-center"
                  }`}
                >
                  Manage Slots
                </NavLink>
              </ul>
            </div>
          )}
          {user?.role === "user" && (
            <>
              <div className="flex flex-col">
                <Button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`flex items-center py-2 px-4 text-title-dark hover:bg-gray-700 bg-gray-300 ${
                    isOpen ? "justify-between" : "justify-center"
                  }`}
                >
                  {isOpen && "Manage Services"}
                  {isServicesOpen ? <ChevronUp /> : <ChevronDown />}
                </Button>
                {isServicesOpen && isOpen && (
                  <div className="flex flex-col ml-4">
                    <NavLink
                      to="/dashboard/services/pastBookings"
                      className="flex items-center py-2 px-4 hover:bg-gray-700 text-title-dark hover:text-title"
                    >
                      <Plus className="mr-2" /> Past Bookings
                    </NavLink>
                    <NavLink
                      to="/dashboard/services/upcomingBookings"
                      className="flex items-center py-2 px-4 hover:bg-gray-700 text-title-dark hover:text-title"
                    >
                      <List className="mr-2" /> Upcoming Bookings
                    </NavLink>
                  </div>
                )}
              </div>
              <NavLink className={"flex items-center py-2 px-4 text-title-dark hover:bg-gray-700 bg-gray-300 my-4"} to="/dashboard/profile">Profile</NavLink>
            </>
          )}
        </nav>
      </motion.div>

      {/* Mobile Toggle Button */}
      {isMobile && !isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="absolute top-4 left-4 z-10 text-white"
        >
          Open Sidebar
        </Button>
      )}

      {/* Navbar */}
      <div className="flex flex-col flex-1 border-b-2 border-b-gray-200">
        <div className="flex justify-between items-center p-4 bg-gray-200">
          <h1 className="text-xl font-bold">Manage Services</h1>
          <Button
            className="rounded-full hover:border-gray-500 border-gray-500"
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-90 scale-100 transition-all" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem] text-white scale-100 transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
        {/* Main Content */}
        <div className="p-2">
          <Outlet />
        </div>
      </div>

      {/* Overlay */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;

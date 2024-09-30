import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  List,
  ChevronDown,
  Kanban,
} from "lucide-react"; // Import relevant icons
import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";
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

  const { theme } = useTheme();
  const user = useAppSelector(selectCurrentUser);
  console.log(user);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <motion.div
        className={`h-full w-[250px] fixed top-0 left-0  md:relative bg-gray-800 text-white flex flex-col z-50`}
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
              className="w-[100px] h-[100px]"
            />
          </Link>
        )}
        {/* <Button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white absolute top-4 -right-[19px] rounded-full p-0 px-1.5"
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </Button> */}
        <nav className={`flex flex-col ${isOpen ? "mt-[50px]" : "mt-[80px]"}`}>
          {/* Services Section */}
          <div className="flex flex-col">
            <Button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className={`flex items-center py-2 px-4 text-title-dark hover:bg-gray-700 ${
                isOpen ? "justify-between" : "justify-center"
              }`}
            >
              {isOpen && "Services"}
              {!isOpen && <Kanban className="rotate-[270deg]" />}
              {isOpen ? (
                !isServicesOpen ? (
                  <ChevronDown className={`${isOpen && "mr-2"}`} />
                ) : (
                  <ChevronDown className={`${isOpen && "mr-2"} rotate-180`} />
                )
              ) : (
                ""
              )}
            </Button>
            {isServicesOpen && isOpen && (
              <div className="flex flex-col ml-4">
                <Link
                  to="/services/create"
                  className="flex items-center py-2 px-4 hover:bg-gray-700 text-title-dark hover:text-title"
                >
                  <Plus className="mr-2" /> Create Service
                </Link>
                <Link
                  to="/services/manage"
                  className="flex items-center py-2 px-4 hover:bg-gray-700 text-title-dark hover:text-title"
                >
                  <List className="mr-2" /> Manage Service
                </Link>
              </div>
            )}
          </div>
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
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
          <h1 className="text-xl font-bold">Manage</h1>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gray-800 text-white hover:bg-gray-700"
          >
            Toggle
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
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

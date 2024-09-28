import React from "react";
import { motion } from "framer-motion";
import { Home, Settings, User, ChevronLeft, ChevronRight } from "lucide-react"; // Import icons from Lucid React
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";

const sidebarVariants = {
  open: {
    width: "250px",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 30,
    },
  },
  closed: {
    width: "60px",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 30,
    },
  },
};

const Dashboard = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const  {theme}= useTheme()

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <motion.div
        className={`text-white flex flex-col h-full relative ${
          isMobile && !isOpen ? "hidden" : ""
        }`}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        {isOpen && (
          <Link to={"/"} className="text-xl font-bold">
            <img src={theme==="dark"?"/images/logo.png":"/images/inspire-shine.png"} alt="Logo" className="w-[100px] h-[100px] mx-auto" />
          </Link>
        )}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white absolute top-4 -right-[19px] rounded-full p-0 px-1.5"
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </Button>
        <nav className={`flex flex-col ${isOpen ? "mt-[50px]" : "mt-[80px]"}`}>
          <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700 text-title-dark hover:text-title">
            <Home className={`${isOpen && "mr-2"}`} /> {isOpen && "Dashboard"}
          </a>
          <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700 text-title-dark hover:text-title">
            <User className={`${isOpen && "mr-2"}`} /> {isOpen && "Profile"}
          </a>
          <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700 text-title-dark hover:text-title">
            <Settings className={`${isOpen && "mr-2"}`} /> {isOpen && "Settings"}
          </a>
          <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700 text-title-dark hover:text-title">
            <User className={`${isOpen && "mr-2"}`} /> {isOpen && "Logout"}
          </a>
        </nav>
      </motion.div>

      {/* Mobile Toggle Button */}
      {isMobile && !isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="absolute top-4 left-4 z-10 bg-gray-800 text-white hover:bg-gray-700"
        >
          Open Sidebar
        </Button>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 p-6 bg-gray-100 dark:bg-gray-900 ${
          isOpen && isMobile ? "backdrop-blur-md" : ""
        }`}
        style={{
          filter: isOpen && isMobile ? "blur(8px)" : "none", // Adjust the blur intensity (change 8px to adjust the blur)
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Component */}
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold">Card {index + 1}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Some information about this card.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

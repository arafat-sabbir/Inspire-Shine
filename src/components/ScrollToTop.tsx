import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ScrollToTop = () => {
  const [scrollY, setScrollY] = useState(0);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setScrollY(window.scrollY);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Calculate progress as a percentage of total scrollable height
  let progress;
  if (typeof window !== "undefined") {
    progress =
      scrollY /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight);
  }

  return (
    <motion.button
      className="fixed z-[100] bottom-8 right-8 border-[3px] shadow-lg rounded-full p-4 text-main text-3xl"
      onClick={scrollToTop}
      initial={{ scale: 0 }}
      animate={{
        scale: progress! > 0.15 ? 1 : 0,
        borderColor: `hsla(0, 78%, 52%, ${progress})`,
      }}
      transition={{ duration: 0.3 }}
    >
      <ArrowUp className="text-primary font-bold" size={24} />
    </motion.button>
  );
};

export default ScrollToTop;

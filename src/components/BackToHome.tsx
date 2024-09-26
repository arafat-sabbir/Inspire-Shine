import { House } from "lucide-react";
import { Link } from "react-router-dom";

const BackToHome = () => {
  return (
    <Link
      to={"/"}
      className="absolute top-20 left-20 flex gap-1 hover:text-primary transition duration-300 text-xl items-center"
    >
      <House />
      Home
    </Link>
  );
};

export default BackToHome;

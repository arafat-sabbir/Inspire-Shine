import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { TUser } from "@/types/user/user";
import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/features/hooks";
import { Link } from "react-router-dom";
import { ShoppingCart, SquareChartGantt } from "lucide-react";

const UserProfile = ({ user }: { user: TUser; cart?: number }) => {
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
  };
  console.log(user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full p-1 h-12 w-12 shadow-md hover:shadow-lg"
        >
          <img
            src={
              "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"
            }
            className="w-full h-full rounded-full object-cover cursor-pointer"
            alt={user?.name || "User Profile"}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-6 space-y-2 flex flex-col items-center text-center bg-white rounded-xl shadow-lg border border-gray-200 w-64">
        <h1 className="capitalize font-bai text-lg font-semibold text-gray-800">
          {user?.name}
        </h1>
        <h3 className="text-md font-semibold font-bai text-gray-500">
          {user?.email}
        </h3>
        <Button className="w-full bg-primary hover:text-black text-white rounded-md py-2">
          <Link
            className="flex gap-2 items-center"
            to={"/cart"}
          >
            <ShoppingCart className="w-4 h-4" />
            My Cart 
          </Link>
        </Button>
        <Button className="w-full bg-primary hover:text-black text-white rounded-md py-2">
          <Link
            className="flex gap-2 items-center"
            to={"/dashboard"}
          >
            <SquareChartGantt className="w-4 h-4" />
            Dashboard
          </Link>
        </Button>
        <Button
          className="w-full bg-primary hover:text-black text-white rounded-md py-2"
          onClick={handleLogOut}
        >
          Logout
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;

import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import generateImage from "@/utils/generateImage";
import { TService } from "@/types/services";

const ServiceCard = ({ item }: { item: TService }) => {
  const { _id, name, description, price, duration, isDeleted } = item;

  return (
    <div className="max-w-[350px] w-full p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
      <div className="relative">
        <img
          src={generateImage(_id)}
          alt={name}
          className="w-full h-[200px] object-cover rounded-lg"
        />
        {isDeleted && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <p className="text-white font-semibold">Unavailable</p>
          </div>
        )}
      </div>
      <div className="pt-4 space-y-2">
        <h3 className="font-semibold text-gray-500 text-xs uppercase tracking-wide">
          Duration: {duration} hours
        </h3>
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600 text-sm truncate">
          {description}
        </p>
        <div className="flex justify-between items-center pt-2">
          <p className="text-primary font-semibold text-lg">${price}</p>
          <Link to={`/service/${_id}`} state={item}>
            <Button className="bg-primary text-white hover:bg-primary-dark transition-colors duration-300">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

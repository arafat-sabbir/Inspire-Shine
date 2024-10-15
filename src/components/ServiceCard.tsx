import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { TService } from "@/types/services";
import moment from "moment";

const ServiceCard = ({ item }: { item: TService }) => {
  const { _id, name, description, price, duration, isDeleted,category } = item;

  return (
    <div className="max-w-[380px] w-full p-6 bg-white shadow-lg rounded-lg transition-transform duration-300 transform hover:-translate-y-3 hover:shadow-2xl border border-gray-100">
      <div className="space-y-4">
        {isDeleted && (
          <div className="w-full bg-red-500 text-white text-center py-2 rounded-lg font-semibold">
            Unavailable
          </div>
        )}
       <div className="flex justify-between gap-4">
       <h3 className="text-gray-500 text-sm capitalize tracking-wide">
        Duration: {moment.duration(duration, "minutes").hours() > 0 &&
              `${moment.duration(duration, "minutes").hours()}h `}
            {moment.duration(duration, "minutes").minutes() > 0 &&
              `${moment
                .duration(duration, "minutes")
                .minutes()} minutes`}
        </h3>
        {category&&<p className="capitalize bg-primary px-2 rounded-full text-white  py-1 ">
          {category}
        </p>}
       </div>
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>
        <div className="flex justify-between items-center pt-4">
          <p className="text-primary font-bold text-xl">${price}</p>
          <Link to={`/service/${_id}`} state={item}>
            <Button className="bg-primary text-white py-2 px-6 rounded-full  transition-colors duration-300">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

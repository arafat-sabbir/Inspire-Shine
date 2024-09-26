import { TProduct } from "@/types/user/product";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import generateImage from "@/utils/generateImage";

const ProductCard = ({ item }: { item: TProduct }) => {
  const { title, price, vendor, thumbnail } = item;

  return (
    <div className="max-w-[350px] w-full p-2 space-y-2 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform duration-300">
      <img
        src={generateImage(thumbnail)}
        alt={title}
        className="w-full h-[200px] object-cover rounded-t-lg"
      />
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-gray-700 text-sm capitalize tracking-wide">
          {vendor}
        </h3>
        <div className="flex justify-between items-center pb-2">
          <h1 className="font-bold text-lg text-gray-900 truncate w-10/12">
            {title}
          </h1>
          <p className="text-primary font-semibold text-lg">${price}</p>
        </div>
        <Link to={`/product/${item._id}`} state={item} className="w-full mt-4">
          <Button className="w-full bg-primary text-white  transition-colors duration-300">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

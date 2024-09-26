/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import useMutateData from "@/hooks/MutateData";
import { formatCurrency } from "@/utils/FormatCurrency";
import generateImage from "@/utils/generateImage";
import { Loader, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const CartItem = ({ item }: { item: any }) => {
  const { product, quantity: productQuantity } = item;
  const [quantity, setQuantity] = useState(productQuantity || 1);
  const { title, price, vendor, thumbnail } = product;
  const { mutate, isPending } = useMutateData(
    "delete",
    `/cart/delete-cart-product/${item._id}`,
    {},
    ["cart"]
  );
  const { mutate: updateQuantity, isPending: isQuantityPending } =
    useMutateData(
      "patch",
      `/cart/update-cart-product/${item._id}`,
      { quantity },
      ["cart"]
    );
  const handleDelete = () => {
    toast("Are You Sure", {
      action: {
        label: "Yes",
        onClick: () => mutate(),
      },
    });
  };
  return (
    <div className="flex items-center space-x-4 p-4 border-b ">
      {/* Product Image */}
      <Link to={`/product/${product._id}`} className="w-24">
        <img
          src={generateImage(thumbnail)}
          alt={title}
          className="rounded-lg w-full h-auto object-cover"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 space-y-1">
        <h3 className="font-medium text-lg">
          <Link to={`/product/${product._id}`}>{title}</Link>
        </h3>
        <p className="text-gray-500 text-sm">Sold by: {vendor}</p>
        <div className="flex  items-center space-x-2">
          {/* Quantity Handler button */}
          <div className="flex items-center gap-2 justify-center">
            {/* Decrease Quantity If Quantity is more than 1 */}
            <Button
              variant={"outline"}
              className="bg-white"
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              <Minus />
            </Button>
            <h1 className="w-[30px] mx-auto text-center">{quantity}</h1>
            <Button
              className="bg-white"
              variant={"outline"}
              onClick={() => {
                if (product?.stockCount > 0) setQuantity(quantity + 1);
              }}
            >
              <Plus />
            </Button>
            {productQuantity !== quantity && (
              <Button
                disabled={isQuantityPending}
                onClick={() => updateQuantity()}
              >
                Save
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Price Details */}
      <div className="text-right">
        <p className="text-lg font-semibold">{formatCurrency(price)}</p>
        <Button
          className="mt-2"
          disabled={isPending}
          variant="link"
          onClick={handleDelete}
        >
          {isPending ? (
            <>
              Removing
              <Loader className="animate-spin ml-2" />
            </>
          ) : (
            <>Remove</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CartItem;

import Container from "@/layout/Container/Container";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import useMutateData from "@/hooks/MutateData";
import { TService } from "@/types/services";

const ServiceDetail = () => {
  // Scroll to top of the page when component loads
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { id } = useParams();
  const { state: data } = useLocation();
  const service: TService = data;

  // Quantity State
  const [quantity, setQuantity] = useState(1);

  // Add to cart mutation handler
  const { mutate, isPending } = useMutateData(
    "post",
    "/cart/add-to-cart",
    {
      product: service?._id,
      quantity,
    },
    ["cart", "service"]
  );

  return (
    <Container className="py-10">
      <div className="flex justify-center gap-10 lg:flex-row flex-col">
        {/* Service Details */}
        <div className="flex-1 space-y-6 p-6 bg-white dark:bg-[#1B1B1B] rounded-lg shadow-md transition-all duration-300">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            {service?.name}
          </h1>

          <p className="text-xl font-bold text-gray-900 dark:text-gray-300">
            ৳{service?.price}
          </p>

          <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
            {service?.description}
          </p>

          <p className="text-lg font-medium text-gray-800 dark:text-gray-300">
            Duration: {service?.duration} hours
          </p>

          <p className="text-md font-medium text-gray-800 dark:text-gray-300">
            Vendor: {service?.vendor}
          </p>

          <div className="flex items-center justify-center gap-6">
            {/* Quantity Handler */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
              >
                -
              </Button>
              <h1 className="w-[30px] mx-auto text-center text-lg font-semibold">
                {quantity}
              </h1>
              <Button
                variant="outline"
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                +
              </Button>
            </div>

            {/* Add to Cart Button */}
            <Button
              disabled={isPending || service?.isDeleted}
              className="w-full bg-primary text-white hover:bg-primary-dark transition-colors duration-300"
              onClick={() => {
                if (service?.isDeleted) {
                  toast.error("Service unavailable");
                  return;
                } else {
                  mutate();
                }
              }}
            >
              {isPending ? (
                <>
                  Adding
                  <Loader className="animate-spin ml-2" size={20} />
                </>
              ) : (
                "Add To Cart"
              )}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ServiceDetail;

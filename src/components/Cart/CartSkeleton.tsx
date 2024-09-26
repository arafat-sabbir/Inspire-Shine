import Container from "@/layout/Container/Container";

const CartSkeleton = () => {
  return (
    <Container className="py-10 min-h-[75vh]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Skeleton for Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 border-b animate-pulse">
              {/* Product Image Skeleton */}
              <div className="w-24 h-24 bg-gray-400 rounded-lg"></div>

              {/* Product Details Skeleton */}
              <div className="flex-1 space-y-2">
                <div className="w-2/3 h-4 bg-gray-400 rounded"></div>
                <div className="w-1/3 h-4 bg-gray-400 rounded"></div>
                <div className="w-16 h-6 bg-gray-400 rounded"></div>
              </div>

              {/* Price Skeleton */}
              <div className="w-16 h-6 bg-gray-400 rounded"></div>
            </div>
          ))}
        </div>

        {/* Skeleton for Cart Summary */}
        <div className="p-6 border rounded-lg shadow-md bg-gray-50 animate-pulse max-h-[250px]">
          <div className="w-1/2 h-6 bg-gray-400 rounded mb-4"></div>

          {/* Summary Items */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="w-1/3 h-4 bg-gray-400 rounded"></div>
              <div className="w-1/4 h-4 bg-gray-400 rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="w-1/3 h-4 bg-gray-400 rounded"></div>
              <div className="w-1/4 h-4 bg-gray-400 rounded"></div>
            </div>
            <div className="flex justify-between font-semibold">
              <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
              <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Checkout Button Skeleton */}
          <div className="w-full h-10 bg-gray-400 rounded mt-6"></div>
        </div>
      </div>
    </Container>
  );
};

export default CartSkeleton;

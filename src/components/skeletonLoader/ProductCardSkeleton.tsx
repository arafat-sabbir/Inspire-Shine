const ProductCardSkeleton = () => {
  return (
    <div className="lg:max-w-[300px] max-w-[332px] space-y-2 overflow-hidden animate-pulse">
      <div className="bg-gray-300 h-[372px] lg:w-[300px] w-[332px]"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="flex justify-between pb-2">
        <div className="h-4 bg-gray-300 rounded w-9/12"></div>
        <div className="h-4 bg-gray-300 rounded w-1/6"></div>
      </div>
      <div className="w-full h-10 bg-gray-300 rounded"></div>
    </div>
  );
};

export default ProductCardSkeleton;

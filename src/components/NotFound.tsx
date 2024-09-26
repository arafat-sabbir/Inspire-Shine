const NotFound = ({ title }: { title: string }) => {
  return (
    <div className="text-center text-gray-700 flex-col flex justify-center items-center h-[40vh]">
      <img src="/assets/not-found.png" alt="" />
      <h1 className="flex gap-2">
        {title}
      </h1>
    </div>
  );
};

export default NotFound;

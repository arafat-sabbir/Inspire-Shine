const TrainingCard = ({ data }: { data: { title: string; image: string } }) => {
  const { title, image } = data;
  console.log(image);
  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className={`bg-[url('${image}')] bg-opacity-[10%] cursor-grab  bg-no-repeat bg-cover bg-center h-[260px] w-[480px] relative before:w-[480px] before:h-[260px] before:absolute before:top-0 before:left-0 dark:before:bg-black before:bg-white  before:opacity-20 after:w-[480px] after:h-[260px] after:absolute after:top-0 after:left-0 after:bg-primary  hover:after:opacity-60 after:rotate-45 after:translate-x-[50%] after:translate-y-[50%] hover:after:translate-x-0 hover:after:translate-y-0 hover:after:rotate-0 after:transition-all after:duration-700 after:opacity-0 `}
    >
      <h1 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  text-2xl text-white  z-50">
        {title}
      </h1>
    </div>
  );
};

export default TrainingCard;

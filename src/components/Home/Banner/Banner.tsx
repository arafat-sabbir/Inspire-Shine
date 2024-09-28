import { Button } from "@/components/ui/button";
import Container from "@/layout/Container/Container";

const Banner = () => {
  return (
    <div className="relative bg-gradient-to-b from-blue-500 to-blue-900">
      <Container>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between py-12 lg:py-24">
          {/* Text Section */}
          <div className="text-center lg:text-left max-w-lg">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              Premium Car Wash Service
            </h1>
            <p className="text-white text-lg lg:text-xl mb-6">
              Experience the ultimate care and attention to detail. We bring
              your car back to life with our expert wash service!
            </p>
            <Button className="bg-accent  text-gray-900 font-semibold py-5 px-8 rounded-full">
              Book a Wash Today
            </Button>
          </div>
          {/* Image Section */}
          <div className="w-full lg:w-1/2  mb-6 lg:mb-0">
            <img
              src="/images/background/banner.jpg"
              alt="Car Wash"
              className="rounded-lg shadow-lg w-full rounded-l-full rounded-r-2xl h-auto"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;

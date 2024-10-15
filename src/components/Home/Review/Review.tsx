import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import useAxiosPublic from "@/hooks/AxiosPublic";
import { TUser } from "@/types/user/user";
import Container from "@/layout/Container/Container";

// Initialize the Swiper modules

type TReview = {
  createdAt: string;
  rating: number;
  review: string;
  updatedAt: string;
  user: TUser;
  __v: number;
  _id: string;
};

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const axios = useAxiosPublic();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("/review/get-reviews");
        setReviews(res.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <Container className="review-section py-12 px-6 lg:px-24">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-10">
        Customer Reviews
      </h2>
      {reviews.length > 0 ? (
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={false} // Disable the navigation arrows
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          breakpoints={{
            // when window width is >= 640px (tablet)
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            // when window width is >= 1024px (desktop)
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {reviews.map((review: TReview) => (
            <SwiperSlide key={review._id} className="py-10">
              <div className="review-card p-6 bg-white rounded-lg shadow-lg py-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {review.user.name}
                </h3>
                <p className="text-gray-700 text-sm mb-4">"{review.review}"</p>
                <div className="text-yellow-500 mb-4">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <svg
                      key={i}
                      className="inline-block h-5 w-5 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.431 8.244 1.192-5.958 5.743 1.406 8.191L12 18.896l-7.36 3.857 1.406-8.191L.682 9.21l8.244-1.192z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-500 text-sm">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500">No reviews available.</p>
      )}
    </Container>
  );
};

export default Review;

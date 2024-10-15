import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import Container from "@/layout/Container/Container";
import { useAppSelector } from "@/redux/features/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import useAxiosSecure from "@/hooks/AxiosSecure";
import { toast } from "sonner";
import { Loader } from "lucide-react";

// Define TypeScript types
interface ReviewFormData {
  review: string;
}

// Validation schema using Zod
const reviewSchema = z.object({
  review: z
    .string()
    .min(5, { message: "Review must be at least 5 characters long." }),
});

const RateUs: React.FC = () => {
  const axios = useAxiosSecure();
  const navigate = useNavigate();
  const [rating, setRating] = React.useState<number>(0);

  const user = useAppSelector(selectCurrentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Import reset method from useForm
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data: ReviewFormData) => {
    setIsLoading(true);
    try {
      await axios.post("/review/create-review", {
        review: data.review,
        rating,
      });
      toast.success("Reviewed Successfully");
      window.location.reload();
      setRating(0); // Reset the rating
      reset(); // Reset the form
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="relative">
      {!user && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20">
          <div className="text-white text-lg p-4 flex flex-col">
            <p>Please log in to provide feedback.</p>
            <button
              onClick={handleLoginClick}
              className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </div>
      )}
      <Container>
        <div
          className={`flex flex-col lg:gap-16 gap-8 md:flex-row items-center justify-between py-12 px-4 ${
            user ? "" : "pointer-events-none opacity-50"
          }`}
        >
          <div className="md:w-1/2 p-6 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <h2 className="text-3xl font-bold mb-4 text-blue-700">
              We Value Your Feedback!
            </h2>
            <p className="text-gray-600 mb-6">
              Please take a moment to rate your experience and leave us your
              feedback. Your input helps us improve our services.
            </p>
            <img
              src="/images/feedback.png"
              alt="Feedback"
              className="w-full rounded-lg max-h-[450px] object-cover bg-bottom"
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:w-1/2 p-6 bg-white rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl mt-6 md:mt-0"
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Rate Us
            </h3>
            <div className="flex space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-8 w-8 cursor-pointer transition-transform transform hover:scale-110 ${
                    star <= rating ? "text-yellow-500" : "text-gray-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  onClick={() => setRating(star)}
                >
                  <path d="M12 .587l3.668 7.431 8.244 1.192-5.958 5.743 1.406 8.191L12 18.896l-7.36 3.857 1.406-8.191L.682 9.21l8.244-1.192z" />
                </svg>
              ))}
            </div>
            <textarea
              {...register("review")}
              placeholder="Write your feedback here..."
              className={`w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.review ? "border-red-500" : ""
              }`}
              rows={4}
            ></textarea>
            {errors.review && (
              <p className="text-red-500 text-sm mb-4">
                {errors.review.message}
              </p>
            )}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full flex justify-center gap-2 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105"
            >
              Submit Feedback {isLoading&&<Loader className="animate-spin mr-2"/>}
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default RateUs;

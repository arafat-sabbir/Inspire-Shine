import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Container from "@/layout/Container/Container";
import { useAppSelector } from '@/redux/features/hooks';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';

// Validation schema using Zod
const reviewSchema = z.object({
  feedback: z.string().min(5, { message: "Feedback must be at least 5 characters long." }),
  rating: z.number().min(1).max(5, { message: "Rating must be between 1 and 5." }),
});

// Rating component
const Rating = ({ rating, setRating }:{rating:number,setRating:React.Dispatch<React.SetStateAction<number>>}) => {
  return (
    <div className="flex space-x-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-8 w-8 cursor-pointer transition-transform transform hover:scale-110 ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
          onClick={() => setRating(star)}
        >
          <path d="M12 .587l3.668 7.431 8.244 1.192-5.958 5.743 1.406 8.191L12 18.896l-7.36 3.857 1.406-8.191L.682 9.21l8.244-1.192z" />
        </svg>
      ))}
    </div>
  );
};

const RateUs = () => {
  const navigate = useNavigate(); // Initialize navigate for routing
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit = () => {
  };

  const [rating, setRating] = React.useState(0);
  const user = useAppSelector(selectCurrentUser); // Replace with your actual authentication check

  const handleLoginClick = () => {
    navigate('/login'); // Change to your login route
  };

  return (

      <div className="relative"> {/* Make the parent container relative */}
        {/* Black overlay for users not logged in */}
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
       <div className={`flex flex-col lg:gap-16 gap-8 md:flex-row items-center justify-between py-12 px-4 ${user ? '' : 'pointer-events-none opacity-50'}`}>
          <div className="md:w-1/2 p-6 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <h2 className="text-3xl font-bold mb-4 text-blue-700">We Value Your Feedback!</h2>
            <p className="text-gray-600 mb-6">
              Please take a moment to rate your experience and leave us your feedback. Your input helps us improve our services.
            </p>
            <img src="/images/feedback.png" alt="Feedback" className="w-full rounded-lg max-h-[450px] object-cover bg-bottom" />
          </div>
            <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2 p-6 bg-white rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl mt-6 md:mt-0">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Rate Us</h3>
              <Rating rating={rating} setRating={setRating} />
              <textarea
                {...register("feedback")}
                placeholder="Write your feedback here..."
                className={`w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.feedback ? 'border-red-500' : ''}`}
                rows={4}
              ></textarea>
              {errors.feedback && <p className="text-red-500 text-sm mb-4">{errors?.feedback?.message as any}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105"
              >
                Submit Feedback
              </button>
            </form>
        </div>
       </Container>
      </div>
  );
};

export default RateUs;

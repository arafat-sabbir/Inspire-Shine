import Container from '@/layout/Container/Container';
import React from 'react';

const featuresData = [
  {
    title: "Basic Wash",
    description: "A quick wash to keep your car looking clean.",
    imageUrl: "/images/services/basic-wash.jpg", // Replace with your image path
  },
  {
    title: "Interior Detailing",
    description: "Thorough cleaning of your car's interior for a fresh feel.",
    imageUrl: "/images/services/interior.jpg", // Replace with your image path
  },
  {
    title: "Exterior Shine",
    description: "Waxing and polishing for that showroom shine.",
    imageUrl: "/images/services/exterior.png", // Replace with your image path
  },
  {
    title: "Engine Cleaning",
    description: "Professional cleaning to keep your engine running smoothly.",
    imageUrl: "/images/services/engine.png", // Replace with your image path
  },
  {
    title: "Headlight Restoration",
    description: "Clear up foggy headlights for improved visibility.",
    imageUrl: "/images/services/headlight.jpg", // Replace with your image path
  },
  {
    title: "Full Service",
    description: "Complete wash and detailing for a comprehensive clean.",
    imageUrl: "/images/services/full-service.png", // Replace with your image path
  },
];

const Features = () => {
  return (
    <div className="py-12 bg-gray-100">
      <Container className="mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center justify-center items-center">
          {featuresData.map((feature, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg lg:w-[350px] overflow-hidden">
              <img src={feature.imageUrl} alt={feature.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Features;

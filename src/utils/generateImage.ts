// utils/generateImageUrl.ts

// Function to generate full image URL
const generateImage = (filePath: string): string => {
  // Access the backend URL from environment variables
  const backendUrl = "https://inspire-shine-server.vercel.app/api";

  // Construct the full URL
  const imageUrl = `${backendUrl}/${filePath}`;
  return imageUrl;
};

export default generateImage;

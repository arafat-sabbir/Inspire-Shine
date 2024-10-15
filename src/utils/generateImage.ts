// utils/generateImageUrl.ts

// Function to generate full image URL
const generateImage = (filePath: string): string => {
  // Access the backend URL from environment variables
  const backendUrl = "http://localhost:5000/api";

  // Construct the full URL
  const imageUrl = `${backendUrl}/${filePath}`;
  return imageUrl;
};

export default generateImage;

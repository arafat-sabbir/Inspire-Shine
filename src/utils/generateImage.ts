// utils/generateImageUrl.ts

// Function to generate full image URL
const generateImage = (filePath: string): string => {
    // Access the backend URL from environment variables
    const backendUrl = import.meta.env.VITE_SERVER_URL;
  
    // Construct the full URL
    const imageUrl = `${backendUrl}/${filePath}`;
    return imageUrl;
  };
  
  export default generateImage;
  
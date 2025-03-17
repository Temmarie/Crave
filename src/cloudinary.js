export const uploadImageToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // Cloudinary preset
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.secure_url; // Get the uploaded image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      return "https://via.placeholder.com/150"; // Default image in case of failure
    }
  };
  
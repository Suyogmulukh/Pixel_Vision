import { motion } from "framer-motion";
import { useState } from "react";
import ImageSlider3 from "../components/cards/ImageSlider3";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [sliderValue, setSliderValue] = useState(50);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
    setErrorMessage(""); // Clear previous errors on new file selection
  };

  const handleSliderChange = (event) => {
    setSliderValue(Number(event.target.value));
  };

  const handleUploads = async (event) => {
    event.preventDefault();
    if (!image) {
      setErrorMessage("Please select an image.");
      return;
    }

    setIsUploading(true); // Start loading
    setErrorMessage(""); // Clear previous errors

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/upload`, formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (!response.data.image) {
        setErrorMessage("Failed to upload image.");
        setIsUploading(false);
        return;
      }

      navigate("/imageGallery", { state: { images: [response.data.image.path] } }); // Pass image URL
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false); // Stop loading
    }
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-black to-pink-900 text-white p-6">
      <div className="relative w-full md:w-1/2 max-w-lg">
        <div className="relative w-full h-[500px] overflow-hidden">
          <ImageSlider3 />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderChange}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3/4"
        />
        <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full">Before</div>
        <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full">After</div>
      </div>

      <div className="text-center md:text-left md:w-1/2 max-w-lg px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-4"
        >
          AI photo and video enhancer, in one click
        </motion.h2>
        <p className="text-gray-300 mb-6">
          Pixel Vision helps you improve, sharpen, and unblur your media files instantly.
        </p>
        <form onSubmit={handleUploads} className="border-2 border-dashed border-gray-400 p-6 rounded-lg">
          <label className="cursor-pointer bg-pink-500 text-white px-6 py-3 rounded-full inline-flex items-center hover:bg-pink-600">
            Choose Image
            <input name="uploadImage" type="file" className="hidden" onChange={handleFileChange} />
          </label>
          <p className="text-gray-400 mt-2">or drop it here</p>

          <div className="mt-4 flex justify-center gap-4">
            <button
              type="submit"
              className="bg-gray-700 px-4 py-2 rounded"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </form>
        <p className="text-xs text-gray-400 mt-4">
          By continuing, you accept our{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          and
          <a href="#" className="underline">
            {" "}
            Privacy Policy
          </a>
        </p>
      </div>
    </section>
  );
};

export default UploadImage;

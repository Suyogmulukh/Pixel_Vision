import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'remixicon/fonts/remixicon.css';

import ImageSlider3 from "../components/cards/ImageSlider3"; 
import ImageDropzone from "../components/cards/ImageDropzone";
import EnhancementSettings from "../components/cards/ImageEnhancementSettings";

import { uploadImage, checkAPIHealth } from "../services/APIClientService";
import useApiError from "../hooks/useApiError";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3500";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingSettings, setProcessingSettings] = useState({
    enhancementLevel: "medium", 
    removeNoise: true,
    increaseSharpness: true,
    improveColors: true
  });
  const [serverStatus, setServerStatus] = useState('checking');
  
  const navigate = useNavigate();
  const { error, isLoading, handleApiCall, clearError } = useApiError();

  // Check API health on component mount
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        await checkAPIHealth();
        setServerStatus('online');
      } catch (err) {
        setServerStatus('offline');
        toast.error("Server is offline. Some features may not work.");
      }
    };
    
    checkServerStatus();
  }, []);

  // Generate image preview
  const generatePreview = (file) => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (file) => {
    if (error) clearError();
    setImage(file);
    generatePreview(file);
  };

  const handleProcessingSettingChange = (setting, value) => {
    setProcessingSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    clearError();
  };

  const validateImage = (file) => {
    // Check if file exists
    if (!file) {
      return "No file selected";
    }
  
    // Check file type with more thorough validation
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return "File must be JPEG, PNG, or WebP format";
    }
    
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      return `File size must be less than ${maxSize / (1024 * 1024)}MB`;
    }
    
    // Check image dimensions
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        if (img.width < 50 || img.height < 50) {
          resolve("Image dimensions must be at least 50x50 pixels");
        }
        if (img.width > 8000 || img.height > 8000) {
          resolve("Image dimensions must not exceed 8000x8000 pixels");
        }
        resolve(null);
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        resolve("Invalid image file");
      };
    });
  };

  const handleUploads = async (event) => {
    event.preventDefault();
    
    if (!image) {
      toast.error("Please select an image");
      return;
    }
    
    try {
      setUploadProgress(0);
      
      // Validate image before uploading
      const validationError = await validateImage(image);
      if (validationError) {
        toast.error(validationError);
        return;
      }
      
      if (serverStatus === 'offline') {
        throw new Error("Server is offline. Please try again later.");
      }
      
      // Proceed with upload
      const result = await handleApiCall(
        () => uploadImage(image, processingSettings, (progress) => {
          setUploadProgress(progress);
        }),
        {
          successMessage: "Image enhanced successfully!",
          errorMessage: "Failed to enhance image. Please try again."
        }
      );

      if (!result || !result.success) {
        throw new Error(result?.error || "Failed to upload image");
      }
      
      // Navigate with the correct image URLs
      navigate("/imageGallery", { 
        state: { 
          images: [result.originalUrl || URL.createObjectURL(image)],
          enhancedImage: result.imageUrl,
          processingSettings: processingSettings,
          originalFileName: image.name,
          metadata: result.metadata || {}
        } 
      });
    } catch (error) {
      toast.error(error.message || "Failed to enhance image");
      setUploadProgress(0);
    }
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen gap-8 lg:gap-16 xl:gap-[200px] bg-gradient-to-r from-black to-pink-900 text-white p-4">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      
      <div className="h-16 text-4xl absolute top-0 left-0 ml-7 mt-4 text-slate-100 font-[anzo1] tracking-widest"> 
        PIXEL <span className="ml-1 text-xl font-[anzo] text-gray-400 italic tracking-wider">VISION</span> 
        {serverStatus === 'offline' && (
          <span className="text-xs text-red-500 ml-2">(Server Offline)</span>
        )}
      </div>
      
      <div className="relative w-full md:w-1/2 max-w-lg">
        <div className="relative w-fit h-[50vh] md:h-[70vh] overflow-hidden">
          <ImageSlider3 />
        </div>
      </div>
      
      <div className="text-center md:text-left md:w-1/2 max-w-lg px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-normal mb-4 leading-tight"
        >
          AI photo enhancer in one <span className="text-cyan-500 font-medium">click</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-300 mb-6"
        >
          Pixel Vision helps you improve, sharpen, and unblur your media files instantly.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <form onSubmit={handleUploads} className="flex flex-col items-center">
            {/* Use the reusable ImageDropzone component */}
            <ImageDropzone 
              onFileChange={handleFileChange}
              preview={preview}
              onClearImage={clearImage}
            />
            
            <div className="w-full max-w-[400px] mt-4">
              {/* Use the reusable EnhancementSettings component */}
              <EnhancementSettings 
                processingSettings={processingSettings}
                onSettingsChange={handleProcessingSettingChange}
              />
              
              {isLoading && (
                <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
                  <div 
                    className="bg-cyan-500 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
              
              <button
                type="submit"
                className={`w-full bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isLoading || serverStatus === 'offline'}
              >
                {isLoading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Enhancing Image...
                  </>
                ) : (
                  <>
                    Enhance Image
                    <i className="ri-magic-line ml-2"></i>
                  </>
                )}
              </button>
              
              {error && (
                <p className="text-red-500 mt-2 text-sm">{error}</p>
              )}
            </div>

            <p className="text-xs text-gray-400 mt-4 max-w-[400px]">
              By continuing, you accept our{" "}
              <a href="#" className="underline hover:text-gray-300 transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-gray-300 transition-colors">
                Privacy Policy
              </a>
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImage;

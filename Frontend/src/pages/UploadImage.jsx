import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'remixicon/fonts/remixicon.css';

import ImageSlider3 from "../components/cards/ImageSlider3";
const UploadImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEnhance = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate processing time
      setTimeout(() => {
        navigate("/imageGallery", { 
          state: { 
            images: [],
            enhancedImage: null,
            processingSettings: {},
            originalFileName: '',
            metadata: {}
          } 
        });
      }, 2000);
      
    } catch (error) {
      toast.error("Failed to navigate");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen gap-8 lg:gap-16 xl:gap-[200px] bg-gradient-to-r from-black to-pink-900 text-white p-4">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      
      <div className="h-16 text-4xl absolute top-0 left-0 ml-7 mt-4 text-slate-100 font-[anzo1] tracking-widest"> 
        PIXEL <span className="ml-1 text-xl font-[anzo] text-gray-400 italic tracking-wider">VISION</span> 
      </div>
      
      <div className="relative w-full md:w-1/2 max-w-lg">
        <div className="relative w-fit h-[50vh] md:h-[70vh] overflow-hidden">
          <ImageSlider3 />
        </div>
      </div>
      
      <div className="text-center md:text-left md:w-1/2 max-w-lg px-6">
        <h2 className="text-4xl md:text-5xl font-normal mb-4 leading-tight">
          AI photo enhancer in one <span className="text-cyan-500 font-medium">click</span>
        </h2>
        
        <p className="text-gray-300 mb-6">
          Pixel Vision helps you improve, sharpen, and unblur your media files instantly.
        </p>
        
        <form onSubmit={handleEnhance} className="flex flex-col items-center">
          <div className="w-full max-w-[400px]">
            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoading}
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
      </div>
    </section>
  );
};

export default UploadImage;
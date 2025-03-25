import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'remixicon/fonts/remixicon.css';
import apiClient from '../utils/apiClient';

// Import components
import Toolbar from '../components/EnhancesHelp/Toolbar';
import ImageSlider4 from '../components/cards/ImageSlider4';
import ActionButtons from '../components/EnhancesHelp/ActionButtons';

const ImageGallery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { images, enhancedImage, processingSettings, originalFileName } = location.state || {};
  
  // Update state initialization to handle URLs correctly
  const [originalImage, setOriginalImage] = useState(images ? images[0] : null);
  const [enhancedImageState, setEnhancedImageState] = useState(enhancedImage || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Add URL validation
  const validateImageUrl = (url) => {
    if (!url) return null;
    // If URL is already absolute, return as is
    if (url.startsWith('http')) return url;
    // If URL is blob or data URL, return as is
    if (url.startsWith('blob:') || url.startsWith('data:')) return url;
    // Otherwise, prepend API base URL
    return `${import.meta.env.VITE_API_URL || 'http://localhost:3500'}${url}`;
  };

  // UI state
  const [viewMode, setViewMode] = useState('before-after'); // before-after, before, after, slider
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Image metadata
  const [imageDetails, setImageDetails] = useState({
    originalSize: '1.2 MB',
    enhancedSize: '1.8 MB',
    improvementMetrics: {
      sharpness: '+32%',
      noise: '-48%',
      colorVibrance: '+27%',
      resolution: 'Same'
    },
    processingTime: '4.2 seconds',
    appliedSettings: processingSettings || {
      enhancementLevel: 'medium',
      removeNoise: true,
      increaseSharpness: true,
      improveColors: true,
      removeBlur: true
    }
  });

  // Fetch image data if not provided in location state
  useEffect(() => {
    if (originalImage) {
      setOriginalImage(validateImageUrl(originalImage));
    }
    if (enhancedImage) {
      setEnhancedImageState(validateImageUrl(enhancedImage));
    }
  }, [originalImage, enhancedImage]);

  const fetchLatestImage = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get("/api/images");
      const fetchedImages = response.data;
      
      if (fetchedImages && fetchedImages.length > 0) {
        const latest = fetchedImages[fetchedImages.length - 1];
        setOriginalImage(validateImageUrl(latest.path));
        
        if (latest.enhancedPath) {
          setEnhancedImageState(validateImageUrl(latest.enhancedPath));
        }
      } else {
        setError("No images found in your gallery");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setError(error.response?.data?.message || "Failed to fetch images. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (type) => {
    try {
      const imageUrl = type === 'original' ? originalImage : enhancedImageState;
      const fileName = originalFileName || `${type}-image-${new Date().getTime()}.jpg`;
      
      // Simulate download
      toast.success(`${type === 'original' ? 'Original' : 'Enhanced'} image downloaded successfully`);
    } catch (error) {
      toast.error(`Failed to download ${type} image`);
    }
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleApplyEnhancement = () => {
    toast.info('Applying enhancement...');
    // Implement re-enhancement logic here
  };

  // Error handling
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white p-4">
        <div className="text-center">
          <i className="ri-error-warning-line text-6xl text-red-500 mb-4"></i>
          <p className="text-xl">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-4 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-xl">Loading your images...</p>
        </div>
      </div>
    );
  }

  // No image state
  if (!originalImage) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
        <i className="ri-image-line text-6xl text-gray-500 mb-4"></i>
        <h2 className="text-2xl font-semibold mb-4">No images available</h2>
        <p className="text-gray-400 mb-6 text-center max-w-md">
          You haven't uploaded any images yet. Start by enhancing your first image.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-300"
        >
          Upload an Image
          <i className="ri-upload-2-line ml-2"></i>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Helmet>
        <title>Image Enhancement - Pixel Vision</title>
        <meta name="description" content="Compare original and enhanced images" />
      </Helmet>
      
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      
      <div className="flex ml-16 ">
        {/* Left Sidebar - Toolbar */}
        <div className="w-80 h-[550px] mt-20 bg-gray-900 px-8 flex flex-col leading-6 rounded-2xl">
          <div className="mb-2">
          <div className=" text-xl mt-2 text-slate-100 font-[anzo2] tracking-widest "> 
          AI <span className=" text-sm font-[anzo] text-gray-400 italic tracking-wider ">TOOLBAR</span> </div>
            <div className="">
              <Toolbar
                onApplyEnhancement={handleApplyEnhancement}
              />
            </div>
          </div>
        </div>

        {/* Main Content - Image Comparison */}
        <div className="flex-1 flex flex-col">
          {/* Header with view mode controls */}
          <div className="flex justify-between p-4 ">
          <div className="h-16 text-4xl absolute top-0 left-0 ml-7 mt-4 text-slate-100 font-[anzo1] tracking-widest"> 
          PIXEL <span className=" text-xl font-[anzo] text-gray-400 italic tracking-wider">VISION</span> </div>

            {/* <div className="flex gap-2">
              <button 
                className={`px-4 py-2 rounded ${viewMode === 'before' ? 'bg-white text-black' : 'bg-transparent text-white'}`}
                onClick={() => setViewMode('before')}
              >
                Before
              </button>
              <button 
                className={`px-4 py-2 rounded ${viewMode === 'after' ? 'bg-white text-black' : 'bg-transparent text-white'}`}
                onClick={() => setViewMode('after')}
              >
                After
              </button>
            </div> */}
            
          </div>

          {/* Image Comparison Area */}
          <div className="flex-1 flex">
            <div className="flex-1 relative top-10">
              <ImageSlider4
                originalImage={originalImage}
                enhancedImage={enhancedImageState}
                viewMode={viewMode}
                sliderPosition={sliderPosition}
                setSliderPosition={setSliderPosition}
                isFullscreen={isFullscreen}
                onToggleFullscreen={handleToggleFullscreen}
              />
            </div>

              <div className="">
                <ActionButtons
                  onDownloadEnhanced={() => handleDownload('enhanced')}
                  onApplyEnhancement={handleApplyEnhancement}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ImageGallery;
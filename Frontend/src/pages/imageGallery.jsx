import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageDropzone from "../components/cards/ImageDropzone";
import ImagePreview from "../components/cards/ImagePreview";
import { enhancedImageAPI } from "../utils/imageEnhancesApi";
import Logo from "../assets/logo.svg";

const imageGallery = () => {
    const [uploadImage, setUploadImage] = useState(null);
    const [enhancedImage, setEnhancedImage] = useState(null);
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = async (file) => {
        const previewUrl = URL.createObjectURL(file);
        setUploadImage(previewUrl);
        setloading(true);
        
        try {
            const enhancedURL = await enhancedImageAPI(file);
            setEnhancedImage(enhancedURL);
        } catch (error) {
            console.error(error);
            alert("Error while enhancing the image. Please try again later.");
        } finally {
            setloading(false);
        }
    };

    const handleClearImage = () => {
        setUploadImage(null);
        setEnhancedImage(null);
        setloading(false);
    };

    const handleDownload = () => {
        if (enhancedImage?.image) {
            const link = document.createElement('a');
            link.href = enhancedImage.image;
            link.download = 'enhanced-image.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-black to-pink-900 text-white py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col items-center justify-center gap-8">
                    <img src={Logo} alt="Pixel Vision Logo" className="w-48 absolute left-0 ml-9 top-0 mt-5" />
                    <div className="w-full max-w-4xl bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 mt-10">
                        <ImageDropzone 
                            onFileChange={handleFileChange}
                            preview={uploadImage}
                            onClearImage={handleClearImage}
                        />
                        {uploadImage && (
                            <div className="w-full space-y-8 mt-8">
                                <ImagePreview
                                    loading={loading}
                                    uploaded={uploadImage}
                                    enhanced={enhancedImage?.image}
                                />
                                <div className="flex justify-center gap-4">
                                    {enhancedImage?.image && (
                                        <button
                                            onClick={handleDownload}
                                            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-[anzo]"
                                        >
                                            Download Enhanced Image
                                        </button>
                                    )}
                                    <button
                                        onClick={() => navigate('/home')}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-[anzo]"
                                    >
                                        Create a New Image
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default imageGallery;
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export default function ActionButtons({ url, fileName }) {
  const handleDownload = async () => {
    try {
      if (!url) {
        throw new Error('No image URL provided');
      }
      
      let imageUrl = url;
      
      // Handle relative URLs
      if (!url.startsWith('http') && !url.startsWith('blob:') && !url.startsWith('data:')) {
        imageUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:3500'}${url}`;
      }

      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to download image (${response.status})`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = downloadUrl;
      link.download = fileName || `enhanced-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(link);
      
      toast.success('Image downloaded successfully');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error(`Download failed: ${error.message}`);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleDownload}
        disabled={!url}
        className={`w-52 text-xl font-[anzo3] py-2 px-4 rounded-3xl flex items-center -mt-4 mr-4 justify-center transition-colors
          ${url ? 'bg-red-400 hover:bg-red-500' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        <i className="ri-download-line mr-2"></i>
        Download
      </button>
    </div>
  );
}

ActionButtons.propTypes = {
  url: PropTypes.string,
  fileName: PropTypes.string
};
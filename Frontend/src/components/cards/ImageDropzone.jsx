// src/components/ImageDropzone.jsx
import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ImageDropzone = ({ onFileChange, preview, onClearImage }) => {
  const dropAreaRef = useRef(null);
  const fileInputRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const dropArea = dropAreaRef.current;
    
    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    
    const highlight = () => dropArea.classList.add("bg-pink-900", "bg-opacity-20");
    const unhighlight = () => dropArea.classList.remove("bg-pink-900", "bg-opacity-20");
    
    const handleDrop = (e) => {
      preventDefaults(e);
      unhighlight();
      
      const dt = e.dataTransfer;
      const files = dt.files;
      
      if (files && files.length) {
        handleFiles(files[0]);
      }
    };
    
    const handleFiles = (file) => {
      if (file && file.type.match('image.*')) {
        onFileChange(file);
        setError('');
      } else {
        setError('Please select a valid image file');
      }
    };
    
    // Add event listeners
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
      dropArea.addEventListener(event, preventDefaults, false);
    });
    
    ['dragenter', 'dragover'].forEach(event => {
      dropArea.addEventListener(event, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(event => {
      dropArea.addEventListener(event, unhighlight, false);
    });
    
    dropArea.addEventListener('drop', handleDrop, false);
    
    // Cleanup
    return () => {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
        dropArea.removeEventListener(event, preventDefaults);
      });
      
      ['dragenter', 'dragover'].forEach(event => {
        dropArea.removeEventListener(event, highlight);
      });
      
      ['dragleave', 'drop'].forEach(event => {
        dropArea.removeEventListener(event, unhighlight);
      });
      
      dropArea.removeEventListener('drop', handleDrop);
    };
  }, [onFileChange]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileChange(file);
      setError('');
    }
  };

  return (
    <div 
      ref={dropAreaRef}
      className="border-2 border-dashed border-gray-400 p-6 rounded-3xl w-full max-w-[400px] min-h-[200px] flex flex-col items-center justify-center transition-all duration-300 hover:border-pink-400"
    >
      {preview ? (
        <div className="relative w-full">
          <img 
            src={preview} 
            alt="Preview" 
            className="max-h-[150px] max-w-full mx-auto rounded-lg object-contain" 
          />
          <button 
            type="button"
            onClick={onClearImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>
      ) : (
        <>
          <i className="ri-image-add-line text-5xl text-gray-400 mb-4"></i>
          <label className="cursor-pointer bg-pink-500 text-white px-6 py-2.5 rounded-full inline-flex items-center hover:bg-pink-600 transition-colors">
            Choose Image
            <input 
              ref={fileInputRef}
              name="uploadImage" 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange} 
            />
          </label>
          <p className="text-gray-400 mt-3">or drop it here</p>
        </>
      )}
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

ImageDropzone.propTypes = {
  onFileChange: PropTypes.func.isRequired,
  preview: PropTypes.string,
  onClearImage: PropTypes.func.isRequired
};

export default ImageDropzone;
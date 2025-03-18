import React from 'react';
import { useLocation } from 'react-router-dom';

const ImageGallery = () => {
  const location = useLocation();
  const images = location.state?.images || [];

  return (
    <div className="gallery-container">
      {images.length > 0 ? (
        images.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image} alt={`Uploaded ${index}`} />
          </div>
        ))
      ) : (
        <p>No images to display</p>
      )}
    </div>
  );
};

export default ImageGallery;

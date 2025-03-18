import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EnhancesImage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/images`)
      .then(res => {
        setImages(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch images', err);
      });
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {images.map((image, index) => (
        <div key={index} className="m-4">
          <img src={`${import.meta.env.VITE_BASE_URL}/${image.enhancedImage}`} alt="Enhanced" className="w-64 h-64 object-cover" />
        </div>
      ))}
    </div>
  );
}

export default EnhancesImage;

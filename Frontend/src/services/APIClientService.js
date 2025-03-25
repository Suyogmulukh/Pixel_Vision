import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3500';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const uploadImage = async (imageFile, processingSettings, progressCallback) => {
  try {
    // Validate image file
    if (!imageFile) {
      throw new Error('No image file provided');
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(imageFile.type)) {
      throw new Error('Invalid image format. Please use JPG, PNG or WebP');
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (imageFile.size > maxSize) {
      throw new Error('Image size must be less than 10MB');
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    
    // Add validation for processing settings
    if (!processingSettings || typeof processingSettings !== 'object') {
      throw new Error('Invalid processing settings');
    }

    // Map the enhancement level to filter type
    let filterType = 'medium'; // Default
    switch (processingSettings.enhancementLevel) {
      case 'low':
        filterType = 'light';
        break;
      case 'medium':
        filterType = 'medium';
        break;
      case 'high':
        filterType = 'strong';
        break;
      default:
        filterType = 'medium';
    }

    // Determine primary filter based on processing settings
    let filter = 'sharpener'; // Default filter
    
    if (processingSettings.removeBlur) {
      filter = 'background-blur';
    } else if (processingSettings.increaseSharpness) {
      filter = 'sharpener';
    } else if (processingSettings.removeNoise) {
      filter = 'face-retouch';
    } else if (processingSettings.improveColors) {
      filter = 'face-enhancer';
    }
    
    // Add filter parameters to the request
    formData.append('filter', filter);
    formData.append('filterType', filterType);
    
    const response = await api.post('/image/enhance', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        // Calculate and report upload progress percentage
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if (progressCallback) {
          progressCallback(percentCompleted);
        }
      },
    });
    
    // Ensure both original and enhanced image URLs are properly formatted
    const result = {
      success: true,
      originalUrl: response.data.originalUrl ? `${API_BASE_URL}${response.data.originalUrl}` : null,
      imageUrl: response.data.imageUrl ? `${API_BASE_URL}${response.data.imageUrl}` : null,
      metadata: response.data.metadata || {}
    };

    if (!result.imageUrl) {
      throw new Error('Enhanced image URL not received from server');
    }

    return result;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    const errorMessage = error.response?.data?.error || 
                         error.response?.data?.details ||
                         error.message ||
                         'Failed to upload image';
                         
    throw new Error(errorMessage);
  }
};

export const getEnhancedImages = async () => {
  try {
    const response = await api.get('/image/enhance');
    return response.data;
  } catch (error) {
    console.error('Error in getEnhancedImages:', error);
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const getImageById = async (imageId) => {
  try {
    const response = await api.get(`/image/${imageId}`);
    return response.data;
  } catch (error) {
    console.error('Error in getImageById:', error);
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const deleteImage = async (imageId) => {
  try {
    const response = await api.delete(`/image/${imageId}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteImage:', error);
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const getAllImages = async (page = 1, limit = 10, sort = 'createdAt') => {
  try {
    const response = await api.get(`/image?page=${page}&limit=${limit}&sort=${sort}`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllImages:', error);
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const checkAPIHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Error in checkAPIHealth:', error);
    throw new Error('Failed to check API health');
  }
};

export default {
  uploadImage,
  getEnhancedImages,
  getImageById,
  deleteImage,
  getAllImages,
  checkAPIHealth
};
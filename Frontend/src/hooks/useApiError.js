import { useState } from 'react';
import { toast } from 'react-toastify';

const useApiError = (options = { showToast: true, logToConsole: true }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleApiCall = async (apiCall, config = {}) => {
    const { 
      successMessage, 
      errorMessage = 'An error occurred', 
      showSuccessToast = true,
      showErrorToast = options.showToast,
      resetErrorOnCall = true 
    } = config;
    
    if (resetErrorOnCall) {
      setError(null);
    }
    
    setIsLoading(true);
    
    try {
      const result = await apiCall();
      
      if (showSuccessToast && successMessage) {
        toast.success(successMessage);
      }
      
      setIsLoading(false);
      return result;
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || errorMessage;
      
      if (options.logToConsole) {
        console.error('API Error:', errorMsg, err);
      }
      
      setError(errorMsg);
      
      if (showErrorToast) {
        toast.error(errorMsg);
      }
      
      setIsLoading(false);
      throw err;
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    error,
    isLoading,
    handleApiCall,
    clearError,
    setError
  };
};

export default useApiError;
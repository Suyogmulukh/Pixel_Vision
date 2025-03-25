import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const EnhancedImage = () => {
  // Enhanced state management
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [enhancement, setEnhancement] = useState('background-blur');
  const [filterType, setFilterType] = useState('soft');
  const [processedImage, setProcessedImage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState([]);
  const [adjustments, setAdjustments] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    sharpness: 0
  });
  const [showComparisonView, setShowComparisonView] = useState(false);
  const fileInputRef = useRef(null);

  // Reset filter type when enhancement changes
  useEffect(() => {
    // Set default filter type based on selected enhancement
    switch (enhancement) {
      case 'background-blur':
        setFilterType('soft');
        break;
      case 'background-enhancer':
        setFilterType('bright');
        break;
      case 'face-retouch':
        setFilterType('smooth');
        break;
      case 'face-enhancer':
        setFilterType('detailed');
        break;
      case 'sharpener':
        setFilterType('medium');
        break;
      case 'color-correction':
        setFilterType('auto');
        break;
      case 'noise-reduction':
        setFilterType('standard');
        break;
      default:
        setFilterType('soft');
    }
  }, [enhancement]);

  // Event handlers
  const handleEnhancementChange = (event) => {
    setEnhancement(event.target.value);
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
      setUploadedImageUrl(URL.createObjectURL(file));
      setProcessedImage(""); // Clear previous processed image
    }
  };

  const handleAdjustmentChange = (property, value) => {
    setAdjustments({
      ...adjustments,
      [property]: value
    });
  };

  const handleApplyFilter = async () => {
    if (!uploadedImage) {
      alert("Please select an image!");
      return;
    }

    setIsProcessing(true);

    const formData = new FormData();
    formData.append("image", uploadedImage);
    formData.append("enhancement", enhancement);
    formData.append("filterType", filterType);
    
    // Add advanced adjustment parameters
    Object.keys(adjustments).forEach(key => {
      formData.append(key, adjustments[key]);
    });

    try {
      const response = await axios.post("http://localhost:3500/api/enhancements/enhance", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.imageUrl) {
        const imageUrl = `http://localhost:3500${response.data.imageUrl}`;
        setProcessedImage(imageUrl);
        
        // Add to history
        setHistory([...history, {
          id: Date.now(),
          enhancement,
          filterType,
          adjustments: { ...adjustments },
          imageUrl
        }]);
      } else {
        alert('Failed to apply filter. Try again!');
      }
    } catch (error) {
      console.error('Error applying filter', error);
      alert("Failed to apply filter. Try again!");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setUploadedImageUrl("");
    setProcessedImage("");
    setAdjustments({
      brightness: 0,
      contrast: 0,
      saturation: 0,
      sharpness: 0
    });
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = `enhanced_${enhancement}_${filterType}_${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const applyHistoryItem = (item) => {
    setEnhancement(item.enhancement);
    setFilterType(item.filterType);
    setAdjustments(item.adjustments);
    setProcessedImage(item.imageUrl);
  };

  // Filter type options based on enhancement type
  const getFilterOptions = () => {
    switch (enhancement) {
      case 'background-blur':
        return (
          <>
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="heavy">Heavy</option>
            <option value="soft">Soft</option>
            <option value="intense">Intense</option>
            <option value="gradient">Gradient</option>
          </>
        );
      case 'background-enhancer':
        return (
          <>
            <option value="bright">Bright</option>
            <option value="contrast">Contrast</option>
            <option value="warm">Warm</option>
            <option value="cool">Cool</option>
            <option value="vibrant">Vibrant</option>
            <option value="dramatic">Dramatic</option>
          </>
        );
      case 'face-retouch':
        return (
          <>
            <option value="smooth">Smooth</option>
            <option value="soft-glow">Soft Glow</option>
            <option value="sharp">Sharp</option>
            <option value="skin-tone">Skin Tone</option>
            <option value="soft-focus">Soft Focus</option>
            <option value="portrait">Portrait Pro</option>
          </>
        );
      case 'face-enhancer':
        return (
          <>
            <option value="high-sharpness">High Sharpness</option>
            <option value="detailed">Detailed</option>
            <option value="glow">Glow</option>
            <option value="definition">Definition</option>
            <option value="depth">Depth</option>
            <option value="cinematic">Cinematic</option>
          </>
        );
      case 'sharpener':
        return (
          <>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="adaptive">Adaptive</option>
          </>
        );
      case 'color-correction':
        return (
          <>
            <option value="auto">Auto</option>
            <option value="white-balance">White Balance</option>
            <option value="vivid">Vivid</option>
            <option value="natural">Natural</option>
            <option value="cinematic">Cinematic</option>
          </>
        );
      case 'noise-reduction':
        return (
          <>
            <option value="light">Light</option>
            <option value="standard">Standard</option>
            <option value="aggressive">Aggressive</option>
            <option value="ai-powered">AI Powered</option>
          </>
        );
      default:
        return <option value="default">Default</option>;
    }
  };

  return (
    <div style={{ 
      maxWidth: "1000px", 
      margin: "0 auto", 
      padding: "20px", 
      fontFamily: "Arial, sans-serif" 
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Professional Image Enhancer</h1>
      
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={{ flex: 1, backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px" }}>
          <h3>Upload Image</h3>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleImageUpload} 
            accept="image/*" 
            style={{ marginBottom: "10px" }}
          />
          <button 
            onClick={() => fileInputRef.current.click()}
            style={{
              padding: "8px 16px",
              backgroundColor: "#4285f4",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "15px"
            }}
          >
            Select Image
          </button>
          
          {uploadedImageUrl && (
            <div>
              <h4>Original Image</h4>
              <img 
                src={uploadedImageUrl} 
                alt="Original" 
                style={{ 
                  maxWidth: "100%", 
                  maxHeight: "200px", 
                  borderRadius: "4px" 
                }}
              />
            </div>
          )}
        </div>
        
        <div style={{ flex: 1, backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px" }}>
          <h3>Enhancement Options</h3>
          
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Enhancement Type:</label>
            <select 
              value={enhancement} 
              onChange={handleEnhancementChange}
              style={{ 
                width: "100%", 
                padding: "8px", 
                borderRadius: "4px", 
                border: "1px solid #ccc" 
              }}
            >
              <option value="background-blur">Background Blur</option>
              <option value="background-enhancer">Background Enhancer</option>
              <option value="face-retouch">Face Retouch</option>
              <option value="face-enhancer">Face Enhancer</option>
              <option value="sharpener">Sharpener</option>
              <option value="color-correction">Color Correction</option>
              <option value="noise-reduction">Noise Reduction</option>
            </select>
          </div>
          
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Filter Type:</label>
            <select 
              value={filterType} 
              onChange={handleFilterTypeChange}
              style={{ 
                width: "100%", 
                padding: "8px", 
                borderRadius: "4px", 
                border: "1px solid #ccc" 
              }}
            >
              {getFilterOptions()}
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h4>Advanced Adjustments</h4>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Brightness: {adjustments.brightness}</label>
              <input 
                type="range" 
                min="-100" 
                max="100" 
                value={adjustments.brightness} 
                onChange={(e) => handleAdjustmentChange('brightness', e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
            
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Contrast: {adjustments.contrast}</label>
              <input 
                type="range" 
                min="-100" 
                max="100" 
                value={adjustments.contrast} 
                onChange={(e) => handleAdjustmentChange('contrast', e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
            
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Saturation: {adjustments.saturation}</label>
              <input 
                type="range" 
                min="-100" 
                max="100" 
                value={adjustments.saturation} 
                onChange={(e) => handleAdjustmentChange('saturation', e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
            
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Sharpness: {adjustments.sharpness}</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={adjustments.sharpness} 
                onChange={(e) => handleAdjustmentChange('sharpness', e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          
          <div style={{ display: "flex", gap: "10px" }}>
            <button 
              onClick={handleApplyFilter}
              disabled={!uploadedImage || isProcessing}
              style={{
                padding: "10px 20px",
                backgroundColor: !uploadedImage || isProcessing ? "#cccccc" : "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: !uploadedImage || isProcessing ? "not-allowed" : "pointer",
                flex: 1
              }}
            >
              {isProcessing ? "Processing..." : "Apply Enhancement"}
            </button>
            
            <button 
              onClick={handleReset}
              style={{
                padding: "10px 20px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      
      {processedImage && (
        <div style={{ 
          backgroundColor: "#f8f8f8", 
          padding: "20px", 
          borderRadius: "8px", 
          marginBottom: "20px" 
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <h3 style={{ margin: 0 }}>Processed Image</h3>
            <div>
              <button 
                onClick={() => setShowComparisonView(!showComparisonView)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#9c27b0",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "10px"
                }}
              >
                {showComparisonView ? "Hide Comparison" : "Show Comparison"}
              </button>
              <button 
                onClick={handleDownload}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#2196f3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Download
              </button>
            </div>
          </div>
          
          {showComparisonView ? (
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <h4>Original</h4>
                <img 
                  src={uploadedImageUrl} 
                  alt="Original" 
                  style={{ 
                    width: "100%", 
                    borderRadius: "4px" 
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <h4>Enhanced</h4>
                <img 
                  src={processedImage} 
                  alt="Processed" 
                  style={{ 
                    width: "100%", 
                    borderRadius: "4px" 
                  }}
                />
              </div>
            </div>
          ) : (
            <img 
              src={processedImage} 
              alt="Processed" 
              style={{ 
                maxWidth: "100%", 
                borderRadius: "4px" 
              }}
            />
          )}
          
          <div style={{ marginTop: "15px" }}>
            <h4>Applied Enhancements</h4>
            <p>Enhancement: <strong>{enhancement}</strong> | Filter Type: <strong>{filterType}</strong></p>
            <p>
              Brightness: <strong>{adjustments.brightness}</strong> | 
              Contrast: <strong>{adjustments.contrast}</strong> | 
              Saturation: <strong>{adjustments.saturation}</strong> | 
              Sharpness: <strong>{adjustments.sharpness}</strong>
            </p>
          </div>
        </div>
      )}
      
      {history.length > 0 && (
        <div style={{ 
          backgroundColor: "#f5f5f5", 
          padding: "20px", 
          borderRadius: "8px" 
        }}>
          <h3>Enhancement History</h3>
          <div style={{ display: "flex", overflowX: "auto", gap: "15px", padding: "5px" }}>
            {history.map((item, index) => (
              <div 
                key={item.id}
                style={{ 
                  minWidth: "150px",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
                onClick={() => applyHistoryItem(item)}
              >
                <img 
                  src={item.imageUrl} 
                  alt={`History ${index}`} 
                  style={{ 
                    width: "100%", 
                    height: "100px", 
                    objectFit: "cover",
                    borderRadius: "4px",
                    marginBottom: "5px"
                  }}
                />
                <div style={{ fontSize: "12px" }}>
                  <p style={{ margin: "0 0 5px 0" }}><strong>{item.enhancement}</strong></p>
                  <p style={{ margin: "0", color: "#666" }}>{item.filterType}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedImage;
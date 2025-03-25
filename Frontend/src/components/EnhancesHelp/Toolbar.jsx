import React, { useState } from 'react';
import { LuScanFace } from "react-icons/lu";

const Toolbar = ({ onApplyEnhancement }) => {
  const [selectedEnhanceOptions, setSelectedEnhanceOptions] = useState({
    faceEnhance: true,
    backgroundEnhance: false,
    colorCorrection: false
  });

  const [faceEnhanceVersion, setFaceEnhanceVersion] = useState('v1');
  const [backgroundEnhanceVersion, setBackgroundEnhanceVersion] = useState('base');
  const [isBeautifyOpen, setIsBeautifyOpen] = useState(false);
  const [selectedBeautify, setSelectedBeautify] = useState('none');
  const [isBlurOpen, setIsBlurOpen] = useState(false);
  const [selectedBlur, setSelectedBlur] = useState('none');
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('none');

  const beautifyOptions = [
    { id: 'none', name: 'None', effect: {} },
    { id: 'movie', name: 'Movie', effect: { brightness: 0.1, contrast: 0.2, saturation: 0.3 } },
    { id: 'glam', name: 'Glam', effect: { brightness: 0.2, contrast: 0.4, warmth: 0.2 } },
    { id: 'cute', name: 'Cute', effect: { brightness: 0.1, saturation: 0.3, softness: 0.2 } },
    { id: 'natural', name: 'Natural', effect: { contrast: 0.1, clarity: 0.2 } },
    { id: 'silk', name: 'Silk', effect: { softness: 0.4, brightness: 0.1 } },
    { id: 'charm', name: 'Charm', effect: { contrast: 0.3, saturation: 0.2, warmth: 0.1 } }
  ];

  const blurOptions = [
    { id: 'none', name: 'None', effect: { blur: 0 } },
    { id: 'low', name: 'Low', effect: { blur: 5 } },
    { id: 'medium', name: 'Medium', effect: { blur: 10 } },
    { id: 'high', name: 'High', effect: { blur: 15 } }
  ];

  const colorOptions = [
    { id: 'none', name: 'None', effect: {} },
    { id: 'golden', name: 'Golden', effect: { saturation: 0.2, warmth: 0.3, brightness: 0.1 } },
    { id: 'steady', name: 'Steady', effect: { contrast: 0.15, saturation: 0.1 } },
    { id: 'balanced', name: 'Balanced', effect: { contrast: 0.2, brightness: 0.1, saturation: 0.1 } },
    { id: 'orange', name: 'Orange', effect: { warmth: 0.4, saturation: 0.2 } },
    { id: 'silky', name: 'Silky', effect: { softness: 0.2, brightness: 0.15, contrast: 0.1 } },
    { id: 'muted', name: 'Muted', effect: { saturation: -0.2, contrast: 0.1 } }
  ];

  const handleOptionChange = (option) => {
    setSelectedEnhanceOptions({
      ...selectedEnhanceOptions,
      [option]: !selectedEnhanceOptions[option]
    });
  };

  const handleBeautifySelect = (option) => {
    setSelectedBeautify(option.id);
    setIsBeautifyOpen(false);
    // Apply the effect to the image through the parent component
    onApplyEnhancement({ type: 'beautify', ...option.effect });
  };

  const handleBlurSelect = (option) => {
    setSelectedBlur(option.id);
    setIsBlurOpen(false);
    onApplyEnhancement({ type: 'blur', ...option.effect });
  };

  const handleColorSelect = (option) => {
    setSelectedColor(option.id);
    setIsColorOpen(false);
    onApplyEnhancement({ type: 'color', ...option.effect });
  };

  const handleApplyEnhancements = () => {
    const filters = [];

    // Add face enhancement filter if selected
    if (selectedBeautify !== 'none') {
      const beautifyOption = beautifyOptions.find(opt => opt.id === selectedBeautify);
      filters.push({
        type: 'face-enhancer',
        filterType: selectedBeautify,
        ...beautifyOption.effect
      });
    }

    // Add blur filter if selected
    if (selectedBlur !== 'none') {
      const blurOption = blurOptions.find(opt => opt.id === selectedBlur);
      filters.push({
        type: 'background-blur',
        filterType: selectedBlur,
        ...blurOption.effect
      });
    }

    // Add color correction filter if selected
    if (selectedColor !== 'none') {
      const colorOption = colorOptions.find(opt => opt.id === selectedColor);
      filters.push({
        type: 'color-correction',
        filterType: selectedColor,
        ...colorOption.effect
      });
    }

    // Call parent's onApplyEnhancement with all selected filters
    onApplyEnhancement({ filters });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <div 
        className="flex-1 overflow-y-auto space-y-8 pr-4 scrollbar-thin " 
        style={{ 
          height: 'calc(100vh - 280px)',
          overflowY: 'auto',
          paddingRight: '10px',
          position: 'relative'
        }}
      >
        <style>
          {`
            .scrollbar-thin::-webkit-scrollbar {
              width: 4px;
            }
            .scrollbar-thin::-webkit-scrollbar-track {
              background: transparent;
              margin: 4px 0;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb {
              background: #4B5563;
              border-radius: 4px;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb:hover {
              background: #6B7280;
            }
          `}
        </style>
        {/* Face Enhance */}
        <div className="pb-3 border-b border-gray-800">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-purple-400 rounded-lg flex items-center justify-center mr-3">
            <LuScanFace />
            </div>
            <div>
              <h3 className="font-medium">Face Enhance</h3>
              <p className="text-xs text-gray-400">Applied to faces</p>
            </div>
          </div>
          
          <div className="mt-4 flex gap-2">
            <button 
              className={`px-4 py-2 rounded-lg ${faceEnhanceVersion === 'base' ? 'bg-gray-700' : 'bg-gray-800'}`}
              onClick={() => setFaceEnhanceVersion('base')}
            >
              Base
            </button>
          </div>
          
          <div className="mt-4">
            <div className="relative">
              <div 
                className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-700 rounded-lg"
                onClick={() => setIsBeautifyOpen(!isBeautifyOpen)}
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center mr-2">
                    <i className="ri-magic-line text-sm"></i>
                  </div>
                  <span className="text-sm">Beautify</span>
                  <span className="ml-2 text-xs text-gray-400">
                    {selectedBeautify !== 'none' && `(${beautifyOptions.find(opt => opt.id === selectedBeautify)?.name})`}
                  </span>
                </div>
                <i className={`ri-arrow-${isBeautifyOpen ? 'down' : 'right'}-s-line`}></i>
              </div>

              {isBeautifyOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg z-10">
                  {beautifyOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${
                        selectedBeautify === option.id ? 'bg-gray-700' : ''
                      } ${option.id === 'none' ? 'border-b border-gray-700' : ''}`}
                      onClick={() => handleBeautifySelect(option)}
                    >
                      <span className="text-sm">{option.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Background Enhance */}
        <div className="pb-4 border-b border-gray-800">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center mr-3">
              <i className="ri-landscape-line text-lg"></i>
            </div>
            <div>
              <h3 className="font-medium">Background Enhance</h3>
              <p className="text-xs text-gray-400">Applied to surroundings</p>
            </div>
          </div>
          
          <div className="mt-4 flex gap-2">
            <button 
              className={`px-4 py-2 rounded-lg ${backgroundEnhanceVersion === 'base' ? 'bg-gray-700' : 'bg-gray-800'}`}
              onClick={() => setBackgroundEnhanceVersion('base')}
            >
              Base
            </button>
          </div>
          
          <div className="mt-3">
            <div className="relative">
              <div 
                className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-700 rounded-lg"
                onClick={() => setIsBlurOpen(!isBlurOpen)}
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center mr-2">
                    <i className="ri-blur-off-line text-sm"></i>
                  </div>
                  <span className="text-sm">Background Blur</span>
                  <span className="ml-2 text-xs text-gray-400">
                    {selectedBlur !== 'none' && `(${blurOptions.find(opt => opt.id === selectedBlur)?.name})`}
                  </span>
                </div>
                <i className={`ri-arrow-${isBlurOpen ? 'down' : 'right'}-s-line`}></i>
              </div>

              {isBlurOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg z-10">
                  {blurOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${
                        selectedBlur === option.id ? 'bg-gray-700' : ''
                      } ${option.id === 'none' ? 'border-b border-gray-700' : ''}`}
                      onClick={() => handleBlurSelect(option)}
                    >
                      <span className="text-sm">{option.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Color Correction */}
        <div className="pb-3 border-b border-gray-800">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-red-400 rounded-lg flex items-center justify-center mr-3">
              <i className="ri-palette-line text-lg"></i>
            </div>
            <div>
              <h3 className="font-medium">Color Correction</h3>
              <p className="text-xs text-gray-400">Adjust the color profile</p>
            </div>
          </div>
          
          <div className="mt-9">
            <div className="relative">
              <div 
                className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-700 rounded-lg"
                onClick={() => setIsColorOpen(!isColorOpen)}
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center mr-2">
                    <i className="ri-contrast-2-line text-sm"></i>
                  </div>
                  <span className="text-sm">Auto Color</span>
                  <span className="ml-2 text-xs text-gray-400">
                    {selectedColor !== 'none' && `(${colorOptions.find(opt => opt.id === selectedColor)?.name})`}
                  </span>
                </div>
                <i className={`ri-arrow-${isColorOpen ? 'down' : 'right'}-s-line`}></i>
              </div>

              {isColorOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg z-10">
                  {colorOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${
                        selectedColor === option.id ? 'bg-gray-700' : ''
                      } ${option.id === 'none' ? 'border-b border-gray-700' : ''}`}
                      onClick={() => handleColorSelect(option)}
                    >
                      <span className="text-sm">{option.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Apply Button - Fixed at bottom */}
      <div className="pt-4 bg-gray-900">
        <button 
          onClick={handleApplyEnhancements}
          className="w-full py-2 bg-pink-600 hover:bg-pink-700 transition-colors text-white font-medium rounded-3xl"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
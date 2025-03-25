// src/components/EnhancementSettings.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const EnhancementSettings = ({ processingSettings, onSettingsChange }) => {
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const handleProcessingSettingChange = (setting, value) => {
    onSettingsChange(setting, value);
  };

  return (
    <div className="w-full max-w-[400px]">
      <button
        type="button"
        onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
        className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center mb-2 transition-colors mx-auto"
      >
        {showAdvancedSettings ? "Hide" : "Show"} Advanced Settings
        <i className={`ri-arrow-${showAdvancedSettings ? 'up' : 'down'}-s-line ml-1`}></i>
      </button>
      
      {showAdvancedSettings && (
        <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg mb-4 text-left">
          <h3 className="text-sm font-semibold mb-2 text-gray-300">Enhancement Settings</h3>
          
          <div className="mb-2">
            <label className="text-sm text-gray-400 block mb-1">Enhancement Level</label>
            <select
              value={processingSettings.enhancementLevel}
              onChange={(e) => handleProcessingSettingChange('enhancementLevel', e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-1 rounded text-sm"
            >
              <option value="low">Low (Subtle)</option>
              <option value="medium">Medium (Standard)</option>
              <option value="high">High (Dramatic)</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="removeBlur"
                checked={processingSettings.removeBlur}
                onChange={(e) => handleProcessingSettingChange('removeBlur', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="removeBlur" className="text-sm text-gray-300">Remove Blur</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="removeNoise"
                checked={processingSettings.removeNoise}
                onChange={(e) => handleProcessingSettingChange('removeNoise', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="removeNoise" className="text-sm text-gray-300">Remove Noise</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="increaseSharpness"
                checked={processingSettings.increaseSharpness}
                onChange={(e) => handleProcessingSettingChange('increaseSharpness', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="increaseSharpness" className="text-sm text-gray-300">Increase Sharpness</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="improveColors"
                checked={processingSettings.improveColors}
                onChange={(e) => handleProcessingSettingChange('improveColors', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="improveColors" className="text-sm text-gray-300">Enhance Colors</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

EnhancementSettings.propTypes = {
  processingSettings: PropTypes.object.isRequired,
  onSettingsChange: PropTypes.func.isRequired
};

export default EnhancementSettings;
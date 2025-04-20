import React from "react";
import PropTypes from "prop-types";

const LoadingSpinner = ({ size = 40, color = "#3B82F6", secondaryColor = "#1E293B" }) => {
  const strokeWidth = Math.max(1, Math.round(size / 15));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashArray = circumference;
  const dashOffset = circumference * 0.75;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Static background circle */}
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`} 
        className="absolute"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={secondaryColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
      </svg>

      {/* Animated spinner */}
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`} 
        className="absolute animate-spin"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Optional inner pulse */}
      <div 
        className="absolute rounded-full animate-pulse" 
        style={{
          width: size / 5,
          height: size / 5,
          backgroundColor: color,
        }}
      />
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  secondaryColor: PropTypes.string,
};

export default LoadingSpinner;
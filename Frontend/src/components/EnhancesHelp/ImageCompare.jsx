// import React, { useRef, useEffect } from 'react';

// const ImageCompare = ({ 
//   originalImage, 
//   enhancedImage, 
//   viewMode,
//   sliderPosition,
//   setSliderPosition,
//   isFullscreen,
//   onToggleFullscreen
// }) => {
//   const sliderContainerRef = useRef(null);
  
//   const handleSliderMove = (e) => {
//     if (!sliderContainerRef.current) return;
    
//     const container = sliderContainerRef.current;
//     const rect = container.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const percent = (x / rect.width) * 100;
//     setSliderPosition(Math.min(Math.max(percent, 0), 100));
//   };

//   const handleMouseDown = () => {
//     if (!sliderContainerRef.current) return;
    
//     const container = sliderContainerRef.current;
    
//     const handleMouseMove = (e) => {
//       handleSliderMove(e);
//     };
    
//     const handleMouseUp = () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
    
//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//   };

//   // Render the appropriate view based on viewMode
//   const renderView = () => {
//     if (viewMode === 'before') {
//       return (
//         <div className="fixed-image-container">
//           <img 
//             src={originalImage} 
//             alt="Original" 
//             className="comparison-image"
//           />
//         </div>
//       );
//     } else if (viewMode === 'after') {
//       return (
//         <div className="fixed-image-container">
//           <img 
//             src={enhancedImage} 
//             alt="Enhanced" 
//             className="comparison-image"
//           />
//         </div>
//       );
//     } else {
//       // Before-After slider view
//       return (
//         <div 
//           ref={sliderContainerRef}
//           className="fixed-image-container relative cursor-col-resize"
//           onMouseDown={handleMouseDown}
//         >
//           {/* Enhanced (background) image */}
//           <div className="absolute inset-0">
//             <img 
//               src={enhancedImage} 
//               alt="Enhanced" 
//               className="comparison-image"
//             />
//           </div>
          
//           {/* Original image with clip */}
//           <div 
//             className="absolute inset-0 overflow-hidden"
//             style={{ width: `${sliderPosition}%` }}
//           >
//             <img 
//               src={originalImage} 
//               alt="Original" 
//               className="comparison-image"
//             />
//           </div>
          
//           {/* Slider handle */}
//           <div 
//             className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
//             style={{ left: `${sliderPosition}%` }}
//           >
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
//               <i className="ri-arrow-left-right-line text-black"></i>
//             </div>
//           </div>
          
//           {/* Labels */}
//           <div className="absolute top-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded-lg">
//             Before
//           </div>
          
//           <div className="absolute top-4 right-4 bg-black bg-opacity-50 px-3 py-1 rounded-lg">
//             After
//           </div>
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="relative w-full h-full flex items-center justify-center">
//       <div className="absolute top-4 right-4 z-10">
//         <button 
//           onClick={onToggleFullscreen}
//           className="bg-black bg-opacity-50 p-2 rounded-lg text-white hover:bg-opacity-70 transition-opacity"
//         >
//           <i className={`ri-${isFullscreen ? 'fullscreen-exit' : 'fullscreen'}-line text-xl`}></i>
//         </button>
//       </div>
      
//       <style jsx>{`
//         .fixed-image-container {
//           width: 800px;
//           height: 600px;
//           background-color: #1a1a1a;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           overflow: hidden;
//         }
        
//         .comparison-image {
//           width: 100%;
//           height: 100%;
//           object-fit: contain;
//           pointer-events: none;
//         }
//       `}</style>
      
//       {renderView()}
//     </div>
//   );
// };

// export default ImageCompare;
import React, { useState, useRef, useEffect } from 'react';
import '../../App.css';

const ImageSlider4 = ({ originalImage, enhancedImage }) => {
    const sliderRef = useRef(null);
    const sliderHandleRef = useRef(null);
    const imageAfterRef = useRef(null);
    const originalLabelRef = useRef(null);
    const enhancedLabelRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [originalLoaded, setOriginalLoaded] = useState(false);
    const [enhancedLoaded, setEnhancedLoaded] = useState(false);

    useEffect(() => {
        setOriginalLoaded(false);
        setEnhancedLoaded(false);
    }, [originalImage, enhancedImage]);

    // Improved offset calculation with more robust handling
    const getOffset = (event) => {
        if (!sliderRef.current) return 0;
        
        const sliderRect = sliderRef.current.getBoundingClientRect();
        if (!sliderRect.width) return 0;  // Add check for width
        
        let clientX = event?.touches ? event.touches[0].clientX : event?.clientX || 0;
        
        let offsetX = clientX - sliderRect.left;
        offsetX = Math.max(0, Math.min(offsetX, sliderRect.width));
        
        return offsetX;
    };

    // Enhanced slider movement with precise positioning
    const moveSlider = (offsetX) => {
        if (!sliderRef.current || !sliderHandleRef.current || !imageAfterRef.current) return;
        
        const sliderWidth = sliderRef.current.offsetWidth;
        if (!sliderWidth) return;
        
        const percentage = (offsetX / sliderWidth) * 100;
        
        // Move slider handle
        sliderHandleRef.current.style.left = `${percentage}%`;
        
        // Clip image
        imageAfterRef.current.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        
        // Move labels
        if (originalLabelRef.current && enhancedLabelRef.current) {
            originalLabelRef.current.style.left = `${Math.max(percentage - 10, 0)}%`;
            enhancedLabelRef.current.style.left = `${Math.min(percentage + 2, 90)}%`;
        }
    };

    // Event handlers with improved touch and mouse support
    const startSliding = (event) => {
        if (!event) return;
        if (event.type === 'mousedown') {
            event.preventDefault();
        }
        setIsActive(true);
        const offsetX = getOffset(event);
        moveSlider(offsetX);
    };

    const handleMove = (moveEvent) => {
        if (!moveEvent || !isActive) return;
        if (moveEvent.type === 'mousemove') {
            moveEvent.preventDefault();
        }
        const offsetX = getOffset(moveEvent);
        moveSlider(offsetX);
    };

    const stopSliding = () => {
        setIsActive(false);
    };

    // Keyboard accessibility
    const handleKeyboardSlide = (event) => {
        if (!sliderRef.current) return;

        const sliderWidth = sliderRef.current.offsetWidth;
        const currentPercentage = parseFloat(sliderHandleRef.current.style.left) || 50;
        
        let newOffset = sliderWidth * (currentPercentage / 100);

        switch(event.key) {
            case 'ArrowLeft':
                newOffset = Math.max(0, newOffset - sliderWidth * 0.05);
                break;
            case 'ArrowRight':
                newOffset = Math.min(sliderWidth, newOffset + sliderWidth * 0.05);
                break;
            default:
                return;
        }

        moveSlider(newOffset);
    };

    // Modify useEffect for initialization
    useEffect(() => {
        const initializeSlider = () => {
            if (sliderRef.current && sliderHandleRef.current && imageAfterRef.current) {
                // Set initial position to 50%
                moveSlider(sliderRef.current.offsetWidth / 2);
            }
        };

        // Initialize after a short delay to ensure DOM is ready
        const timer = setTimeout(initializeSlider, 200);
        
        // Add event listeners
        window.addEventListener('mousemove', handleMove, { passive: false });
        window.addEventListener('touchmove', handleMove, { passive: true });
        window.addEventListener('mouseup', stopSliding);
        window.addEventListener('touchend', stopSliding);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('mouseup', stopSliding);
            window.removeEventListener('touchend', stopSliding);
        };
    }, [isActive]); // Only re-run when isActive changes

    // Render nothing if images are not provided
    if (!originalImage || !enhancedImage) {
        return <div className="text-center text-gray-500">No images available</div>;
    }

    return (
        <div className="relative w-[850px] max-w-4xl ml-20 ">
            <div
                ref={sliderRef}
                className="comparison-container relative h-[560px] w-full overflow-hidden"
                onMouseDown={startSliding}
                onTouchStart={(e) => {
                    e.stopPropagation();
                    startSliding(e);
                }}
                onKeyDown={handleKeyboardSlide}
                tabIndex={0}
                role="slider"
                aria-label="Image comparison slider"
            >
                {/* Original Image */}
                <img
                    src={originalImage}
                    alt="Original Image"
                    className={`absolute top-0 left-0 w-full h-full object-cover object-center ${!originalLoaded ? 'invisible' : ''}`}
                    onLoad={() => setOriginalLoaded(true)}
                />

                {/* Enhanced Image with Clipping */}
                <div
                    ref={imageAfterRef}
                    className="absolute top-0 left-0 w-full h-full"
                >
                    <img
                        src={enhancedImage}
                        alt="Enhanced Image"
                        className={`w-full h-full object-cover object-center ${!enhancedLoaded ? 'invisible' : ''}`}
                        onLoad={() => setEnhancedLoaded(true)}
                    />
                </div>

                {/* Loading indicator */}
                {(!originalLoaded || !enhancedLoaded) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                    </div>
                )}

                {/* Labels */}
                <div 
                    ref={originalLabelRef}
                    className="absolute top-4 left-[40%] text-sm  bg-black text-white px-3 py-1 rounded-full pointer-events-none select-none"
                >
                    Original
                </div>
                <div 
                    ref={enhancedLabelRef}
                    className="absolute top-4 left-[60%] text-sm bg-black text-white px-3 py-1 rounded-full pointer-events-none select-none"
                >
                    Enhanced
                </div>

                {/* Slider Handle */}
                <div
                    ref={sliderHandleRef}
                    className="slider-handle"
                />
            </div>
        </div>
    );
};

export default ImageSlider4;
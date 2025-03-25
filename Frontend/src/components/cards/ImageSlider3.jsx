import React, { useState, useRef, useEffect } from 'react';
import '../../App.css';
import faceenhancer1 from '../../assets/face-enhancer-1-removebg-preview.png';
import faceenhancer2 from '../../assets/face-enhancer-2-removebg-preview.png'

const ImageSlider3 = () => {
    const sliderRefs = useRef([]);
    const sliderHandleRefs = useRef([]);
    const imageAfterRefs = useRef([]);
    const [isActive, setIsActive] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    const getOffset = (event, index) => {
        let offsetX;
        if (event.touches) {
            offsetX = event.touches[0].clientX - sliderRefs.current[index].getBoundingClientRect().left;
        } else {
            offsetX = event.clientX - sliderRefs.current[index].getBoundingClientRect().left;
        }
        if (offsetX < 0) offsetX = 0;
        if (offsetX > sliderRefs.current[index].offsetWidth) offsetX = sliderRefs.current[index].offsetWidth;
        return offsetX;
    };

    const moveSlider = (offsetX, index) => {
        const sliderWidth = sliderRefs.current[index].offsetWidth;
        const percentage = (offsetX / sliderWidth) * 100;
    
        // Move slider handle
        sliderHandleRefs.current[index].style.left = `${percentage}%`;
    
        // Clip the after image dynamically
        imageAfterRefs.current[index].style.clipPath = `inset(0 ${sliderWidth - offsetX}px 0 0)`;
    
        // Adjust label positions
        const afterLabel = sliderRefs.current[index].querySelector('.after-label');
        const beforeLabel = sliderRefs.current[index].querySelector('.before-label');
    
        if (afterLabel) afterLabel.style.left = `${offsetX + 10}px`;
        if (beforeLabel) beforeLabel.style.left = `${offsetX - 80}px`;
    };
    

    const onMouseMove = (event) => {
        if (!isActive || activeIndex === null) return;
        const offsetX = getOffset(event, activeIndex);
        moveSlider(offsetX, activeIndex);
    };

    useEffect(() => {
        const handleMouseUp = () => {
            setIsActive(false);
            setActiveIndex(null);
        };
        const handleMouseMove = (event) => onMouseMove(event);

        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchend', handleMouseUp);
        document.addEventListener('touchmove', handleMouseMove);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchend', handleMouseUp);
            document.removeEventListener('touchmove', handleMouseMove);
        };
    }, [isActive, activeIndex]);

    const images = [
        { before: faceenhancer2, after: faceenhancer1 }
    ];

    return (
        <div className='relative h-screen w-fit'>
            {images.map((image, index) => (
                <div
                    key={index}
                    ref={el => sliderRefs.current[index] = el}
                    className="comparison-container h-[650px] w-[600px] overflow-hidden relative mt-8"
                    onMouseDown={(e) => {
                        setIsActive(true);
                        setActiveIndex(index);
                        onMouseMove(e);
                    }}
                    onTouchStart={(e) => {
                        setIsActive(true);
                        setActiveIndex(index);
                        onMouseMove(e);
                    }}
                >

                    <img
                        src={image.before}
                        alt="Before Image"
                        className="comparison-image--before object-cover object-bottom select-none" 
                    />
                    <div
                        ref={el => imageAfterRefs.current[index] = el}
                        className="comparison-image--after absolute top-0 left-0 h-full w-full"
                    >
                        <img
                            src={image.after}
                            alt="After Image"
                            className="comparison-image--after object-cover object-bottom select-none"
                        />
                        <div className="absolute top-4 text-sm bg-black text-white px-3 py-1 rounded-full pointer-events-none select-none before-label">Before</div>
                    </div>
                    <div
                        ref={el => sliderHandleRefs.current[index] = el}
                        className="slider-handle"
                    />
                    <div className="absolute top-4 text-sm bg-black text-white px-3 py-1 rounded-full pointer-events-none select-none after-label">After</div>
                </div>
            ))}
        </div>
    );
}
export default ImageSlider3;
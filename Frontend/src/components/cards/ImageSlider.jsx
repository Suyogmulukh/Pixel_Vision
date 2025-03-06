import React, { useState, useRef, useEffect } from 'react';
import '../../App.css'

const ImageSlider = () => {
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
        const percentage = (offsetX / sliderRefs.current[index].offsetWidth) * 100;
        sliderHandleRefs.current[index].style.left = `${percentage}%`;
        imageAfterRefs.current[index].style.clip = `rect(0, ${offsetX}px, ${sliderRefs.current[index].offsetHeight}px, 0)`;
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

return (
    <div>
    <div className='relative h-[400px] w-[1300px] top-10 gap-16 flex items-center justify-between bg-[#7d7e8a] '>
           <div className='ml-12 h-96 w-[1200px] flex items-center justify-between absolute bg-black '>
             {[0, 1, 2,].map((index) => (
                
            <div
                key={index}
                ref={el => sliderRefs.current[index] = el}
                className="comparison-container gap-10 h-72 w-52 overflow-hidden relative "
                onMouseDown={(e) => {
                    setIsActive(true);
                    setActiveIndex(index);
                    onMouseMove(e);
                }}
                onTouchStart={(e) => {
                    setIsActive(true);
                    setActiveIndex(index);
                    onMouseMove(e);cd
                }}
            >
                <img
                    src="https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?cs=srgb&dl=pexels-wojciech-kumpicki-1084687-2071882.jpg&fm=jpg"
                    alt="Before Image"
                    className="comparison-image--before"
                />
                <div
                    ref={el => imageAfterRefs.current[index] = el}
                    className="comparison-image--after"
                >
                    <img
                        src="https://i.pinimg.com/736x/2c/8e/98/2c8e981280d108b806c2e07bfbcc15b9.jpg"
                        alt="After Image"
                    />
                </div>
                <div
                    ref={el => sliderHandleRefs.current[index] = el}
                    className="slider-handle" />
                <p className="label label--left">Image One</p>
                <p className="label label--right">Image Two</p>
            </div>
        ))}
        </div>
</div>
        {/* <div className='relative top-80 gap-16 flex items-center justify-between'>
        {[0, 1, 2,].map((index) => (
            <div
                key={index}
                ref={el => sliderRefs.current[index] = el}
                className="comparison-container ml-6 -top-36 h-96 w-96 overflow-hidden relative"
                onMouseDown={(e) => {
                    setIsActive(true);
                    setActiveIndex(index);
                    onMouseMove(e);
                }}
                onTouchStart={(e) => {
                    setIsActive(true);
                    setActiveIndex(index);
                    onMouseMove(e);cd
                }}
            >
                <img
                    src="https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?cs=srgb&dl=pexels-wojciech-kumpicki-1084687-2071882.jpg&fm=jpg"
                    alt="Before Image"
                    className="comparison-image--before"
                />
                <div
                    ref={el => imageAfterRefs.current[index] = el}
                    className="comparison-image--after"
                >
                    <img
                        src="https://i.pinimg.com/736x/2c/8e/98/2c8e981280d108b806c2e07bfbcc15b9.jpg"
                        alt="After Image"
                    />
                </div>

                <div
                    ref={el => sliderHandleRefs.current[index] = el}
                    className="slider-handle" />
                <p className="label label--left">Image One</p>
                <p className="label label--right">Image Two</p>
            </div>
        ))}
        </div>
    </div>
     */}
    </div>
);
}
export default ImageSlider 
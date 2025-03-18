import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../App.css';
import faceenhancer1 from '../../assets/face-enhancer-1.jpg';
import faceenhancer2 from '../../assets/face-enhancer-2.jpg';
import color1 from '../../assets/color-1.jpg';
import color2 from '../../assets/color-2.jpg';
import imageenhancer1 from '../../assets/image-enhaces-1.jpg';
import imageenhancer2 from '../../assets/image-enhaces-2.jpg';

const ImageSlider2 = () => {
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

    const images = [
        { before: faceenhancer2, after: faceenhancer1 },
        { before: color2, after: color1},
        { before: imageenhancer2, after: imageenhancer1 }
    ];

    return (
        <div className='relative top-48 gap-16 flex items-center justify-between'>
            {images.map((image, index) => (
                <div
                    key={index}
                    ref={el => sliderRefs.current[index] = el}
                    className="comparison-container ml-32 -top-36 h-56 w-72 overflow-hidden relative rounded-3xl"
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
                        className="comparison-image--before object-cover object-center"
                    />
                    <div
                        ref={el => imageAfterRefs.current[index] = el}
                        className="comparison-image--after "
                    >
                        <img
                            src={image.after}
                            alt="After Image"
                            className="comparison-image--after object-cover object-center"
                        />
                    </div>
                    <motion.div
                        ref={el => sliderHandleRefs.current[index] = el}
                        className="slider-handle"
                        drag="x"
                        dragConstraints={{ left: 0, right: sliderRefs.current[index]?.offsetWidth }}
                        onDrag={(event, info) => moveSlider(info.point.x - sliderRefs.current[index].getBoundingClientRect().left, index)}
                    />
                    <p className="label label--left">Image One</p>
                    <p className="label label--right">Image Two</p>
                </div>
            ))}
        </div>
    );
}
export default ImageSlider2;
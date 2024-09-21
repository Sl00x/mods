"use client";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { ReactElement, useState } from "react";

interface ImageCarouselProps {
  images: string[];
  children?: ReactElement | ReactElement[];
}

export const ImageCarousel = ({ images, children }: ImageCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="relative w-full h-full object-cover"
      style={{ backgroundImage: `url('${images[currentImageIndex]}')` }}
    >
      {/* Main Image */}
      <div className="absolute w-full h-full top-0 bg-black/50 backdrop-blur-[10px]"></div>
      <div className="relative w-full overflow-hidden rounded-md shadow-md p-4">
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          className="mx-auto w-1/2 h-[550px] max-h-[550px] object-fit transform transition-transform duration-500 ease-in-out rounded-lg shadow-md"
        />
        {/* Previous and Next Arrows */}
        <button
          onClick={handlePrev}
          className="z-10 absolute duration-500 hover:bg-gradient-to-r hover:from-black/50 hover:to-black/0 left-0 top-1/2 h-full w-64 transform -translate-y-1/2  bg-opacity-50 text-white p-2 hover:bg-opacity-70 transition-all"
        >
          <RiArrowLeftSLine size={24} />
        </button>
        <button
          onClick={handleNext}
          className="z-10 absolute duration-500 hover:bg-gradient-to-l hover:from-black/50 hover:to-black/0 right-0 top-1/2  h-full w-64 flex justify-end items-center transform -translate-y-1/2  text-white p-2 hover:bg-opacity-70 transition-all"
        >
          <RiArrowRightSLine size={24} />
        </button>
      </div>

      {/* Thumbnails */}
      {children && (
        <div className="absolute z-9 bottom-0 left-0 p-4">{children}</div>
      )}
    </div>
  );
};

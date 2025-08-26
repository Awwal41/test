import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ImageCarousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Cycle every 4 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[500px] m-0 p-0">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            currentImageIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image.image}
            alt={`${image.name} Image`}
            layout="fill"
            objectFit="cover"
            className="brightness-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-3xl font-bold text-white">{image.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
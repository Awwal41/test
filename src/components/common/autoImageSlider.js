import { useState, useEffect } from 'react';

/**
 * AutoImageSlider - Creates a smooth infinite horizontal image carousel
 * 
 * This component implements a single-direction sliding effect where:
 * - 1 image visible on mobile, 3 images on desktop
 * - Images slide continuously from right to left
 * - Creates an infinite loop by duplicating the first few images at the end
 * - No visual jumps or resets when reaching the end
 * 
 * @param {string[]} images - Array of image URLs to display
 * @param {number} interval - Time between slides in milliseconds (default: 3000)
 * @param {string} height - CSS height class for the slider (default: 'h-96')
 * @param {string} overlayOpacity - Overlay opacity class (unused after overlay removal)
 */
export default function AutoImageSlider({ images, interval = 3000, height = 'h-96', overlayOpacity = 'opacity-30' }) {
  // Tracks which set of images is currently being displayed
  // Each increment moves the viewport by 1 image width
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Number of images visible at once (1 on mobile, 3 on desktop)
  const imagesPerView = 3;

  // Auto-advance the slider at the specified interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);



  // Create a dynamic circular array that continuously extends
  // Original: [A, B, C, D, E] 
  // Dynamic: [A, B, C, D, E, A, B, C, D, E, A, B, C, D, E, ...] (continuously extends)
  // This ensures we never run out of images as the index grows
  const getExtendedImages = () => {
    const repeats = Math.ceil((currentIndex + 10) / images.length); // Always have 10 extra cycles
    return Array(repeats).fill(images).flat();
  };
  const allImages = getExtendedImages();
  

  
  // Calculate the horizontal position of the viewport
  // Mobile: Each index moves the viewport left by 100% (full width)
  // Desktop: Each index moves the viewport left by 33.33% (1/3 of container width)
  // Negative values move left, positive values move right
  // The extended array ensures smooth circular transitions
  const mobileTransform = -(currentIndex * 100);
  const desktopTransform = -(currentIndex * (100 / 3));
  

  


  return (
    <section className={`relative w-full overflow-hidden ${height}`}>
      <style jsx>{`
        @media (min-width: 768px) {
          .slider-container {
            transform: translateX(${desktopTransform}%) !important;
          }
        }
      `}</style>
      {/* 
        Main sliding container - holds all images in a horizontal line
        Uses CSS transform to move the entire line left/right
        transition-transform creates smooth animation between positions
        Mobile: Shows 1 image at a time (w-full)
        Desktop: Shows 3 images at a time (w-1/3)
      */}
      <div 
        className="flex h-full transition-transform duration-300 ease-in-out slider-container"
        style={{ 
          // Mobile: Move by full width, Desktop: Move by 1/3 width
          transform: `translateX(${mobileTransform}%)`,
        }}
      >
        {/* 
          Render all images in a continuous horizontal line
          Mobile: Each image takes full width (w-full)
          Desktop: Each image takes 1/3 width (w-1/3)
          flex-shrink-0 prevents images from shrinking
          Only 1 image visible on mobile, 3 on desktop due to overflow-hidden
        */}
        {allImages.map((image, index) => (
          <div
            key={`image-${index}`}
            className="relative h-full flex-shrink-0 w-full md:w-1/3"
            style={{ 
              backgroundImage: `url('${image}')`,
              backgroundSize: 'cover',    // Scale image to cover entire container
              backgroundPosition: 'center', // Center the image
              backgroundColor: '#ccc'      // Fallback color while image loads
            }}
          >
          </div>
        ))}
      </div>
    </section>
  );
} 
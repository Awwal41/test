import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "@/components/elements/primaryButton";

export default function RegionSelector({ regions, isHome }) {
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Auto-scroll effect with progress tracking
  useEffect(() => {
    if (isPaused) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, 100); // Update progress every 100ms

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % regions.length;
        setSelectedRegion(regions[nextIndex]);
        return nextIndex;
      });
      setProgress(0); // Reset progress when changing regions
    }, 10000); // Change every 10 seconds

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [isPaused, regions]);

  // Handle manual region selection
  const handleRegionClick = (region, index) => {
    setSelectedRegion(region);
    setCurrentIndex(index);
    setIsPaused(true);
    setProgress(0);
    // Resume auto-scroll after 15 seconds of manual selection
    setTimeout(() => setIsPaused(false), 15000);
  };

  // Handle image loading states
  const handleImageLoadStart = () => {
    setIsImageLoading(true);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
    console.log(`Image loaded: ${selectedRegion.image}`);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
      {/* Region Navigation */}
      <div className="relative">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-4">
          {regions.map((region, index) => (
            <button
              key={index}
              onClick={() => handleRegionClick(region, index)}
              className={`
                relative px-6 py-3 text-sm md:text-base font-medium rounded-xl
                transition-all duration-300 ease-in-out transform hover:scale-105
                ${
                  selectedRegion?.name === region.name
                    ? "bg-black text-white shadow-lg"
                    : "bg-white text-black hover:bg-gray-50 shadow-md hover:shadow-lg"
                }
              `}
            >
              {region.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-8">
        {/* Image Container - Full Width */}
        <div
          className="relative group w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden rounded-2xl">
            {/* Loading overlay */}
            {isImageLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100/80 backdrop-blur-sm">
                <div className="w-8 h-8 border-4 border-[#90651b] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            <Image
              src={selectedRegion.image}
              alt={`${selectedRegion.name} Region`}
              fill
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
              priority={currentIndex === 0}
              placeholder="empty"
              onLoadingComplete={handleImageLoad}
              onLoadStart={handleImageLoadStart}
            />

            {/* Gradient overlay for better text readability */}
          </div>
        </div>

        {/* Region Information - Full Width Below */}
        {!isHome && (
          <div className="w-full max-w-4xl mx-auto space-y-2 p-6">
            {/* <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              {selectedRegion.name}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#90651b] to-[#b8851f] rounded-full"></div>
          </div> */}

            {/* <p className="text-gray-600 text-lg leading-relaxed">
            {selectedRegion.description}
          </p> */}

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-gray-50 to-white px-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-[#90651b]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Contact Information
              </h3>

              <div className="space-y-3">
                <div className="flex items-center group">
                  <span className="text-gray-600 mr-2">Email:</span>
                  <a
                    href={`mailto:${selectedRegion.contact.email}`}
                    className="text-[#90651b] hover:text-[#b8851f] font-medium transition-colors duration-200 underline decoration-2 underline-offset-2 hover:decoration-[#b8851f]"
                  >
                    {selectedRegion.contact.email}
                  </a>
                </div>

                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Phone:</span>
                  <span className="text-gray-800 font-medium">
                    {selectedRegion.contact.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
          </div>
        )}
      </div>
    </div>
  );
}

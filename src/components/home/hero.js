import Image from "next/image";

/**
 * Hero Section Component
 * Features:
 * - Full-screen video background with fallback image
 * - Responsive height (full screen on mobile, 98vh on desktop)
 * - Dark overlay for text readability
 * - Centered content with drop shadows
 */
export default function Hero() {
  return (
    <>
      {/* Hero Section - Full screen on mobile, 98vh on desktop */}
      <div className="relative h-screen md:h-[98vh] overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://cdn.egfmusa.org/images/header-video-example.mp4.mp4"
            type="video/mp4"
          />
          {/* Fallback background image if video doesn't load */}
          <div className="absolute inset-0 bg-[url('/images/hero-bg.svg')] bg-cover bg-center"></div>
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Logo */}

        {/* Centered Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
              EGFM USA
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-light drop-shadow-md">
              Welcome Home
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

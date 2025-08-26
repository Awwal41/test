import Navbar from '@/components/layout/navbar';

export default function VideoHeroSection({ video, fallbackImage, title, subtitle }) {
  return (
    <div className="relative min-h-[60vh] md:min-h-[80vh] bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover hero-video z-0"
        onError={(e) => {
          console.error(`Failed to load video: ${video}`, e);
          e.target.style.display = 'none';
          e.target.parentElement.style.backgroundImage = `url('${fallbackImage}')`;
          e.target.parentElement.style.backgroundColor = '#ccc';
        }}
        onLoadedData={() => console.log(`Video loaded: ${video}`)}
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 z-10" />
      <Navbar />
      <div className="relative max-w-7xl mx-auto px-4 pt-20 md:pt-32 pb-16 md:pb-24 z-20">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-white text-center">
            {title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 text-center">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
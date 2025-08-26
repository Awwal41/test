export default function HeroSection({ video, image, fallbackImage, title, subtitle, textPosition = 'center', height = 'min-h-[60vh] md:min-h-[80vh]', overlayOpacity = 'from-black/20' }) {
  const backgroundStyle = image ? { backgroundImage: `url('${image}')`, backgroundColor: '#ccc' } : 
    fallbackImage ? { backgroundImage: `url('${fallbackImage}')`, backgroundColor: '#ccc' } : {};

  const textAlignment = textPosition === 'bottom-left'
    ? 'absolute bottom-12 left-8 text-left max-w-4xl px-6'
    : 'absolute inset-0 flex items-center justify-center text-center max-w-4xl mx-auto px-4';

  return (
    <section
      className={`relative w-full bg-cover bg-center ${height} bg-scroll md:bg-fixed overflow-hidden hero-image`}
      style={backgroundStyle}
    >
      {video && (
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover hero-video z-0 transform transition-transform duration-1000 hover:scale-110"
          onError={(e) => {
            console.error(`Failed to load video: ${video}`, e);
            e.target.style.display = 'none';
            if (fallbackImage) {
              e.target.parentElement.style.backgroundImage = `url('${fallbackImage}')`;
              e.target.parentElement.style.backgroundColor = '#ccc';
            }
          }}
          onLoadedData={() => console.log(`Video loaded: ${video}`)}
        />
      )}
      <div className={`absolute inset-0 bg-gradient-to-t ${overlayOpacity} to-transparent z-10`}></div>
      <div className={`${textAlignment} animate-fade-in z-20 pt-20 md:pt-32 pb-16 md:pb-24`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-3 drop-shadow-lg uppercase">
          {title}
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-100 drop-shadow-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
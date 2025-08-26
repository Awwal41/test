export default function ImageSection({
  image,
  alt,
  height = "h-96",
  overlayOpacity = "opacity-0",
  content,
  title,
}) {
  return (
    <section
      id="our-story"
      className={`relative w-full bg-cover bg-center h-60 sm:h-80 md:h-96 bg-scroll md:bg-fixed`}
      style={{ backgroundImage: `url('${image}')`, backgroundColor: "#ccc" }}
      aria-label={alt}
    >
      <div className={`absolute inset-0 bg-black ${overlayOpacity}`}></div>
      {content && (
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="max-w-6xl mx-auto px-4 text-center">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
                {title}
              </h2>
            )}
            <p className="text-base md:text-lg text-white">{content}</p>
          </div>
        </div>
      )}
    </section>
  );
}

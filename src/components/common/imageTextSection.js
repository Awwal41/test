export default function ImageTextSection({ title, content, image, imageAlt, imageOnRight }) {
    return (
      <section className={`py-12 sm:py-16 ${imageOnRight ? 'bg-gray-50' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className={`flex flex-col ${imageOnRight ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}>
            <div className="md:w-1/2">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-[300px] object-cover rounded-lg section-image"
                onError={() => console.error(`Failed to load image: ${image}`)}
                onLoad={() => console.log(`Image loaded: ${image}`)}
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
              <p className="text-lg text-gray-700">{content}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
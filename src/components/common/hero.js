import Image from 'next/image';

export default function Hero({ title = 'About EGFM USA', image, logo, height = 'h-[800px]', overlayOpacity = 'opacity-50' }) {
  return (
    <section
      className={`relative w-full bg-cover bg-center ${height} flex items-start justify-center bg-scroll md:bg-fixed`}
      style={{ backgroundImage: `url('${image}')`, backgroundColor: '#ccc' }}
    >
      <div className={`absolute inset-0 bg-black ${overlayOpacity}`}></div>
      <div className="relative text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {logo && (
          <div className="mb-2">
            <Image
              src={logo}
              alt="EGFM USA Logo"
              width={600}
              height={200}
              className="mx-auto"
              onError={() => console.error(`Failed to load ${logo}`)}
            />
          </div>
        )}
        <h1 className="text-5xl md:text-6xl font-bold text-white uppercase">
          {title}
        </h1>
      </div>
    </section>
  );
}
import Link from "next/link";

export default function JoinUs() {
  return (
    <section className="bg-gradient-to-br from-stone-800 to-stone-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6">
            {/* Label */}
            <div className="text-sm font-semibold text-amber-400 tracking-wider uppercase">
              LIVE STREAMING
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Join us online
            </h2>

            {/* Description */}
            <p className="font-serif text-lg text-stone-300 leading-relaxed max-w-md">
              We look forward to having you with us.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/streaming/audio"
                className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 hover:bg-stone-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Listen Live
              </Link>
              <Link
                href="/streaming/video"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white hover:bg-stone-700 font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-stone-600 hover:border-stone-500"
              >
                Watch Live
              </Link>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/meetings/converge.jpg"
                alt="Join us for our conferences"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Optional overlay gradient for better text readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

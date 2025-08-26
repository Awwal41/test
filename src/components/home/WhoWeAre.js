import AboutButton from "../elements/aboutButton";
import RegionsMap from "../about-us/regions";
import { regions } from "@/pages/about-us/regions";

export default function WhoWeAre() {
  return (
    <section className="bg-gray-50 text-gray-900">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto">
        {/* Regions Section */}
        <div className="bg-gray-50 py-16">
          <div className="flex flex-col lg:flex-row items-start gap-12 px-8">
            {/* Text Content - Left Side */}
            <div className="lg:w-1/3 text-left space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight">
                EGFM USA Regions
              </h1>

              <h2 className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed">
                Every believer was created to belong to a community. It was
                never God's heart for us to do this life alone.
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition-colors">
                  Our Regions →
                </button>
              </div>
            </div>

            {/* Map - Right Side */}
            <div className="lg:w-2/3">
              <RegionsMap
                regions={regions}
                color="bg-gray-50"
                customClass="relative z-10"
                padding=""
                isHome
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

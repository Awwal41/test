import React from "react";
import Link from "next/link";
import PrimaryButton from "../elements/primaryButton";

const Fancy = () => {
  return (
    <section className="bg-white py-16 md:py-24 relative overflow-hidden">
      {/* Background pattern */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-black">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left side - Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6">
              <h2 className="text-xs md:text-sm font-semibold text-black uppercase tracking-wider mb-4">
                COMMUNITY
              </h2>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
                EGFM USA is positioned in the body of Christ to supply{" "}
                <span className="block"> </span> of believers.
              </h1>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Link href="/about-us">
                <PrimaryButton customStyle="bg-black text-black border-black hover:bg-gray-100 hover:border-gray-100">
                  Learn More About Us →
                </PrimaryButton>
              </Link>
            </div>
          </div>

          {/* Right side - Circular Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              {/* Main circular image */}
              <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden border-4 border-gray-700/50 shadow-2xl">
                <img
                  src="/images/meeting-highlight-2.1.jpg"
                  alt="Community gathering"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-500 rounded-full opacity-80"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-yellow-500/20 rounded-full"></div>
              <div className="absolute top-1/4 -left-8 w-6 h-6 bg-white/30 rounded-full"></div>
              <div className="absolute bottom-1/3 -right-8 w-4 h-4 bg-yellow-500/60 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Bottom section - Quick links to meeting types */}
      </div>
    </section>
  );
};

export default Fancy;

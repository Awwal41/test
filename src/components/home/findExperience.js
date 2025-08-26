import React from "react";
import Link from "next/link";
import {
  FaChurch,
  FaVideo,
  FaMapMarkerAlt,
  FaBookOpen,
  FaUsers,
  FaHeadphones,
} from "react-icons/fa";

const FindExperience = () => {
  // Experience options based on EGFM USA's main offerings
  const experienceOptions = [
    {
      id: "live-meetings",
      title: "Live Meetings",
      description:
        "Join our weekly meetings like OBED, Daystar Arising, and Rooted for spiritual growth and fellowship.",
      icon: FaChurch,
      link: "/meetings",
      linkText: "Find a meeting",
      isLive: false,
    },
    {
      id: "live-streaming",
      title: "Live Streaming",
      description:
        "Watch our services online with video and audio broadcasts from wherever you are.",
      icon: FaVideo,
      link: "/streaming/video",
      linkText: "Join live stream",
      isLive: true,
    },
    {
      id: "find-region",
      title: "Find Your Region",
      description:
        "Connect with believers in your area across our West, Northeast, Midwest, Midsouth, and South regions.",
      icon: FaMapMarkerAlt,
      link: "/about-us/regions",
      linkText: "Find a region",
      isLive: false,
    },
    {
      id: "resources",
      title: "Spiritual Resources",
      description:
        "Access our audio messages, articles, transcripts, and teaching materials for deeper study.",
      icon: FaBookOpen,
      link: "/resources",
      linkText: "Browse resources",
      isLive: false,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/hero-bg.svg')] bg-cover bg-center opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Find the right experience for you.
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            No matter where you are, online or in person, become a part of all
            God is doing.
          </p>
        </div>

        {/* Experience Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {experienceOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.id}
                className="bg-black rounded-lg p-8 text-left hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Icon with optional live indicator */}
                <div className="relative inline-flex items-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-left">
                    <IconComponent className="text-2xl text-white" />
                  </div>
                  {option.isLive && (
                    <div className="absolute -top-[-0.5px] -left-1 flex items-center">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></span>
                        Live
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-4">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-300 mb-6 leading-relaxed flex-grow">
                  {option.description}
                </p>

                {/* Action Link */}
                <Link
                  href={option.link}
                  className="flex items-center text-sm text-[#90651b] hover:text-[#a67a2a] font-medium transition-colors group mt-auto w-fit"
                >
                  {option.linkText}
                  <svg
                    className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
      </div>
    </section>
  );
};

export default FindExperience;

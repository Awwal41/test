import { useRouter } from "next/router";
import React from "react";

export default function ResourcesSection() {
  const router = useRouter();

  // Data array for the 4 content categories with their respective routes
  const resourceCategories = [
    {
      id: 1,
      title: "Articles",
      path: "/resources/articles",
      icon: (
        <svg
          className="w-16 h-16 mx-auto text-primary group-hover:text-primary/70 transition-colors duration-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Transcripts",
      path: "/resources/transcripts",
      icon: (
        <svg
          className="w-16 h-16 mx-auto text-primary group-hover:text-primary/70 transition-colors duration-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M8,12V14H16V12H8M8,16V18H13V16H8Z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Messages",
      path: "/resources/audio",
      icon: (
        <svg
          className="w-16 h-16 mx-auto text-primary group-hover:text-primary/70 transition-colors duration-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Gallery",
      path: "/resources/gallery",
      icon: (
        <svg
          className="w-16 h-16 mx-auto text-primary group-hover:text-primary/70 transition-colors duration-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
        </svg>
      ),
    },
  ];

  // Handle resource category click
  const handleCategoryClick = (path) => {
    router.push(path);
  };

  return (
    <section className="relative min-h-screen sm:min-h-[50vh] flex items-center justify-center overflow-hidden py-16">
      {/* Fixed Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://cdn.egfmusa.org/images/egfm_bg.png')",
          backgroundAttachment: "fixed",
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
        {/* Title and Subtitle Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            Resources
          </h2>
          <p className="text-base md:text-lg lg:text-xl italic mb-8 text-gray-200 mx-auto">
            Explore our spiritual content to deepen your faith and grow in your
            walk with Christ
          </p>
        </div>

        {/* Content Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 z-10">
          {resourceCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.path)}
              className="group relative bg-white/25 backdrop-blur-md rounded-2xl p-8 hover:bg-white/35 transition-all duration-500 cursor-pointer border border-white/30 shadow-2xl hover:shadow-3xl overflow-hidden"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon container with modern styling */}
                <div className="mb-6 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center group-hover:from-white/30 group-hover:to-white/20 transition-all duration-300">
                    {React.cloneElement(category.icon, {
                      className:
                        "w-10 h-10 text-white group-hover:text-white/90 transition-all duration-300",
                    })}
                  </div>
                </div>

                {/* Title with enhanced typography */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary/90 transition-colors duration-300 tracking-wide">
                  {category.title}
                </h3>

                {/* Subtle bottom accent */}
                <div className="w-12 h-0.5 bg-gradient-to-r from-primary/50 to-transparent mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Hover effect particles */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-4 right-4 w-1 h-1 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

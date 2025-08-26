## about-us/regions.js

```js
import RegionSelector from "../common/regionSelector";
import Section from "../common/section";

const RegionsMap = ({ regions, color, customClass, padding }) => {
  return (
    <div>
      <Section
        padding={padding}
        content={<RegionSelector regions={regions} />}
        bgColor={color}
        textAlign="text-center"
        customClass={customClass}
      />
    </div>
  );
};

export default RegionsMap;

```

## common/section.js

```js
export default function Section({
  id,
  title,
  content,
  bgColor = "bg-white",
  textAlign = "text-left",
  customClass = "",
  padding = "py-10 md:py-16",
}) {
  return (
    <section id={id} className={` ${bgColor} ${padding}`}>
      <div
        className={`container mx-auto ${
          customClass.includes("px-0") ? "" : "px-4 sm:px-6 lg:px-8"
        } max-w-7xl ${customClass}`}
      >
        {title && (
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight capitalize ${textAlign}`}
          >
            {title}
          </h2>
        )}
        {typeof content === "string" ? (
          <p className={`text-base md:text-lg text-gray-600 ${textAlign}`}>
            {content}
          </p>
        ) : (
          <div className={textAlign}>{content}</div>
        )}
      </div>
    </section>
  );
}
```

## common/quoteSection.js

```js
export default function QuoteSection({ quote }) {
    return (
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-2xl sm:text-3xl font-bold text-gray-800 italic">
            {quote}
          </p>
        </div>
      </section>
    );
  }
```

## common/regionMap.js

```js
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import PrimaryButton from "@/components/elements/primaryButton";

export default function RegionMap({
  regions,
  mapHeight = "400px",
  buttonText = "Learn More",
  buttonLink = "/about-us",
}) {
  const [selectedRegion, setSelectedRegion] = useState(null);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3">
        <ul className="space-y-4">
          {regions.map((region, index) => (
            <li key={index}>
              <button
                onClick={() => setSelectedRegion(region)}
                className={`text-lg text-gray-700 hover:text-[#90651b] ${
                  selectedRegion?.name === region.name ? "font-bold" : ""
                }`}
              >
                {region.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:w-2/3">
        <div
          className="w-full rounded-lg overflow-hidden"
          style={{ height: mapHeight }}
        >
          <MapContainer
            center={[39.8283, -98.5795]} // Geographic center of USA
            zoom={4}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {regions.map((region, index) => (
              <Marker
                key={index}
                position={region.center}
                eventHandlers={{
                  click: () => setSelectedRegion(region),
                }}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">{region.name}</h3>
                    <p>{region.description}</p>
                    <p>
                      Email:{" "}
                      <a href={`mailto:${region.contact.email}`}>
                        {region.contact.email}
                      </a>
                    </p>
                    <p>Phone: {region.contact.phone}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
            {selectedRegion && (
              <Polygon
                positions={regions
                  .find((r) => r.name === selectedRegion.name)
                  .center.map((coord) => [coord, coord + 0.5])} // Simplified highlight
                pathOptions={{ color: "#90651b", fillOpacity: 0.3 }}
              />
            )}
          </MapContainer>
        </div>
        {selectedRegion && (
          <div className="mt-1">
            <h3 className="text-xl font-bold text-gray-700">
              {selectedRegion.name}
            </h3>
            <p className="text-sm md:text-base text-gray-700 mb-2">
              {selectedRegion.description}
            </p>
            <p className="text-sm md:text-base text-gray-700">
              Email:{" "}
              <a
                href={`mailto:${selectedRegion.contact.email}`}
                className="underline"
              >
                {selectedRegion.contact.email}
              </a>
            </p>
            <p className="text-sm md:text-base text-gray-700 mb-2">
              Phone: {selectedRegion.contact.phone}
            </p>
            <Link href={buttonLink}>
              <PrimaryButton customStyle="bg-[#90651b] hover:bg-[#a67a2a] px-6 py-2 text-base">
                {buttonText}
              </PrimaryButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
```

## common/meetingTabs.js

```js
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MeetingCard = ({ meeting, index }) => (
  <div className="w-full md:w-[calc(50%-1rem)] group mb-8">
    <Link href={meeting.path}>
      <div
        className="relative w-full h-[350px] overflow-hidden p-1 transition-all duration-300 rounded-t-lg"
      >
        <Image
          src={meeting.image}
          alt={`${meeting.name} Image`}
          fill
          className="object-cover meeting-image transition-transform duration-300 group-hover:scale-105"
          placeholder="empty"
          priority={index === 0}
        />
      </div>
    </Link>
    {/* Summary Section */}
    <div className="bg-gray-50 p-6 shadow-lg rounded-b-lg border border-gray-200">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{meeting.name}</h3>
        <p className="text-lg text-[#90651b] font-semibold">{meeting.schedule}</p>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">
        {meeting.description}
      </p>
      <Link 
        href={meeting.path}
        className="inline-block bg-[#90651b] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#7a5518] hover:scale-105 hover:shadow-lg transition-all duration-300 transform"
      >
        Learn More
      </Link>
    </div>
  </div>
);

export default function MeetingTabs({ meetings }) {
  const [activeTab, setActiveTab] = useState('weekly');

  const weeklyMeetings = meetings.filter((m) => m.category === 'weekly');
  const yearlyMeetings = meetings.filter((m) => m.category === 'yearly');

  const handleHover = (meetingName, isEntering) => {
    console.log(`${isEntering ? 'Enter' : 'Leave'} hover on ${meetingName}`);
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex justify-center gap-8 py-8 bg-white">
        <button
          type="button"
          onClick={() => setActiveTab('weekly')}
          className={`text-lg font-semibold uppercase tracking-wide transition-colors duration-300 ${
            activeTab === 'weekly' ? 'text-[#90651b] border-b-2 border-[#90651b]' : 'text-gray-900 hover:text-[#90651b]'
          }`}
        >
          Weekly Meetings
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('yearly')}
          className={`text-lg font-semibold uppercase tracking-wide transition-colors duration-300 ${
            activeTab === 'yearly' ? 'text-[#90651b] border-b-2 border-[#90651b]' : 'text-gray-900 hover:text-[#90651b]'
          }`}
        >
          Yearly Meetings
        </button>
      </div>
      {/* Content */}
      <div className="w-full px-4 md:px-8 lg:px-12">
        {activeTab === 'weekly' && (
          <div className="flex flex-col md:flex-row md:gap-8 justify-center">
            {weeklyMeetings.map((meeting, index) => (
              <MeetingCard key={index} meeting={meeting} index={index} />
            ))}
          </div>
        )}
        {activeTab === 'yearly' && (
          <div className="flex flex-col md:flex-row md:flex-wrap md:gap-8 justify-center">
            {yearlyMeetings.map((meeting, index) => (
              <MeetingCard key={index} meeting={meeting} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

## common/pastorTile.js

```js
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function PastorTile({
  name,
  role,
  image,
  description,
  profilePath,
}) {
  return (
    <div className="group flex flex-col items-center text-center p-6 rounded-xl bg-white backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full justify-between">
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48 mb-4 overflow-hidden rounded-full">
          <Image
            src={image}
            alt={name}
            fill
            className="rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => console.error(`Failed to load ${image}`)}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-full" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#90651b] transition-colors duration-300">
          {name}
        </h3>
        <p className="text-lg text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
          {role}
        </p>
        <p className="text-sm text-gray-700 mt-2 mb-4 group-hover:text-gray-900 transition-colors duration-300">
          {description}
        </p>
      </div>
      <Link
        href={profilePath}
        className="inline-flex items-center text-[#90651b] hover:text-[#a67a2a] transition-colors group/link"
      >
        <span className="text-sm font-medium">Learn More</span>
        <ArrowRightIcon className="ml-1 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
```

## common/imageSection.js

```js
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
```

## common/imageTextSection.js

```js
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
```

## common/autoImageSlider.js

```js
import { useState, useEffect } from 'react';

/**
 * AutoImageSlider - Creates a smooth infinite horizontal image carousel
 * 
 * This component implements a single-direction sliding effect where:
 * - 1 image visible on mobile, 3 images on desktop
 * - Images slide continuously from right to left
 * - Creates an infinite loop by duplicating the first few images at the end
 * - No visual jumps or resets when reaching the end
 * 
 * @param {string[]} images - Array of image URLs to display
 * @param {number} interval - Time between slides in milliseconds (default: 3000)
 * @param {string} height - CSS height class for the slider (default: 'h-96')
 * @param {string} overlayOpacity - Overlay opacity class (unused after overlay removal)
 */
export default function AutoImageSlider({ images, interval = 3000, height = 'h-96', overlayOpacity = 'opacity-30' }) {
  // Tracks which set of images is currently being displayed
  // Each increment moves the viewport by 1 image width
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Number of images visible at once (1 on mobile, 3 on desktop)
  const imagesPerView = 3;

  // Auto-advance the slider at the specified interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);



  // Create a dynamic circular array that continuously extends
  // Original: [A, B, C, D, E] 
  // Dynamic: [A, B, C, D, E, A, B, C, D, E, A, B, C, D, E, ...] (continuously extends)
  // This ensures we never run out of images as the index grows
  const getExtendedImages = () => {
    const repeats = Math.ceil((currentIndex + 10) / images.length); // Always have 10 extra cycles
    return Array(repeats).fill(images).flat();
  };
  const allImages = getExtendedImages();
  

  
  // Calculate the horizontal position of the viewport
  // Mobile: Each index moves the viewport left by 100% (full width)
  // Desktop: Each index moves the viewport left by 33.33% (1/3 of container width)
  // Negative values move left, positive values move right
  // The extended array ensures smooth circular transitions
  const mobileTransform = -(currentIndex * 100);
  const desktopTransform = -(currentIndex * (100 / 3));
  

  


  return (
    <section className={`relative w-full overflow-hidden ${height}`}>
      <style jsx>{`
        @media (min-width: 768px) {
          .slider-container {
            transform: translateX(${desktopTransform}%) !important;
          }
        }
      `}</style>
      {/* 
        Main sliding container - holds all images in a horizontal line
        Uses CSS transform to move the entire line left/right
        transition-transform creates smooth animation between positions
        Mobile: Shows 1 image at a time (w-full)
        Desktop: Shows 3 images at a time (w-1/3)
      */}
      <div 
        className="flex h-full transition-transform duration-300 ease-in-out slider-container"
        style={{ 
          // Mobile: Move by full width, Desktop: Move by 1/3 width
          transform: `translateX(${mobileTransform}%)`,
        }}
      >
        {/* 
          Render all images in a continuous horizontal line
          Mobile: Each image takes full width (w-full)
          Desktop: Each image takes 1/3 width (w-1/3)
          flex-shrink-0 prevents images from shrinking
          Only 1 image visible on mobile, 3 on desktop due to overflow-hidden
        */}
        {allImages.map((image, index) => (
          <div
            key={`image-${index}`}
            className="relative h-full flex-shrink-0 w-full md:w-1/3"
            style={{ 
              backgroundImage: `url('${image}')`,
              backgroundSize: 'cover',    // Scale image to cover entire container
              backgroundPosition: 'center', // Center the image
              backgroundColor: '#ccc'      // Fallback color while image loads
            }}
          >
          </div>
        ))}
      </div>
    </section>
  );
} 
```

## common/heroSection.js

```js
import Navbar from '@/components/layout/navbar';

export default function HeroSection({ image, title, subtitle }) {
  return (
    <div className="relative min-h-[60vh] md:min-h-[80vh] bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover hero-image z-0"
        onError={() => console.error(`Failed to load hero image: ${image}`)}
        onLoad={() => console.log(`Hero image loaded: ${image}`)}
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
```

## common/BeliefCard.js

```js
import Image from "next/image";

export default function BeliefCard({ belief, index }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-40 w-full">
        <Image
          src={belief.image}
          alt={belief.title}
          fill
          className="object-cover"
          placeholder="empty"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{belief.title}</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {belief.description}
        </p>
      </div>
    </div>
  );
}
```

## common/SecondaryNav.js

```js
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function SecondaryNav() {
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    { id: 'our-heart', label: 'Our Heart' },
    { id: 'what-we-believe', label: 'What We Believe' },
    { id: 'our-leadership', label: 'Our Leadership' },
    { id: 'our-story', label: 'Our Story' },
    { id: 'our-tools', label: 'Our Tools' },
    { id: 'global-reach', label: 'Global Reach' },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Set initial active section based on scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for navbar
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    // Call once on mount
    handleScroll();
    
    // Add scroll listener for better accuracy
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Cleanup: unobserve all sections and remove scroll listener
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 140; // Height of both navbars
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-[64px] md:top-[80px] z-40 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 py-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`whitespace-nowrap text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'text-[#90651b] border-b-2 border-[#90651b]'
                  : 'text-gray-600 hover:text-[#90651b]'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden relative">
          <div className="flex items-center justify-between py-4">
            <span className="text-sm font-medium text-gray-600">
              {sections.find(s => s.id === activeSection)?.label || 'Menu'}
            </span>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-[#90651b] transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="absolute right-0 left-0 bg-white shadow-lg border-t">
              <div className="px-4 py-2 space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                      activeSection === section.id
                        ? 'bg-[#90651b] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 
```

## common/meetingCarousel.js

```js
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function MeetingCarousel({ meetings }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full">
      {/* Secondary Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {meetings.map((meeting, index) => (
          <Link
            key={index}
            href={meeting.path}
            className={`text-lg font-medium text-gray-900 hover:text-[#90651b] px-4 py-2 transition-colors ${
              activeIndex === index ? 'border-b-2 border-[#90651b] font-bold' : ''
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {meeting.name}
          </Link>
        ))}
      </div>
      {/* Carousel */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        spaceBetween={0}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
        }}
        className="w-full"
      >
        {meetings.map((meeting, index) => (
          <SwiperSlide key={index}>
            <Link href={meeting.path}>
              <div className="relative w-full h-[600px] overflow-hidden">
                <Image
                  src={meeting.image}
                  alt={`${meeting.name} Image`}
                  layout="fill"
                  objectFit="cover"
                  className="brightness-90 hover:brightness-100 transition"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                  <h3 className="text-2xl font-bold text-white">{meeting.name}</h3>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
```

## common/hero.js

```js
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
```

## common/imageCarousel.js

```js
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ImageCarousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Cycle every 4 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[500px] m-0 p-0">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            currentImageIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image.image}
            alt={`${image.name} Image`}
            layout="fill"
            objectFit="cover"
            className="brightness-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-3xl font-bold text-white">{image.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
```

## common/WatermarkBackground.js

```js
import React from 'react';

export default function WatermarkBackground({ 
  imageUrl = "/images/logo.png",
  size = "90%",
  opacity = 0.05,
  scale = 1.5
}) {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `url("${imageUrl}")`,
        backgroundSize: size,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: opacity,
        transform: `scale(${scale})`
      }}
    />
  );
} 
```

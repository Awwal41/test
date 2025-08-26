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
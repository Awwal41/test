import Head from 'next/head';
import HeroSection from '@/components/common/heroSection';
import Section from '@/components/common/section';
import ImageTextSection from '@/components/common/imageTextSection';
import PrimaryButton from '@/components/elements/primaryButton';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { FaMapMarkerAlt, FaCalendarAlt, FaRegLightbulb } from 'react-icons/fa';
import ImageCarousel from '@/components/common/imageCarousel';

export default function LightUpAmerica() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Light Up America | EGFM USA</title>
        <meta
          name="description"
          content="Join Light Up America, a transformative meeting of EGFM USA, igniting faith across communities."
        />
        <meta property="og:title" content="Light Up America | EGFM USA" />
        <meta
          property="og:description"
          content="Join Light Up America, igniting faith across communities."
        />
      </Head>
      <Navbar />
      <main className="flex-grow">
        <HeroSection
          video="/videos/LUA-Montage.mp4"
          fallbackImage="/images/meeting-highlight-2.1.jpg"
          title="Light Up America"
          subtitle="Igniting Faith Across the Nation"
        />
        <section className="max-w-7xl mx-auto px-4 pb-16 mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start relative">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col gap-6 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Overview</h2>
            <p className="text-lg text-gray-700 mb-4">
              The Father’s utmost desire is to raise many sons after the pattern of His Only Begotten Son, Jesus Christ; who remains the full embodiment of all that God is, having fulfilled His entire counsel for man. All that the Father accomplished in the Son, He wants to replicate in us, and the key to this remains the revelation of the path that the LORD took, which will see us arrive where He did. 
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <FaRegLightbulb className="text-amber-500 text-2xl" />
                <span className="font-semibold text-gray-800">What to Expect:</span>
              </div>
              <ul className="list-disc list-inside text-gray-600 col-span-1 sm:col-span-2 ml-8">
                <li>Powerful revelations</li>
                <li>Spiritual awakening</li>
                <li>Unity in worship</li>
              </ul>
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-amber-500 text-2xl" />
                <span className="font-semibold text-gray-800">Service Times:</span>
              </div>
              <div className="text-gray-700">Summer 2025</div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-amber-500 text-2xl" />
                <span className="font-semibold text-gray-800">Location:</span>
              </div>
              <div className="text-gray-700">To be announced</div>
            </div>
          </div>
          <div className="relative mt-12 md:mt-32">
            <ImageCarousel
              images={[
                { image: '/images/meeting-highlight-2.1.jpg', name: 'LUA Worship' },
                { image: '/images/region-southeast.jpg', name: 'Teaching Session' },
                { image: '/images/regions-static.jpg', name: 'Community Gathering' },
                { image: '/images/meeting-highlight-2.jpg', name: 'All at LUA!' },
              ]}
            />
          </div>
        </section>
        <section className="py-16 bg-gradient-to-r from-[#f7f3ea] to-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Connect Online</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 border-b-4 border-[#90651b]">
                <div className="bg-[#f7e6c4] rounded-full p-4 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-8 h-8 text-[#90651b]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19V6h13M9 6l-7 7 7 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Listen Live</h3>
                <p className="text-gray-600 mb-4">Join our live audio stream and be part of the experience from anywhere.</p>
                <Link
                  href="/streaming/audio"
                  className="inline-block bg-[#90651b] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#a67a2a] transition-all duration-300"
                >
                  Listen Live
                </Link>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 border-b-4 border-[#90651b]">
                <div className="bg-[#f7e6c4] rounded-full p-4 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-8 h-8 text-[#90651b]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Watch Live</h3>
                <p className="text-gray-600 mb-4">Watch the event as it happens with our high-quality video stream.</p>
                <Link
                  href="/streaming/video"
                  className="inline-block bg-[#90651b] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#a67a2a] transition-all duration-300"
                >
                  Watch Live
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-gradient-to-br from-gray-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Watch Past Sessions on YouTube</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 group"
                >
                  <div className="relative w-full h-40 mb-4">
                    <img
                      src="/images/regions-static.jpg"
                      alt="YouTube Video Placeholder"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <a
                      href="https://www.youtube.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-2 right-2 bg-red-600 text-white rounded-full p-3 shadow-lg group-hover:bg-red-700 transition-all"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                      >
                        <path d="M10 15l5.19-3L10 9v6zm12-3c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-6z" />
                      </svg>
                    </a>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">YouTube Session {i}</h4>
                  <p className="text-gray-500 text-sm mb-2">Speaker Name</p>
                  <span className="text-xs text-gray-400">Summer 2022</span>
                </div>
              ))}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center mt-16">Listen to Old Messages</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 group"
                >
                  <div className="relative w-full h-40 mb-4">
                    <img
                      src="/images/regions-static.jpg"
                      alt="Audio Message Placeholder"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <button className="absolute bottom-2 right-2 bg-[#90651b] text-white rounded-full p-3 shadow-lg group-hover:bg-[#a67a2a] transition-all">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-6.518-3.89A1 1 0 007 8.618v6.764a1 1 0 001.234.97l6.518-1.878A1 1 0 0016 13.382V10.618a1 1 0 00-1.248-.95z"
                        />
                      </svg>
                    </button>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Message Title {i}</h4>
                  <p className="text-gray-500 text-sm mb-2">Speaker Name</p>
                  <span className="text-xs text-gray-400">Summer 2022</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
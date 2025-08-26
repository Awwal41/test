import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import Section from '@/components/common/section';
import { FaHeadphones, FaFileAlt, FaNewspaper, FaImages, FaArrowRight, FaPlay, FaDownload, FaEye, FaCalendarAlt } from 'react-icons/fa';

const resourceTypes = [
  {
    title: "Audio Messages",
    description: "Listen to inspiring messages from our ministers and speakers. Experience the Word of God through transformative teachings.",
    icon: FaHeadphones,
    path: "/resources/audio",
    count: "100+ Messages",
    iconBg: "bg-gray-600",
    actionIcon: FaPlay,
    borderColor: "border-gray-200",
    hoverBorder: "hover:border-gray-400",
    accentColor: "bg-gray-600"
  },
  {
    title: "Transcripts",
    description: "Read and download message transcripts for deeper study. Perfect for personal reflection and group discussions.",
    icon: FaFileAlt,
    path: "/resources/transcripts",
    count: "50+ Documents",
    iconBg: "bg-gray-600",
    actionIcon: FaDownload,
    borderColor: "border-gray-200",
    hoverBorder: "hover:border-gray-400",
    accentColor: "bg-gray-600"
  },
  {
    title: "Articles",
    description: "Explore spiritual articles and teachings from our ministers. Deepen your understanding of biblical truths.",
    icon: FaNewspaper,
    path: "/resources/articles",
    count: "30+ Articles",
    iconBg: "bg-gray-600",
    actionIcon: FaEye,
    borderColor: "border-gray-200",
    hoverBorder: "hover:border-gray-400",
    accentColor: "bg-gray-600"
  },
  {
    title: "Photo Gallery",
    description: "Browse photos from our events, conferences, and services. Witness the joy and fellowship of our community.",
    icon: FaImages,
    path: "/resources/gallery",
    count: "200+ Photos",
    iconBg: "bg-gray-600",
    actionIcon: FaEye,
    borderColor: "border-gray-200",
    hoverBorder: "hover:border-gray-400",
    accentColor: "bg-gray-600"
  }
];

const featuredResources = [
  {
    title: "Latest Message",
    subtitle: "The Power of Faith",
    speaker: "Rev. Kayode Oyegoke",
    type: "Audio Message",
    duration: "2:45:30",
    date: "Nov 10, 2024",
    path: "/resources/audio",
    image: "/images/rev-kayode-oyegoke.jpg",
    description: "A powerful message about walking in the light of God's presence and truth."
  },
  {
    title: "Popular Article",
    subtitle: "Understanding the Doctrine of Christ",
    speaker: "Rev. Helen Oyegoke",
    type: "Article",
    readTime: "15 min read",
    date: "Nov 8, 2024",
    path: "/resources/articles",
    image: "/images/rev-helen-oyegoke.jpg",
    description: "Deep insights into the foundational teachings of Christ and their application in our daily lives."
  },
  {
    title: "Recent Event",
    subtitle: "Conference 2024 Highlights",
    speaker: "EGFM USA Team",
    type: "Photo Gallery",
    count: "50+ Photos",
    date: "Oct 25, 2024",
    path: "/resources/gallery",
    image: "/images/event-placeholder.jpg",
    description: "Capturing the memorable moments from our annual conference and fellowship."
  }
];

export default function Resources() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Resources | EGFM USA</title>
        <meta
          name="description"
          content="Access EGFM USA's comprehensive collection of spiritual resources including audio messages, transcripts, articles, and photo gallery to help you grow in faith."
        />
        <meta property="og:title" content="Resources | EGFM USA" />
        <meta property="og:description" content="Explore our spiritual resources for growth in faith" />
      </Head>
      <Navbar />
      
      {/* Hero Section with Video */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40"
            poster="/images/resources-hero.jpg"
          >
            <source src="https://cdn.egfmusa.org/images/header-video-example.mp4.mp4" type="video/mp4" />
            {/* Fallback image if video doesn't load */}
            <Image
              src="/images/resources-hero.jpg"
              alt="EGFM USA Resources"
              fill
              className="object-cover opacity-30"
              priority
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#90651b] rounded-full p-4">
                  <FaHeadphones className="text-3xl text-white" />
                </div>
                <div className="h-px bg-[#90651b] flex-grow"></div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Spiritual Resources
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Discover a treasure trove of spiritual content designed to nurture your faith journey. 
                From inspiring audio messages to insightful articles, find everything you need to grow closer to God.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link
                  href="#resources"
                  className="group bg-[#90651b] hover:bg-[#7a5518] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <span className="flex items-center justify-center gap-3">
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    Explore Resources
                  </span>
                </Link>
                
                <Link
                  href="/resources/audio"
                  className="group bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 backdrop-blur-sm"
                >
                  <span className="flex items-center justify-center gap-3">
                    <FaPlay className="group-hover:scale-110 transition-transform" />
                    Start Listening
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Content - Resource Preview */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">What You'll Find</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="bg-[#90651b] rounded-lg p-2">
                      <FaHeadphones className="text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold">Audio Messages</p>
                      <p className="text-sm text-white/70">100+ inspiring sermons and teachings</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="bg-gray-600 rounded-lg p-2">
                      <FaFileAlt className="text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold">Transcripts</p>
                      <p className="text-sm text-white/70">50+ downloadable documents</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="bg-gray-600 rounded-lg p-2">
                      <FaNewspaper className="text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold">Articles</p>
                      <p className="text-sm text-white/70">30+ spiritual insights and teachings</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="bg-gray-600 rounded-lg p-2">
                      <FaImages className="text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold">Photo Gallery</p>
                      <p className="text-sm text-white/70">200+ photos from events and services</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow">
        {/* Main Resources Section */}
        <section id="resources" className="py-16 sm:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Resource Collection
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose from our carefully curated collection of spiritual resources, each designed to support different aspects of your faith journey.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {resourceTypes.map((resource, index) => (
                <Link
                  key={resource.title}
                  href={resource.path}
                  className="group block h-full"
                >
                  <div className={`bg-white border-2 ${resource.borderColor} ${resource.hoverBorder} rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] overflow-hidden h-full flex flex-col`}>
                    <div className="p-8 flex-grow flex flex-col">
                      <div className="flex items-start space-x-6 flex-grow">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                          <div className={`${resource.iconBg} rounded-xl p-4 group-hover:scale-105 transition-transform duration-300 shadow-sm`}>
                            <resource.icon className="h-7 w-7 text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-grow flex flex-col">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#90651b] transition-colors">
                              {resource.title}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-400 group-hover:text-[#90651b] transition-colors">
                              <resource.actionIcon className="text-base" />
                              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-6 leading-relaxed text-sm flex-grow">
                            {resource.description}
                          </p>
                          
                          <div className="flex items-center justify-between mt-auto">
                            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                              {resource.count}
                            </span>
                            <span className="text-[#90651b] font-medium text-sm group-hover:underline">
                              Explore Now
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Subtle bottom accent */}
                    <div className={`h-1 ${resource.accentColor} group-hover:h-1.5 transition-all duration-300`}></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Resources Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Resources
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hand-picked content to get you started on your spiritual journey. These resources represent the best of what we have to offer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredResources.map((resource, index) => (
                <Link
                  key={resource.title}
                  href={resource.path}
                  className="group block"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-100">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={resource.image}
                        alt={resource.subtitle}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                      
                      {/* Type Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#90651b] text-white px-3 py-1 rounded-full text-sm font-medium">
                          {resource.type}
                        </span>
                      </div>

                      {/* Play/Action Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 rounded-full p-4 group-hover:bg-[#90651b] group-hover:text-white transition-all duration-300 shadow-lg">
                          <FaPlay className="text-xl ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <FaCalendarAlt className="text-[#90651b]" />
                        <span>{resource.date}</span>
                        {resource.duration && (
                          <>
                            <span>•</span>
                            <span>{resource.duration}</span>
                          </>
                        )}
                        {resource.readTime && (
                          <>
                            <span>•</span>
                            <span>{resource.readTime}</span>
                          </>
                        )}
                        {resource.count && (
                          <>
                            <span>•</span>
                            <span>{resource.count}</span>
                          </>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#90651b] transition-colors">
                        {resource.subtitle}
                      </h3>
                      
                      <p className="text-gray-600 mb-3 text-sm">
                        by {resource.speaker}
                      </p>
                      
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        {resource.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-[#90651b] font-semibold text-sm group-hover:underline">
                          {resource.type === 'Audio Message' ? 'Listen Now' : 
                           resource.type === 'Article' ? 'Read More' : 'View Gallery'}
                        </span>
                        <FaArrowRight className="text-[#90651b] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-r from-[#90651b] to-[#7a5518]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
            <div className="text-white space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Join thousands of believers who have found spiritual growth through our resources. 
                Start exploring today and discover the transformative power of God's Word.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link
                  href="/resources/audio"
                  className="group bg-white text-[#90651b] px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <span className="flex items-center justify-center gap-3">
                    <FaHeadphones className="group-hover:scale-110 transition-transform" />
                    Start with Audio Messages
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#90651b] px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-3">
                    Get in Touch
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

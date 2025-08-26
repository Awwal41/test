import Head from 'next/head';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { FaFileAlt, FaDownload, FaEye, FaSearch, FaCalendarAlt, FaClock, FaUser, FaChevronUp, FaFilePdf } from 'react-icons/fa';
import Image from 'next/image';
import { useTranscripts } from '@/hooks/useResourceData';

/**
 * World-Class Transcripts Page
 * Features:
 * - Hero section with featured transcript
 * - Advanced search and filtering
 * - Speaker images and rich metadata
 * - PDF preview and download functionality
 * - Responsive grid layout with hover effects
 * - Reading time estimates
 * - Category-based organization
 * 
 * Expected JSON Structure from Backend:
 * {
 *   "id": 1,
 *   "title": "Message Title",
 *   "speaker": "Speaker Name",
 *   "date": "2024-03-15",
 *   "pages": 12,
 *   "readingTime": "15 min read",
 *   "category": "Category Name",
 *   "description": "Brief description of the transcript content",
 *   "speakerImage": "/path/to/speaker/image.jpg",
 *   "downloadUrl": "/transcripts/file.pdf",
 *   "previewUrl": "/transcripts/preview/file.pdf"
 * }
 */

// Speaker image mapping (fallback for local images)
const localSpeakerImages = {
  "Rev. Kayode Oyegoke": "/images/rev-kayode-oyegoke.jpg",
  "Rev. Helen Oyegoke": "/images/rev-helen-oyegoke.jpg",
  "Pastor Tayo Fasan": "/images/pastor-tayo-fasan.jpg"
};

// Function to get speaker image with priority: JSON data > local mapping > placeholder
function getSpeakerImage(transcript) {
  if (transcript.speakerImage) {
    return transcript.speakerImage;
  }
  if (localSpeakerImages[transcript.speaker]) {
    return localSpeakerImages[transcript.speaker];
  }
  return "/images/event-placeholder.jpg";
}

// Enhanced sample data with more realistic content
const fallbackTranscripts = [
  {
    id: 1,
    title: "The Power of Faith in Uncertain Times",
    speaker: "Rev. Kayode Oyegoke",
    date: "2024-03-15",
    pages: 12,
    readingTime: "15 min read",
    category: "Faith & Trust",
    description: "A powerful exploration of how faith sustains us through life's challenges and uncertainties.",
    speakerImage: "/images/rev-kayode-oyegoke.jpg",
    downloadUrl: "/transcripts/power-of-faith.pdf",
    previewUrl: "/transcripts/preview/power-of-faith.pdf"
  },
  {
    id: 2,
    title: "Walking in Divine Love",
    speaker: "Rev. Helen Oyegoke",
    date: "2024-03-10",
    pages: 8,
    readingTime: "10 min read",
    category: "Love & Relationships",
    description: "Understanding how to manifest God's love in our daily relationships and interactions.",
    speakerImage: "/images/rev-helen-oyegoke.jpg",
    downloadUrl: "/transcripts/walking-in-love.pdf",
    previewUrl: "/transcripts/preview/walking-in-love.pdf"
  },
  {
    id: 3,
    title: "Understanding Grace and Mercy",
    speaker: "Pastor Tayo Fasan",
    date: "2024-03-05",
    pages: 15,
    readingTime: "20 min read",
    category: "Grace & Mercy",
    description: "A deep dive into the transformative power of God's grace and mercy in our lives.",
    speakerImage: "/images/pastor-tayo-fasan.jpg",
    downloadUrl: "/transcripts/understanding-grace.pdf",
    previewUrl: "/transcripts/preview/understanding-grace.pdf"
  },
  {
    id: 4,
    title: "The Journey of Spiritual Growth",
    speaker: "Rev. Kayode Oyegoke",
    date: "2024-02-28",
    pages: 18,
    readingTime: "25 min read",
    category: "Spiritual Growth",
    description: "Exploring the stages and milestones of our spiritual development and maturity.",
    speakerImage: "/images/rev-kayode-oyegoke.jpg",
    downloadUrl: "/transcripts/spiritual-growth.pdf",
    previewUrl: "/transcripts/preview/spiritual-growth.pdf"
  },
  {
    id: 5,
    title: "Prayer and Communion with God",
    speaker: "Rev. Helen Oyegoke",
    date: "2024-02-20",
    pages: 10,
    readingTime: "12 min read",
    category: "Prayer & Worship",
    description: "Learning to develop a deeper, more meaningful prayer life and communion with the Divine.",
    speakerImage: "/images/rev-helen-oyegoke.jpg",
    downloadUrl: "/transcripts/prayer-communion.pdf",
    previewUrl: "/transcripts/preview/prayer-communion.pdf"
  },
  {
    id: 6,
    title: "Living with Purpose and Destiny",
    speaker: "Pastor Tayo Fasan",
    date: "2024-02-15",
    pages: 14,
    readingTime: "18 min read",
    category: "Purpose & Destiny",
    description: "Discovering and walking in your God-given purpose and divine destiny.",
    speakerImage: "/images/pastor-tayo-fasan.jpg",
    downloadUrl: "/transcripts/purpose-destiny.pdf",
    previewUrl: "/transcripts/preview/purpose-destiny.pdf"
  }
];

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function Transcripts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Use the custom hook for data fetching
  const {
    data: transcripts,
    loading,
    error,
    metadata,
    search,
    filter,
    refresh
  } = useTranscripts({
    fallbackData: fallbackTranscripts,
    onError: (err) => console.error('Transcripts fetch error:', err),
    onSuccess: (data, meta) => console.log(`Loaded ${data.length} transcripts`, meta)
  });

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        search(searchTerm, { category: selectedCategory !== 'All' ? selectedCategory : undefined });
      } else if (selectedCategory !== 'All') {
        filter({ category: selectedCategory });
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory, search, filter]);

  // Handle scroll for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(transcripts.map(t => t.category)))
  ];

  // Get latest transcript for hero section and recent transcripts
  const sortedTranscripts = transcripts.sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestTranscript = sortedTranscripts[0];
  const recentTranscripts = sortedTranscripts.slice(1, 4);

  const filteredTranscripts = transcripts
    .filter((transcript) => selectedCategory === "All" || transcript.category === selectedCategory)
    .filter((transcript) =>
      searchTerm === "" ||
      transcript.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transcript.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transcript.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Message Transcripts | EGFM USA</title>
        <meta
          name="description"
          content="Read and download transcripts of powerful messages from EGFM USA's ministers and speakers. Access written versions of sermons for study and reflection."
        />
      </Head>
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Hero Section with Latest Transcript */}
        {latestTranscript && (
          <div className="relative bg-black overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            {/* Hero Content */}
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 lg:py-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="text-white space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FaFileAlt className="text-4xl text-yellow-500" />
                    <span className="text-yellow-500 text-lg font-medium">Latest Transcript</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    {latestTranscript.title}
                  </h1>

                  <div className="flex items-center gap-2 text-xl">
                    <FaUser className="text-yellow-500" />
                    <span className="font-medium text-gray-200">by</span>
                    <span className="font-bold text-white">{latestTranscript.speaker}</span>
                  </div>

                  {latestTranscript.description && (
                    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                      {latestTranscript.description}
                    </p>
                  )}

                  <div className="flex items-center gap-6 text-yellow-200">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt />
                      <span>{formatDate(latestTranscript.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock />
                      <span>{latestTranscript.readingTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaFileAlt />
                      <span>{latestTranscript.pages} pages</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <a
                      href={latestTranscript.downloadUrl}
                      className="group bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex items-center justify-center gap-3">
                        <FaDownload className="group-hover:scale-110 transition-transform" />
                        Download PDF
                      </span>
                    </a>

                    {latestTranscript.previewUrl && (
                      <a
                        href={latestTranscript.previewUrl}
                        className="group bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 backdrop-blur-sm text-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="flex items-center justify-center gap-3">
                          <FaEye className="group-hover:scale-110 transition-transform" />
                          Preview
                        </span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Content - Speaker Image */}
                <div className="relative">
                  <div className="relative w-full max-w-md mx-auto">
                    {/* Decorative Elements */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-3xl blur-xl"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500/30 to-yellow-600/30 rounded-2xl blur-lg"></div>

                    {/* Main Image */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={getSpeakerImage(latestTranscript)}
                        alt={latestTranscript.speaker}
                        fill
                        className="object-cover"
                        priority
                      />

                      {/* PDF Icon Overlay */}
                      <div className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full shadow-lg">
                        <FaFilePdf className="text-xl" />
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-6 py-2 rounded-full font-bold shadow-lg">
                      {latestTranscript.category}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading transcripts...</p>
              </div>
            ) : (
              <>
                {/* Recent Transcripts Section */}
                {recentTranscripts.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">More Recent Transcripts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {recentTranscripts.map((transcript) => (
                        <div
                          key={`recent-${transcript.id}`}
                          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={getSpeakerImage(transcript)}
                              alt={transcript.speaker}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
                            <div className="absolute top-3 left-3">
                              <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-medium">
                                Recent
                              </span>
                            </div>
                            <div className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full">
                              <FaFilePdf className="text-sm" />
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                              {transcript.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">{transcript.speaker}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                              <span>{formatDate(transcript.date)}</span>
                              <span>{transcript.readingTime}</span>
                            </div>
                            <a
                              href={transcript.downloadUrl}
                              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-lg transition-colors text-center text-sm font-medium flex items-center justify-center gap-2"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaDownload className="text-xs" />
                              Download
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search and Filter Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
                  {/* Search Bar */}
                  <div className="relative mb-8">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search transcripts by title, speaker, or category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${selectedCategory === category
                          ? "bg-yellow-500 text-black shadow-lg transform scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-yellow-500 hover:text-black shadow-md hover:shadow-lg hover:transform hover:scale-105"
                          }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="text-center text-red-600 bg-red-50 border border-red-200 rounded-lg py-4 px-6 mb-8">
                    <p>{error}. Showing sample transcripts.</p>
                  </div>
                )}

                {/* Results Counter */}
                <div className="flex justify-between items-center mb-8" id="all-transcripts">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filteredTranscripts.length} Transcript{filteredTranscripts.length !== 1 ? 's' : ''} Found
                  </h2>
                  {(searchTerm || selectedCategory !== "All") && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("All");
                      }}
                      className="text-yellow-600 hover:text-yellow-700 font-medium"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>

                {/* Transcripts Grid */}
                {filteredTranscripts.length === 0 ? (
                  <div className="text-center py-20">
                    <FaFileAlt className="text-6xl text-gray-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-600 mb-4">No Transcripts Found</h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search terms or category filter.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("All");
                      }}
                      className="px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                    >
                      Show All Transcripts
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTranscripts.map((transcript) => (
                      <div
                        key={transcript.id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                      >
                        {/* Speaker Image */}
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={getSpeakerImage(transcript)}
                            alt={transcript.speaker}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

                          {/* PDF Icon */}
                          <div className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full shadow-lg">
                            <FaFilePdf className="text-lg" />
                          </div>

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                              {transcript.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                            {transcript.title}
                          </h3>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <FaUser className="text-yellow-500 text-sm" />
                              <span className="font-medium">{transcript.speaker}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center gap-2">
                                <FaCalendarAlt className="text-yellow-500" />
                                <span>{formatDate(transcript.date)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FaClock className="text-yellow-500" />
                                <span>{transcript.readingTime}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <FaFileAlt className="text-yellow-500" />
                              <span>{transcript.pages} pages</span>
                            </div>
                          </div>

                          {transcript.description && (
                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">{transcript.description}</p>
                          )}

                          <div className="flex gap-2">
                            <a
                              href={transcript.downloadUrl}
                              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-lg transition-colors text-center text-sm font-medium flex items-center justify-center gap-2"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaDownload className="text-xs" />
                              Download
                            </a>
                            {transcript.previewUrl && (
                              <a
                                href={transcript.previewUrl}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors text-center text-sm font-medium flex items-center justify-center gap-2"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaEye className="text-xs" />
                                Preview
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-yellow-500 text-black p-4 rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300 hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <FaChevronUp className="text-xl" />
        </button>
      )}

      <Footer />
    </div>
  );
} 
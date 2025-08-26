import Head from 'next/head';
import { useState } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import Section from '@/components/common/section';
import YouTubePlayer from '@/components/streaming/YouTubePlayer';
import { FaHeadphones, FaPlay, FaPause, FaStop, FaCalendarAlt, FaClock, FaUser, FaSearch, FaChevronUp } from 'react-icons/fa';
import { useRef } from 'react';
import React from 'react';
import { useEffect } from 'react';
import Image from 'next/image';

/**
 * Audio Messages Page
 * Features:
 * - Grid layout of audio message cards with speaker images
 * - YouTube player integration for audio playbook
 * - Responsive design with hover effects
 * - Search and filter functionality
 * - Speaker images from JSON or local fallback
 * 
 * Expected JSON Structure from Backend:
 * {
 *   "id": 1,
 *   "title": "Message Title",
 *   "speaker": "Speaker Name",
 *   "date": "2024_11_10",
 *   "duration": "1:45:30",
 *   "category": "Category Name",
 *   "description": "Optional message description",
 *   "speakerImage": "/path/to/speaker/image.jpg", // Optional - will fallback to local mapping
 *   "audioUrl": "https://cdn.example.com/audio.mp3"
 * }
 */

// Speaker image mapping (fallback for local images)
const localSpeakerImages = {
  "Rev. Kayode Oyegoke": "/images/rev-kayode-oyegoke.jpg",
  "Rev. Helen Oyegoke": "/images/rev-helen-oyegoke.jpg",
  "Pastor Tayo Fasan": "/images/pastor-tayo-fasan.jpg"
};

// Function to get speaker image with priority: JSON data > local mapping > placeholder
function getSpeakerImage(audio) {
  // First priority: image from JSON data
  if (audio.speakerImage) {
    return audio.speakerImage;
  }

  // Second priority: local mapping
  if (localSpeakerImages[audio.speaker]) {
    return localSpeakerImages[audio.speaker];
  }

  // Fallback: placeholder image
  return "/images/event-placeholder.jpg";
}

const fallbackAudios = [
  {
    id: 1,
    title: "Light of God",
    speaker: "Rev. Kayode Oyegoke",
    date: "2024_11_10",
    duration: "2:45:30",
    category: "OBED",
    description: "A powerful message about walking in the light of God's presence and truth.",
    speakerImage: "/images/rev-kayode-oyegoke.jpg", // Can be overridden from JSON
    audioUrl: "https://egfmusa.b-cdn.net/audios/2024_11_10%20-%20SOGAG%20Day%202%20-%20Rev.%20Kayode%20Oyegoke.mp3"
  },
  {
    id: 2,
    title: "Entrance into Everlasting life by beholding the lamb",
    speaker: "Rev. Helen Oyegoke",
    date: "2024_11_11",
    duration: "1:38:15",
    category: "Converge",
    description: "Understanding how beholding the Lamb of God transforms us and grants eternal life.",
    speakerImage: "/images/rev-helen-oyegoke.jpg", // Can be overridden from JSON
    audioUrl: "https://egfmusa.b-cdn.net/audios/2025_06_19%20-%20(LUA25%20D3%20AM)%20-%20Entrance%20into%20Everlasting%20Life%20by%20Beholding%20the%20Lamb%20by%20Rev%20Helen%20Oyegoke.mp3"
  },
  {
    id: 3,
    title: "The Race To Becoming A Godly & Everlasting Tree",
    speaker: "Pastor Tayo Fasan",
    date: "2024_11_12",
    duration: "1:42:20",
    category: "Day star arising",
    description: "Exploring the spiritual journey of growth and maturity in Christ.",
    speakerImage: "/images/pastor-tayo-fasan.jpg", // Can be overridden from JSON
    audioUrl: "https://egfmusa.b-cdn.net/audios/05_09_2025-DSA-The%20Race%20To%20Becoming%20A%20Godly%20%26%20Everlasting%20Tree%20part%205-Pastor%20Tayo%20Fasan.mp3"
  },
  {
    id: 4,
    title: "Obedience to the heavenly calling",
    speaker: "Pastor Tayo Fasan",
    date: "2024_11_12",
    duration: "1:42:20",
    category: "OBED",
    description: "Understanding and responding to God's call with faithful obedience.",
    speakerImage: "/images/pastor-tayo-fasan.jpg", // Can be overridden from JSON
    audioUrl: "https://egfmusa.b-cdn.net/audios/05_09_2025-DSA-The%20Race%20To%20Becoming%20A%20Godly%20%26%20Everlasting%20Tree%20part%205-Pastor%20Tayo%20Fasan.mp3"
  }
];

function encodeSpeaker(speaker) {
  return speaker.replace(/ /g, "%20");
}

function getAudioUrl(audio) {
  return `https://egfmusa.b-cdn.net/audios/${audio.date}-${audio.category}-${encodeSpeaker(audio.speaker)}.mp3`;
}

function formatDate(dateString) {
  // Convert date format from 2024_11_10 to readable format
  const parts = dateString.split('_');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  return dateString;
}

export default function AudioMessages() {
  const [audioMessages, setAudioMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    async function fetchAudios() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://egfmusa.b-cdn.net/audios/audios.json');
        if (!res.ok) throw new Error('Failed to fetch audio list');
        const data = await res.json();
        setAudioMessages(data);
      } catch (err) {
        setError(err.message);
        setAudioMessages(fallbackAudios); // Use fallback on error
      } finally {
        setLoading(false);
      }
    }
    fetchAudios();
  }, []);

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
    ...Array.from(new Set(audioMessages.map(a => a.category)))
  ];

  // Get latest message for hero section and recent messages (last 4, first for hero, rest for recent)
  const sortedMessages = React.useMemo(() => {
    if (!audioMessages || audioMessages.length === 0) return [];
    return [...audioMessages].sort((a, b) => b.date.localeCompare(a.date));
  }, [audioMessages]);
  
  const latestMessage = React.useMemo(() => {
    return sortedMessages.length > 0 ? sortedMessages[0] : null;
  }, [sortedMessages]);
  
  const recentMessages = React.useMemo(() => {
    return sortedMessages.slice(1, 4); // Skip the latest (hero) and get next 3
  }, [sortedMessages]);

  const filteredAudios = audioMessages
    .filter((audio) => selectedCategory === "All" || audio.category === selectedCategory)
    .filter((audio) =>
      searchTerm === "" ||
      audio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audio.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audio.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Play or pause audio on card click
  const handleAudioCardClick = (audio) => {
    if (selectedAudio && selectedAudio.id === audio.id) {
      // Toggle play/pause
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }
    } else {
      setSelectedAudio(audio);
      setIsPlaying(true);
      // play will be triggered by useEffect
    }
  };

  // When selectedAudio changes, auto play
  React.useEffect(() => {
    if (selectedAudio && selectedAudio.audioUrl && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    } else if (!selectedAudio && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [selectedAudio]);

  // Stop audio
  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Audio Messages | EGFM USA</title>
        <meta
          name="description"
          content="Listen to audio messages from EGFM USA's ministers and speakers."
        />
      </Head>
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Hero Section with Latest Message */}
        {!selectedAudio && latestMessage ? (
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={getSpeakerImage(latestMessage)}
                alt={latestMessage.speaker}
                fill
                className="object-cover opacity-20"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
            </div>

            {/* Hero Content */}
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 lg:py-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="text-white space-y-6">


                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    {latestMessage.title}
                  </h1>

                  <div className="flex items-center gap-2 text-xl">
                    <FaUser className="text-yellow-500 text-lg" />
                    <span className="font-medium text-gray-300">by</span>
                    <span className="font-bold text-white">{latestMessage.speaker}</span>
                  </div>

                  {latestMessage.description && (
                    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                      {latestMessage.description}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                      onClick={() => handleAudioCardClick(latestMessage)}
                      className="group bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                    >
                      <span className="flex items-center justify-center gap-3">
                        <FaPlay className="group-hover:scale-110 transition-transform" />
                        Listen Now
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        const element = document.getElementById('all-messages');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="group bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 backdrop-blur-sm"
                    >
                      <span className="flex items-center justify-center gap-3">
                        <FaHeadphones className="group-hover:scale-110 transition-transform" />
                        Browse All Messages
                      </span>
                    </button>
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
                        src={getSpeakerImage(latestMessage)}
                        alt={latestMessage.speaker}
                        fill
                        className="object-cover"
                        priority
                      />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => handleAudioCardClick(latestMessage)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-black p-6 rounded-full shadow-xl transform hover:scale-110 transition-all duration-300"
                        >
                          <FaPlay className="text-3xl ml-1" />
                        </button>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute -top-4 -right-4 bg-yellow-500 text-black px-4 py-2 rounded-full font-bold shadow-lg">
                      {latestMessage.category}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : !selectedAudio ? (
          /* Fallback/Loading Hero */
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                {loading ? (
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
                ) : (
                  <FaHeadphones className="text-5xl text-yellow-500" />
                )}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Audio Messages
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {loading 
                  ? "Loading latest messages..." 
                  : "Listen to powerful messages from our ministers and speakers. Experience the Word of God through these transformative teachings."
                }
              </p>
            </div>
          </div>
        ) : null}

        {/* Main Content */}
        <div className="bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading audio messages...</p>
              </div>
            ) : (
              <>
                {/* Recent Messages Section */}
                {!selectedAudio && recentMessages.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">More Recent Messages</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {recentMessages.map((message) => (
                        <div
                          key={`recent-${message.id}`}
                          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
                          onClick={() => handleAudioCardClick(message)}
                        >
                          <div className="relative h-64 overflow-hidden">
                            <Image
                              src={getSpeakerImage(message)}
                              alt={message.speaker}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-white/90 rounded-full p-3 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-300 shadow-lg">
                                <FaPlay className="text-lg ml-0.5" />
                              </div>
                            </div>
                            <div className="absolute top-3 left-3">
                              <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-medium">
                                Recent
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                              {message.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">{message.speaker}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{formatDate(message.date)}</span>
                              <span>{message.duration}</span>
                            </div>
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
                      placeholder="Search messages by title, speaker, or category..."
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
                    <p>{error}. Showing sample audio messages.</p>
                  </div>
                )}

                {/* Audio Player View */}
                {selectedAudio && (selectedAudio.audioUrl || getAudioUrl(selectedAudio)) ? (
                  <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Speaker Image */}
                      <div className="flex-shrink-0">
                        <div className="relative w-64 h-64 mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-lg">
                          <Image
                            src={getSpeakerImage(selectedAudio)}
                            alt={selectedAudio.speaker}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Audio Details */}
                      <div className="flex-grow">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                          <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedAudio.title}</h2>
                            <div className="flex items-center gap-4 text-gray-600 mb-4">
                              <div className="flex items-center gap-2">
                                <FaUser className="text-yellow-500" />
                                <span className="font-medium">{selectedAudio.speaker}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FaCalendarAlt className="text-yellow-500" />
                                <span>{formatDate(selectedAudio.date)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FaClock className="text-yellow-500" />
                                <span>{selectedAudio.duration}</span>
                              </div>
                            </div>
                            {selectedAudio.description && (
                              <p className="text-gray-700 mb-6">{selectedAudio.description}</p>
                            )}
                          </div>

                          <div className="flex gap-3">
                            <button
                              onClick={() => setSelectedAudio(null)}
                              className="group px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-yellow-500 hover:text-yellow-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                            >
                              <span className="flex items-center gap-2">
                                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to List
                              </span>
                            </button>
                            <button
                              onClick={handleStop}
                              className="group px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                              <span className="flex items-center gap-2">
                                <FaStop className="transition-transform group-hover:scale-110" />
                                Stop Audio
                              </span>
                            </button>
                          </div>
                        </div>

                        {/* Audio Player */}
                        <audio
                          ref={audioRef}
                          controls
                          className="w-full h-12 rounded-lg"
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                        >
                          <source src={selectedAudio.audioUrl ? selectedAudio.audioUrl : getAudioUrl(selectedAudio)} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>
                  </div>
                ) : selectedAudio && selectedAudio.youtubeId ? (
                  <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-3xl font-bold text-gray-900">{selectedAudio.title}</h2>
                      <button
                        onClick={() => setSelectedAudio(null)}
                        className="group px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-yellow-500 hover:text-yellow-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                      >
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Back to List
                        </span>
                      </button>
                    </div>
                    <YouTubePlayer videoId={selectedAudio.youtubeId} />
                  </div>
                ) : (
                  <>
                    {/* Results Counter */}
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {filteredAudios.length} Message{filteredAudios.length !== 1 ? 's' : ''} Found
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

                    {/* Audio Messages Grid */}
                    <div id="all-messages"></div>
                    {filteredAudios.length === 0 ? (
                      <div className="text-center py-20">
                        <FaHeadphones className="text-6xl text-gray-300 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-gray-600 mb-4">No Messages Found</h3>
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
                          Show All Messages
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredAudios.map((message) => (
                          <div
                            key={message.id}
                            className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group ${selectedAudio && selectedAudio.id === message.id ? 'ring-4 ring-yellow-500' : ''
                              }`}
                            onClick={() => handleAudioCardClick(message)}
                          >
                            {/* Speaker Image */}
                            <div className="relative h-72 overflow-hidden">
                              <Image
                                src={getSpeakerImage(message)}
                                alt={message.speaker}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

                              {/* Play Button Overlay */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white/90 rounded-full p-4 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-300 shadow-lg">
                                  {message.audioUrl && selectedAudio && selectedAudio.id === message.id && isPlaying ? (
                                    <FaPause className="text-2xl" />
                                  ) : (
                                    <FaPlay className="text-2xl ml-1" />
                                  )}
                                </div>
                              </div>

                              {/* Category Badge */}
                              <div className="absolute top-4 left-4">
                                <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                                  {message.category}
                                </span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                                {message.title}
                              </h3>

                              <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-gray-600">
                                  <FaUser className="text-yellow-500 text-sm" />
                                  <span className="font-medium">{message.speaker}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                  <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-yellow-500" />
                                    <span>{formatDate(message.date)}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <FaClock className="text-yellow-500" />
                                    <span>{message.duration}</span>
                                  </div>
                                </div>
                              </div>

                              {message.description && (
                                <p className="text-gray-600 text-sm line-clamp-2">{message.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
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
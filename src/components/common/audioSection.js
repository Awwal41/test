import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlay, FaPause, FaStop, FaHeadphones, FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa';
import { fetchResourceData } from '../../config/api';

// Speaker image mapping (fallback for local images)
const localSpeakerImages = {
    "Rev. Kayode Oyegoke": "/images/rev-kayode-oyegoke.jpg",
    "Rev. Helen Oyegoke": "/images/rev-helen-oyegoke.jpg",
    "Pastor Tayo Fasan": "/images/pastor-tayo-fasan.jpg"
};

// Function to get speaker image with priority: JSON data > local mapping > placeholder
function getSpeakerImage(audio) {
    if (audio.speakerImage) {
        return audio.speakerImage;
    }
    if (localSpeakerImages[audio.speaker]) {
        return localSpeakerImages[audio.speaker];
    }
    return "/images/event-placeholder.jpg";
}

function formatDate(dateString) {
    const parts = dateString.split('_');
    if (parts.length === 3) {
        const [year, month, day] = parts;
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    return dateString;
}

// Fallback audio data with actual URLs from resources audio page
const fallbackAudios = [
    {
        id: 1,
        title: "Light of God",
        speaker: "Rev. Kayode Oyegoke",
        date: "2024_11_10",
        duration: "2:45:30",
        category: "OBED",
        description: "A powerful message about walking in the light of God's presence and truth.",
        speakerImage: "/images/rev-kayode-oyegoke.jpg",
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
        speakerImage: "/images/rev-helen-oyegoke.jpg",
        audioUrl: "https://egfmusa.b-cdn.net/audios/2025_06_19%20-%20(LUA25%20D3%20AM)%20-%20Entrance%20into%20Everlasting%20Life%20by%20Beholding%20the%20Lamb%20by%20Rev%20Helen%20Oyegoke.mp3"
    },
    {
        id: 3,
        title: "The Race To Becoming A Godly & Everlasting Tree",
        speaker: "Pastor Tayo Fasan",
        date: "2024_11_12",
        duration: "1:42:20",
        category: "Daystar Arising",
        description: "Exploring the spiritual journey of growth and maturity in Christ.",
        speakerImage: "/images/pastor-tayo-fasan.jpg",
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
        speakerImage: "/images/pastor-tayo-fasan.jpg",
        audioUrl: "https://egfmusa.b-cdn.net/audios/05_09_2025-DSA-The%20Race%20To%20Becoming%20A%20Godly%20%26%20Everlasting%20Tree%20part%205-Pastor%20Tayo%20Fasan.mp3"
    },
    {
        id: 5,
        title: "Walking in Divine Light",
        speaker: "Pastor Tayo Fasan",
        date: "2024_11_05",
        duration: "2:10:30",
        category: "Daystar Arising",
        description: "Understanding how to walk in God's divine light daily.",
        speakerImage: "/images/pastor-tayo-fasan.jpg",
        audioUrl: "https://egfmusa.b-cdn.net/audios/05_09_2025-DSA-The%20Race%20To%20Becoming%20A%20Godly%20%26%20Everlasting%20Tree%20part%205-Pastor%20Tayo%20Fasan.mp3"
    },
    {
        id: 6,
        title: "Healing and Restoration",
        speaker: "Rev. Helen Oyegoke",
        date: "2024_10_28",
        duration: "1:45:20",
        category: "Healing Light",
        description: "God's power to heal and restore broken lives.",
        speakerImage: "/images/rev-helen-oyegoke.jpg",
        audioUrl: "https://egfmusa.b-cdn.net/audios/2025_06_19%20-%20(LUA25%20D3%20AM)%20-%20Entrance%20into%20Everlasting%20Life%20by%20Beholding%20the%20Lamb%20by%20Rev%20Helen%20Oyegoke.mp3"
    }
];

function encodeSpeaker(speaker) {
    return speaker.replace(/ /g, "%20");
}

function getAudioUrl(audio) {
    // If audio has a direct URL, use it
    if (audio.audioUrl) {
        return audio.audioUrl;
    }

    // Use actual URLs from resources audio page based on speaker
    if (audio.speaker === "Rev. Kayode Oyegoke") {
        return "https://egfmusa.b-cdn.net/audios/2024_11_10%20-%20SOGAG%20Day%202%20-%20Rev.%20Kayode%20Oyegoke.mp3";
    } else if (audio.speaker === "Rev. Helen Oyegoke") {
        return "https://egfmusa.b-cdn.net/audios/2025_06_19%20-%20(LUA25%20D3%20AM)%20-%20Entrance%20into%20Everlasting%20Life%20by%20Beholding%20the%20Lamb%20by%20Rev%20Helen%20Oyegoke.mp3";
    } else if (audio.speaker === "Pastor Tayo Fasan") {
        return "https://egfmusa.b-cdn.net/audios/05_09_2025-DSA-The%20Race%20To%20Becoming%20A%20Godly%20%26%20Everlasting%20Tree%20part%205-Pastor%20Tayo%20Fasan.mp3";
    }

    // Fallback to CDN pattern if no match
    return `https://egfmusa.b-cdn.net/audios/${audio.date}-${audio.category}-${encodeSpeaker(audio.title)}-${encodeSpeaker(audio.speaker)}.mp3`;
}

export default function AudioSection({ category, title, maxItems = 3 }) {
    const [audioMessages, setAudioMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Handle audio card click - show detailed player view
    const handleAudioClick = (audio) => {
        console.log('Audio clicked:', audio.title);
        setCurrentlyPlaying(audio);
        // We'll handle play state in the useEffect
    };

    // Handle stop audio
    const handleStop = () => {
        console.log('Stop button clicked');
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
        setCurrentlyPlaying(null);
    };

    // Handle close player
    const handleClose = () => {
        console.log('Close button clicked');
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
        setCurrentlyPlaying(null);
    };

    // When currentlyPlaying changes, set up audio and try to play
    useEffect(() => {
        if (currentlyPlaying && audioRef.current) {
            const audioUrl = getAudioUrl(currentlyPlaying);
            console.log('Setting up audio:', audioUrl);
            audioRef.current.src = audioUrl;
            audioRef.current.load();

            // Try to play after a short delay to ensure audio is loaded
            const playTimer = setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play()
                        .then(() => {
                            console.log('Audio started playing');
                            setIsPlaying(true);
                        })
                        .catch(error => {
                            console.error('Error playing audio:', error);
                            setIsPlaying(false);
                            // Don't close player, just show error state
                        });
                }
            }, 500);

            return () => clearTimeout(playTimer);
        } else if (!currentlyPlaying && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }, [currentlyPlaying]);

    useEffect(() => {
        async function fetchAudios() {
            setLoading(true);
            try {
                console.log('🔍 Attempting to fetch audio data...');
                console.log('🌍 Environment:', process.env.NODE_ENV);
                
                // Use centralized API configuration that handles both development and production
                const data = await fetchResourceData('audio');
                
                console.log('✅ Successfully fetched audio data:', data);
                
                // Validate and process the data
                if (Array.isArray(data.items) && data.items.length > 0) {
                    console.log(`📻 Loaded ${data.items.length} audio messages`);
                    setAudioMessages(data.items);
                } else {
                    throw new Error('Invalid data format received');
                }
            } catch (err) {
                // Fall back to local data if all external sources fail
                console.log('⚠️ Using local audio data as fallback:', err.message);
                console.log('🔄 This ensures audio works in both development and production environments');
                console.log('📁 Fallback data contains:', fallbackAudios.length, 'audio messages');
                setAudioMessages(fallbackAudios);
            } finally {
                setLoading(false);
            }
        }
        fetchAudios();
    }, []);

    // Filter and sort audio messages by category
    const filteredAudios = audioMessages
        .filter(audio => {
            if (!category || category === 'all') return true;

            // Handle specific meeting categories
            const audioCategory = audio.category.toLowerCase();
            const filterCategory = category.toLowerCase();

            // Direct match
            if (audioCategory === filterCategory) return true;

            // Handle category groupings
            if (filterCategory === 'weekly') {
                return ['obed', 'daystar arising', 'rooted'].some(cat =>
                    audioCategory.includes(cat) || cat.includes(audioCategory)
                );
            }

            if (filterCategory === 'yearly') {
                return ['converge', 'light up america', 'healing light'].some(cat =>
                    audioCategory.includes(cat) || cat.includes(audioCategory)
                );
            }

            // Partial match for specific meetings
            return audioCategory.includes(filterCategory) || filterCategory.includes(audioCategory);
        })
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, maxItems);

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="space-y-4">
                                <div className="h-48 bg-gray-200 rounded-lg"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (filteredAudios.length === 0) {
        return null;
    }

    return (
        <>
            {/* Audio Player Modal - Similar to audio page */}
            {currentlyPlaying && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={handleClose}
                >
                    <div
                        className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Speaker Image */}
                            <div className="flex-shrink-0">
                                <div className="relative w-full h-64 lg:w-64 lg:h-64 mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-lg">
                                    <Image
                                        src={getSpeakerImage(currentlyPlaying)}
                                        alt={currentlyPlaying.speaker}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Audio Details */}
                            <div className="flex-grow">
                                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{currentlyPlaying.title}</h2>
                                        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                                            <div className="flex items-center gap-2">
                                                <FaUser className="text-[#90651b]" />
                                                <span className="font-medium">{currentlyPlaying.speaker}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-[#90651b]" />
                                                <span>{formatDate(currentlyPlaying.date)}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaClock className="text-[#90651b]" />
                                                <span>{currentlyPlaying.duration}</span>
                                            </div>
                                        </div>
                                        {currentlyPlaying.description && (
                                            <p className="text-gray-700 mb-6">{currentlyPlaying.description}</p>
                                        )}
                                    </div>

                                    <div className="flex gap-3 mt-4 lg:mt-0">
                                        <button
                                            onClick={handleClose}
                                            className="group px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-[#90651b] hover:text-[#90651b] transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                                        >
                                            <span className="flex items-center gap-2">
                                                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                                Close Player
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
                                <div>
                                    <audio
                                        ref={audioRef}
                                        controls
                                        className="w-full h-12 rounded-lg"
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                        onEnded={() => {
                                            console.log('Audio ended');
                                            setIsPlaying(false);
                                            // Don't close player when audio ends, let user decide
                                        }}
                                        onError={(e) => {
                                            console.error('Audio error:', e.target.error);
                                            setIsPlaying(false);
                                            // Don't close player on error, show error state instead
                                        }}
                                        onLoadStart={() => {
                                            console.log('Audio loading started');
                                        }}
                                        onCanPlay={() => {
                                            console.log('Audio can play');
                                        }}
                                        onLoadedData={() => {
                                            console.log('Audio data loaded');
                                        }}
                                    >
                                        <source src={getAudioUrl(currentlyPlaying)} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>

                                    {/* Playback help message */}
                                    <p className="text-sm text-gray-500 mt-2 text-center">
                                        If audio doesn't play automatically, please click the play button above.
                                    </p>
                                </div>

                                {/* Additional Actions */}
                                <div className="flex justify-between items-center mt-6">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-[#90651b] text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {currentlyPlaying.category}
                                        </span>
                                    </div>
                                    <Link
                                        href="/resources/audio"
                                        className="text-[#90651b] hover:text-[#7a5518] font-medium flex items-center gap-2"
                                    >
                                        View All Messages
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Audio Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <FaHeadphones className="text-2xl text-[#90651b]" />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {title || `Recent ${category} Messages`}
                        </h2>
                        {process.env.NODE_ENV === 'development' && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                                Dev Mode
                            </span>
                        )}
                        {audioMessages === fallbackAudios && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                Local Data
                            </span>
                        )}
                    </div>
                    <Link
                        href="/resources/audio"
                        className="text-[#90651b] hover:text-[#7a5518] font-semibold transition-colors duration-200 flex items-center gap-2"
                    >
                        View All
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAudios.map((audio) => (
                        <div
                            key={audio.id}
                            className="group bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                            onClick={() => handleAudioClick(audio)}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={getSpeakerImage(audio)}
                                    alt={audio.speaker}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/90 rounded-full p-3 group-hover:bg-[#90651b] group-hover:text-white transition-all duration-300 shadow-lg">
                                        <FaPlay className="text-lg ml-0.5" />
                                    </div>
                                </div>

                                {/* Category Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className="bg-[#90651b] text-white px-2 py-1 rounded-full text-xs font-medium">
                                        {audio.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#90651b] transition-colors" style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {audio.title}
                                </h3>

                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                    <FaUser className="text-[#90651b]" />
                                    <span>{audio.speaker}</span>
                                </div>

                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <FaCalendarAlt className="text-[#90651b]" />
                                        <span>{formatDate(audio.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaClock className="text-[#90651b]" />
                                        <span>{audio.duration}</span>
                                    </div>
                                </div>

                                {audio.description && (
                                    <p className="text-sm text-gray-600 mt-2" style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {audio.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredAudios.length > 0 && (
                    <div className="text-center mt-8">
                        <Link
                            href="/resources/audio"
                            className="inline-flex items-center gap-2 bg-[#90651b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7a5518] hover:scale-105 hover:shadow-lg transition-all duration-300 transform"
                        >
                            <FaHeadphones />
                            Listen to More Messages
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
import { useState, useCallback } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Head from "next/head";
import YouTubePlayer from "@/components/streaming/YouTubePlayer";
import RecentBroadcasts from "@/components/streaming/RecentBroadcasts";
import WatermarkBackground from "@/components/common/WatermarkBackground";

export default function VideoBroadcast() {
  const [isLive, setIsLive] = useState(false);

  // Only need the default video ID for recorded content
  const videoId = process.env.NEXT_PUBLIC_DEFAULT_VIDEO_ID;

  const handleStreamToggle = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLive(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      <WatermarkBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Head>
          <title>{`${isLive ? "Live Stream" : "Video Broadcast"} | EGFM USA`}</title>
          <meta
            name="description"
            content="Watch EGFM USA's live video broadcasts and recorded services"
          />
        </Head>

        {/* Hero Section with Navbar */}
        <div className="relative min-h-[40vh] bg-gradient-to-b from-gray-900 to-black">
          <div className="absolute inset-0 bg-[url('/images/hero-bg.svg')] bg-cover bg-center opacity-20" />
          <Navbar />
          <div className="relative max-w-7xl mx-auto px-4 pt-40 md:pt-48 pb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {isLive ? "Live Stream" : "Video Broadcast"}
              </h1>
              <p className="text-lg md:text-xl text-gray-300">
                {isLive ? "Watch our live service" : "Watch our recorded services and events"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-12">
          {/* Video Player Section */}
          <div className="bg-gray-100 rounded-lg p-8 mb-8">
            <div className="w-full">
              {!process.env.NEXT_PUBLIC_DEFAULT_VIDEO_ID ? (
                <div className="text-center p-8">
                  <p className="text-red-500 mb-4">Video configuration is missing</p>
                  <p className="text-gray-600">Please check your environment variables configuration.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative w-full aspect-video">
                    <YouTubePlayer 
                      key={`player-${isLive ? 'live' : 'recorded'}`} 
                      videoId={videoId} 
                      isLive={isLive} 
                    />
                  </div>
                  
                  <div className="flex justify-center">
                    <button
                      onClick={handleStreamToggle}
                      type="button"
                      className={`${
                        isLive
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white px-6 py-2 rounded-md transition-colors`}
                    >
                      {isLive ? "End Stream" : "Start Stream"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Broadcasts Section */}
          <RecentBroadcasts />
        </main>
        <Footer />
      </div>
    </div>
  );
} 
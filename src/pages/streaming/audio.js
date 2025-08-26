import { useState, useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Head from "next/head";
import WatermarkBackground from "@/components/common/WatermarkBackground";
import dynamic from 'next/dynamic';

/**
 * MixlrPlayer Component
 * 
 * A dynamically imported component that embeds the Mixlr audio player.
 * Uses dynamic import with { ssr: false } to prevent hydration errors
 * since the iframe content is client-side only.
 */
const MixlrPlayer = dynamic(() => Promise.resolve(() => (
  <div className="w-full">
    <iframe 
      src="https://user-6773835.mixlr.com/embed" 
      frameBorder="0" 
      scrolling="no" 
      height="300px" 
      width="100%"
      className="w-full"
    />
    <small>
      <a 
        href="https://mixlr.com/" 
        style={{
          color: '#1a1a1a',
          display: 'block',
          fontFamily: 'Helvetica, sans-serif',
          fontSize: '11px',
          textAlign: 'left',
          padding: '4px 0'
        }}
      >
        James20 is on Mixlr
      </a>
    </small>
  </div>
)), { ssr: false });

/**
 * AudioBroadcast Page Component
 * 
 * This page provides live audio streaming functionality through Mixlr.
 * Features:
 * - Dynamic Mixlr player integration
 * - Live broadcast status indicator
 * - Responsive design
 * - Client-side only rendering for the player
 */
export default function AudioBroadcast() {
  // State to track component mounting for client-side rendering
  const [isMounted, setIsMounted] = useState(false);
  // State to track if we're showing live content
  const [isLive, setIsLive] = useState(true);

  // Set mounted state when component mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      {/* Background watermark pattern */}
      <WatermarkBackground />
      
      {/* Main Content Container */}
      <div className="relative z-10">
        {/* SEO and Meta Tags */}
        <Head>
          <title>Live Stream | EGFM USA</title>
          <meta
            name="description"
            content="Listen to EGFM USA's live audio broadcasts and recorded sermons"
          />
        </Head>

        {/* Hero Section with Navbar */}
        <div className="relative min-h-[40vh] bg-gradient-to-b from-gray-900 to-black">
          {/* Background pattern overlay */}
          <div className="absolute inset-0 bg-[url('/images/hero-bg.svg')] bg-cover bg-center opacity-20" />
          <Navbar />
          {/* Hero content */}
          <div className="relative max-w-7xl mx-auto px-4 pt-48 md:pt-56 pb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Live Stream
              </h1>
              <p className="text-lg md:text-xl text-gray-300">
                Listen to our live service
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 py-12">
          {/* Audio Player Section */}
          <div className="bg-gray-100 rounded-lg p-8 mb-8">
            <div className="w-full flex flex-col items-center justify-center">
              <div className="text-center">
                {/* Live Status Indicator */}
                <div className="flex items-center justify-center mb-6">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse mr-2"></div>
                  <p className="text-xl text-gray-900">Live Broadcast</p>
                </div>
                {/* Mixlr Player Container */}
                <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Current Service</h3>
                      <p className="text-gray-600">Sunday Service - 10:00 AM</p>
                    </div>
                  </div>
                  {/* Render Mixlr player only after component mounts */}
                  {isMounted && <MixlrPlayer />}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
} 
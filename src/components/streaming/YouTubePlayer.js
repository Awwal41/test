import { useState, useEffect } from 'react';

export default function YouTubePlayer({ isLive = false }) {
  const [liveStreamId, setLiveStreamId] = useState(null);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

  useEffect(() => {
    const checkForLiveStream = async () => {
      const now = Date.now();
      if (cache && now - lastFetchTime < CACHE_DURATION) {
        return;
      }

      if (!isLive) {
        setLiveStreamId(null);
        return;
      }

      try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID}&type=video&eventType=live&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error.message || 'YouTube API error');
        }
        
        if (data.items && data.items.length > 0) {
          const streamId = data.items[0].id.videoId;
          setLiveStreamId(streamId);
          setError(null);
          setCache(data);
          setLastFetchTime(now);
        } else {
          setError('No live stream found');
          setLiveStreamId(null);
        }
      } catch (err) {
        setError(`Failed to check for live stream: ${err.message}`);
        setLiveStreamId(null);
      }
    };

    checkForLiveStream();
    const intervalId = setInterval(checkForLiveStream, CACHE_DURATION);

    return () => clearInterval(intervalId);
  }, [isLive]);

  if (error) {
    return (
      <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-white text-center p-4">
          <p className="text-red-500 mb-2">Error loading video player</p>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (isLive && !liveStreamId) {
    return (
      <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-white text-center p-4">
          <div className="w-12 h-12 border-4 border-[#90651b] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>Checking for live stream...</p>
        </div>
      </div>
    );
  }

  if (!isLive) {
    return (
      <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-white text-center p-4">
          <p className="text-xl mb-2">Click Start Stream to Begin</p>
          <p className="text-gray-400">Join us for our live stream</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      {/* Live indicator */}
        <div className="absolute top-4 left-4 z-10 flex items-center bg-red-600 text-white px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
          <span className="text-sm font-medium">LIVE</span>
        </div>
      
      {/* YouTube Player */}
      <iframe
        src={`https://www.youtube.com/embed/${liveStreamId}?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=1`}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
      />
    </div>
  );
} 
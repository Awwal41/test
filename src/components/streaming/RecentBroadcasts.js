import { useState, useEffect } from 'react';

export default function RecentBroadcasts() {
  const [broadcasts, setBroadcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentBroadcasts = async () => {
      try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID}&type=video&eventType=completed&maxResults=3&order=date&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(`HTTP error! status: ${response.status}${errorData ? ` - ${errorData.error?.message || ''}` : ''}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error.message || 'YouTube API error');
        }
        
        if (data.items && data.items.length > 0) {
          setBroadcasts(data.items);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBroadcasts();
  }, []);

  if (loading) {
    return (
      <div className="mt-32">
        <h2 className="text-2xl font-bold mb-6">Recent Broadcasts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-32">
        <h2 className="text-2xl font-bold mb-6">Recent Broadcasts</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Failed to load recent broadcasts</p>
          <p className="text-sm text-red-500 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (broadcasts.length === 0) {
    return (
      <div className="mt-32">
        <h2 className="text-2xl font-bold mb-6">Recent Broadcasts</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-gray-600">No recent broadcasts available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-32">
      <h2 className="text-2xl font-bold mb-6">Recent Broadcasts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {broadcasts.map((broadcast) => (
          <div key={broadcast.id.videoId} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-video relative">
              <img 
                src={broadcast.snippet.thumbnails.high.url} 
                alt={broadcast.snippet.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm">
                  {new Date(broadcast.snippet.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{broadcast.snippet.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{broadcast.snippet.description}</p>
              <button 
                onClick={() => window.open(`https://www.youtube.com/watch?v=${broadcast.id.videoId}`, '_blank')}
                className="w-full bg-[#90651b] hover:bg-[#a67a2a] text-white px-4 py-2 rounded-md transition-colors"
              >
                Watch Recording
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
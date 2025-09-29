import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    publishedAt: string;
  };
}

const REDSafetyVideoCard = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChannelVideos = async () => {
      try {
        const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || 'AIzaSyDfy5VjW55Te8pLJ4l2YKCi5n7wic5nqnI';
        const CHANNEL_ID = 'UCJjI6OClvs6LjQK-9P7G6QA'; // Direct channel ID for @RhombergSersaRailGroup

        console.log('Fetching videos with API key:', API_KEY ? 'Present' : 'Missing');
        const videosResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&maxResults=10&key=${API_KEY}`
        );

        console.log('Videos response status:', videosResponse.status);

        if (!videosResponse.ok) {
          const errorText = await videosResponse.text();
          console.error('API Error:', errorText);
          throw new Error(`Failed to fetch videos: ${videosResponse.status}`);
        }

        const videosData = await videosResponse.json();
        console.log('Videos data:', videosData);

        if (videosData.items && videosData.items.length > 0) {
          setVideos(videosData.items);
          setSelectedVideoId(videosData.items[0].id.videoId);
          console.log('Videos loaded:', videosData.items.length);
        } else {
          console.log('No videos found');
          setError('No videos found for this channel');
        }
      } catch (err) {
        console.error('Error fetching YouTube videos:', err);
        setError(`Failed to load videos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelVideos();
  }, []);

  // Custom YouTube embed URL generator
  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0&modestbranding=1&origin=${window.location.origin}`;
  };

  const nextVideo = () => {
    if (currentVideoIndex < videos.length - 3) {
      setCurrentVideoIndex(currentVideoIndex + 3);
    }
  };

  const prevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 3);
    }
  };

  const selectVideo = (videoId: string) => {
    setSelectedVideoId(videoId);
  };

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
        <CardHeader className="pb-3 bg-gray-900 flex-shrink-0">
          <CardTitle className="text-lg text-white text-right">RED Safety Video</CardTitle>
        </CardHeader>
        <CardContent className="p-3 flex-1 flex items-center justify-center">
          <p className="text-white">Loading videos...</p>
        </CardContent>
      </Card>
    );
  }

  if (error || videos.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
        <CardHeader className="pb-3 bg-gray-900 flex-shrink-0">
          <CardTitle className="text-lg text-white text-right">RED Safety Video</CardTitle>
        </CardHeader>
        <CardContent className="p-3 flex-1 flex items-center justify-center">
          <p className="text-white">{error || 'No videos available'}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
      <CardHeader className="pb-0.5 py-1 bg-gray-900 flex-shrink-0">
        <CardTitle className="text-xs text-white text-right">RED Safety Video</CardTitle>
      </CardHeader>
      <CardContent className="p-1 flex-1 flex gap-1">
        {/* Main video player */}
        <div className="relative bg-black rounded overflow-hidden flex-1 min-h-[60px]">
          {selectedVideoId && (
            <iframe
              src={getYouTubeEmbedUrl(selectedVideoId)}
              title="YouTube video player"
              className="w-full h-full rounded border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ aspectRatio: '16/9' }}
            />
          )}
        </div>

        {/* Video carousel - Vertical */}
        <div className="relative flex-shrink-0 w-16 sm:w-20 h-full">
          <div className="flex flex-col items-center gap-0.5 sm:gap-1 h-full">
            {/* Debug info */}
            {videos.length === 0 && !loading && (
              <div className="text-white text-[8px] p-1">No videos</div>
            )}

            {/* Previous button */}
            {videos.length > 3 && (
              <button
                onClick={prevVideo}
                disabled={currentVideoIndex === 0}
                className="p-0.5 rounded bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors flex-shrink-0 min-w-[20px] flex items-center justify-center"
              >
                <ChevronLeft className="w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-90" />
              </button>
            )}

            {/* Video thumbnails */}
            <div className="flex-1 overflow-hidden w-full">
              <div className="flex flex-col gap-0.5 sm:gap-1">
                {videos.slice(currentVideoIndex, currentVideoIndex + 3).map((video) => (
                  <div
                    key={video.id.videoId}
                    className={`flex-shrink-0 cursor-pointer rounded overflow-hidden transition-all duration-200 ${
                      selectedVideoId === video.id.videoId
                        ? 'ring-1 ring-red-500'
                        : 'hover:opacity-80'
                    }`}
                    onClick={() => selectVideo(video.id.videoId)}
                  >
                    <div className="relative bg-gray-900 w-12 sm:w-16 h-8 sm:h-10">
                      <img
                        src={video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url}
                        alt={video.snippet.title}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded">
                        <Play className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                      </div>
                    </div>
                    <div className="p-0.5 flex-shrink-0 w-full">
                      <p className="text-[4px] sm:text-[5px] text-white truncate leading-tight" title={video.snippet.title}>
                        {video.snippet.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next button */}
            {videos.length > 3 && (
              <button
                onClick={nextVideo}
                disabled={currentVideoIndex + 3 >= videos.length}
                className="p-0.5 rounded bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors flex-shrink-0 min-w-[20px] flex items-center justify-center"
              >
                <ChevronRight className="w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-90" />
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default REDSafetyVideoCard;
import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
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

  // Fetch videos from YouTube API
  useEffect(() => {
    const fetchChannelVideos = async () => {
      try {
        const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || 'AIzaSyDfy5VjW55Te8pLJ4l2YKCi5n7wic5nqnI';
        const CHANNEL_HANDLE = '@RhombergSersaRailGroup';

        // First, get the channel ID from the handle
        const channelResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${CHANNEL_HANDLE}&key=${API_KEY}`
        );

        if (!channelResponse.ok) {
          throw new Error('Failed to fetch channel information');
        }

        const channelData = await channelResponse.json();

        if (channelData.items && channelData.items.length > 0) {
          const channelId = channelData.items[0].snippet.channelId || channelData.items[0].id.channelId;

          // Now fetch videos from the channel
          const videosResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=10&key=${API_KEY}`
          );

          if (!videosResponse.ok) {
            throw new Error('Failed to fetch videos');
          }

          const videosData = await videosResponse.json();
          setVideos(videosData.items || []);

          if (videosData.items && videosData.items.length > 0) {
            setSelectedVideoId(videosData.items[0].id.videoId);
          }
        }
      } catch (err) {
        console.error('Error fetching YouTube videos:', err);
        setError('Failed to load videos');
      } finally {
        setLoading(false);
      }
    };

    fetchChannelVideos();
  }, []);

  // YouTube player options
  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      enablejsapi: 1,
      origin: window.location.origin,
    },
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
      <CardContent className="p-1 flex-1 flex flex-col gap-1">
        {/* Main video player */}
        <div className="relative bg-black rounded overflow-hidden flex-1 min-h-[40px]">
          {selectedVideoId && (
            <YouTube
              videoId={selectedVideoId}
              opts={opts}
              className="w-full h-full"
              iframeClassName="w-full h-full rounded"
            />
          )}
        </div>

        {/* Video carousel */}
        <div className="relative flex-shrink-0">
          <div className="flex items-center gap-0.5 sm:gap-1">
            {/* Previous button */}
            <button
              onClick={prevVideo}
              disabled={currentVideoIndex === 0}
              className="p-0.5 rounded bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors flex-shrink-0 min-h-[20px] flex items-center justify-center"
            >
              <ChevronLeft className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
            </button>

            {/* Video thumbnails */}
            <div className="flex-1 overflow-hidden">
              <div
                className="flex gap-0.5 sm:gap-1 transition-transform duration-300"
                style={{ transform: `translateX(-${currentVideoIndex * 100}%)` }}
              >
                {videos.map((video) => (
                  <div
                    key={video.id.videoId}
                    className={`flex-shrink-0 w-1/3 cursor-pointer rounded overflow-hidden transition-all duration-200 ${
                      selectedVideoId === video.id.videoId
                        ? 'ring-1 ring-red-500'
                        : 'hover:opacity-80'
                    }`}
                    onClick={() => selectVideo(video.id.videoId)}
                  >
                    <div className="relative aspect-video bg-gray-900">
                      <img
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <Play className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                      </div>
                    </div>
                    <div className="p-0.5 flex-shrink-0">
                      <p className="text-[4px] sm:text-[6px] text-white truncate leading-tight" title={video.snippet.title}>
                        {video.snippet.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next button */}
            <button
              onClick={nextVideo}
              disabled={currentVideoIndex + 3 >= videos.length}
              className="p-0.5 rounded bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors flex-shrink-0 min-h-[20px] flex items-center justify-center"
            >
              <ChevronRight className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default REDSafetyVideoCard;
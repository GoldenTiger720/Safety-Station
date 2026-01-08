"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Play } from "lucide-react";
import type { YouTubeVideo } from "@/types";
import YouTube, { YouTubePlayer, YouTubeEvent } from "react-youtube";

interface REDSafetyVideoCardProps {
  videos: YouTubeVideo[];
  loading: boolean;
  error: string | null;
}

const REDSafetyVideoCard: React.FC<REDSafetyVideoCardProps> = ({
  videos,
  loading,
  error,
}) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(0);
  const playerRef = useRef<YouTubePlayer | null>(null);

  // Set first video when videos load
  useEffect(() => {
    if (videos.length > 0) {
      setSelectedVideoIndex(0);
    }
  }, [videos]);

  // Handle video end - advance to next video in loop
  const handleVideoEnd = useCallback(() => {
    if (videos.length === 0) return;

    // Move to next video, loop back to first if at end
    setSelectedVideoIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % videos.length;
      return nextIndex;
    });
  }, [videos.length]);

  // YouTube player options - autoplay enabled with mute for browser compatibility
  const youtubeOptions = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      fs: 1,
      playsinline: 1,
      iv_load_policy: 3,
      cc_load_policy: 0,
      enablejsapi: 1,
    },
  };

  // YouTube player event handlers
  const onPlayerReady = (event: YouTubeEvent) => {
    playerRef.current = event.target;
    // Ensure muted and start playing
    event.target.mute();
    event.target.playVideo();
  };

  const onPlayerStateChange = (event: YouTubeEvent) => {
    // State 0 = ended
    if (event.data === 0) {
      handleVideoEnd();
    }
    // State 5 = cued (video ready but not playing) - try to play it
    if (event.data === 5) {
      event.target.mute();
      event.target.playVideo();
    }
  };

  const onPlayerError = (event: YouTubeEvent) => {
    console.error("YouTube player error:", event.data);
    // On error, skip to next video after a short delay
    setTimeout(() => handleVideoEnd(), 1000);
  };

  const selectVideo = (index: number) => {
    setSelectedVideoIndex(index);
  };

  const selectedVideoId = videos[selectedVideoIndex]?.video_id || null;

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
        <CardHeader className="pb-0.5 py-1 bg-gray-900 flex-shrink-0">
          <CardTitle className="text-[1.2vw] text-white text-right">
            RSRG Videos
          </CardTitle>
        </CardHeader>
        <CardContent className="p-1 flex-1 flex items-center justify-center">
          <p className="text-white text-[0.8vw]">Loading videos...</p>
        </CardContent>
      </Card>
    );
  }

  if (error || videos.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
        <CardHeader className="pb-0.5 py-1 bg-gray-900 flex-shrink-0">
          <CardTitle className="text-[1.2vw] text-white text-right">
            RSRG Videos
          </CardTitle>
        </CardHeader>
        <CardContent className="p-1 flex-1 flex items-center justify-center">
          <p className="text-white text-[0.8vw]">{error || "No videos available"}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
      <CardHeader className="pb-0.5 py-1 bg-gray-900 flex-shrink-0">
        <CardTitle className="text-[1.2vw] text-white text-right">
          RSRG Videos
        </CardTitle>
      </CardHeader>
      <CardContent className="p-1 flex-1 flex gap-1 min-h-0 overflow-hidden">
        {/* Main video player - letterboxed to maintain 16:9 aspect ratio */}
        <div className="flex-1 bg-black rounded overflow-hidden flex justify-center items-center min-h-0">
          {selectedVideoId && (
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-full" style={{ maxHeight: '100%', aspectRatio: '16/9' }}>
                <YouTube
                  key={selectedVideoId}
                  videoId={selectedVideoId}
                  opts={youtubeOptions}
                  onReady={onPlayerReady}
                  onStateChange={onPlayerStateChange}
                  onError={onPlayerError}
                  className="absolute inset-0 w-full h-full"
                  iframeClassName="w-full h-full rounded"
                />
              </div>
            </div>
          )}
        </div>

        <div className="relative w-[5vw] flex-shrink-0">
          {videos.length === 0 && !loading && (
            <div className="text-white text-[0.6vw] p-1">No videos</div>
          )}

          {videos.length > 0 && (
            <Carousel
              orientation="vertical"
              opts={{
                align: "start",
                slidesToScroll: 1,
                dragFree: true,
                containScroll: false,
                skipSnaps: true,
                watchDrag: true,
                axis: "y",
              }}
              className="w-full h-full"
            >
              <CarouselContent className="h-full -mt-1 flex flex-col touch-pan-y overflow-y-auto">
                {videos.map((video, index) => (
                  <CarouselItem
                    key={video.video_id}
                    className="pt-1 basis-auto flex-shrink-0 min-h-0"
                  >
                    <div
                      className={`flex-shrink-0 cursor-pointer rounded overflow-hidden transition-all duration-200 ${
                        selectedVideoIndex === index
                          ? "ring-1 ring-red-500"
                          : "hover:opacity-80"
                      }`}
                      onClick={() => selectVideo(index)}
                    >
                      <div className="relative bg-gray-900 w-[5vw] h-[3vw]">
                        <Image
                          src={video.thumbnail_url}
                          alt={video.title}
                          fill
                          className="object-cover rounded"
                          sizes="5vw"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded">
                          <Play className="w-[0.8vw] h-[0.8vw] text-white" />
                        </div>
                        {/* Playing indicator */}
                        {selectedVideoIndex === index && (
                          <div className="absolute bottom-0.5 right-0.5 bg-red-600 text-white text-[0.4vw] px-0.5 rounded">
                            Playing
                          </div>
                        )}
                      </div>
                      <div className="p-0.5 flex-shrink-0 w-full">
                        <p
                          className="text-[0.5vw] text-white truncate leading-tight"
                          title={video.title}
                        >
                          {video.title}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {videos.length > 3 && (
                <>
                  <CarouselPrevious className="static h-[1vw] w-[1vw] mt-1 mb-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600" />
                  <CarouselNext className="static h-[1vw] w-[1vw] mt-1 mb-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600" />
                </>
              )}
            </Carousel>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default REDSafetyVideoCard;

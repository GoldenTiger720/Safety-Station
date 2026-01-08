"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DepotInductionVideo {
  id: string;
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  createdAt: string;
}

const VideoSection: React.FC = () => {
  const [videos, setVideos] = useState<DepotInductionVideo[]>([]);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/depot-induction");
        if (!response.ok) throw new Error("Failed to fetch videos");
        const data = await response.json();
        setVideos(data.videos || []);
      } catch (err) {
        console.error("Error fetching depot induction videos:", err);
        setError("Failed to load videos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Handle video end - listen for postMessage from YouTube iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only handle YouTube messages
      if (event.origin !== "https://www.youtube.com") return;

      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        // Check if video ended (state 0 = ended)
        if (data.event === "onStateChange" && data.info === 0) {
          // Move to next video
          setSelectedVideoIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % videos.length;
            return nextIndex;
          });
        }
      } catch {
        // Ignore non-JSON messages
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [videos.length]);

  const selectedVideo = videos[selectedVideoIndex] || null;

  const handleVideoSelect = (index: number) => {
    setSelectedVideoIndex(index);
  };

  const handlePrevious = () => {
    if (videos.length === 0) return;
    const prevIndex = selectedVideoIndex > 0 ? selectedVideoIndex - 1 : videos.length - 1;
    setSelectedVideoIndex(prevIndex);
  };

  const handleNext = () => {
    if (videos.length === 0) return;
    const nextIndex = (selectedVideoIndex + 1) % videos.length;
    setSelectedVideoIndex(nextIndex);
  };

  // Build YouTube embed URL with autoplay parameters
  const getYouTubeEmbedUrl = useCallback((videoId: string) => {
    const params = new URLSearchParams({
      autoplay: "1",
      mute: "1",
      controls: "1",
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
      enablejsapi: "1",
      origin: typeof window !== "undefined" ? window.location.origin : "",
    });
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  }, []);

  if (isLoading) {
    return (
      <div className="h-full w-full overflow-hidden">
        <Card className="bg-card border-border h-full flex flex-col">
          <CardHeader className="flex-shrink-0 py-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <PlayCircle className="w-6 h-6" />
              RSRG Videos
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || videos.length === 0) {
    return (
      <div className="h-full w-full overflow-hidden">
        <Card className="bg-card border-border h-full flex flex-col">
          <CardHeader className="flex-shrink-0 py-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <PlayCircle className="w-6 h-6" />
              RSRG Videos
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">
              {error || "No videos available at this time."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden">
      <Card className="bg-card border-border h-full flex flex-col">
        <CardHeader className="flex-shrink-0 py-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            <PlayCircle className="w-6 h-6" />
            RSRG Videos
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0 overflow-hidden p-3 gap-3">
          {/* Main Video Player */}
          {selectedVideo && (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 min-h-0 rounded-lg overflow-hidden bg-black">
                <iframe
                  ref={iframeRef}
                  key={selectedVideo.youtubeId}
                  className="w-full h-full"
                  src={getYouTubeEmbedUrl(selectedVideo.youtubeId)}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <h3 className="font-semibold text-lg mt-2 flex-shrink-0">{selectedVideo.title}</h3>
            </div>
          )}

          {/* Navigation and Video List */}
          {videos.length > 1 && (
            <div className="flex-shrink-0 space-y-3">
              {/* Navigation Buttons */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  {selectedVideoIndex + 1} of {videos.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  className="flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Video Thumbnails List */}
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {videos.map((video, index) => (
                  <button
                    key={video.id}
                    onClick={() => handleVideoSelect(index)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                      selectedVideoIndex === index
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-transparent hover:border-muted-foreground/30"
                    }`}
                  >
                    <div className="aspect-video relative">
                      <Image
                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                        alt={video.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <PlayCircle className="h-6 w-6 text-white" />
                    </div>
                    {/* Playing indicator */}
                    {selectedVideoIndex === index && (
                      <div className="absolute bottom-1 right-1 bg-red-600 text-white text-xs px-1 rounded">
                        Playing
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoSection;

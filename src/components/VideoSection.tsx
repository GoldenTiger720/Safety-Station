"use client";

import React, { useState, useEffect } from "react";
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
  const [selectedVideo, setSelectedVideo] = useState<DepotInductionVideo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/depot-induction");
        if (!response.ok) throw new Error("Failed to fetch videos");
        const data = await response.json();
        setVideos(data.videos || []);
        if (data.videos && data.videos.length > 0) {
          setSelectedVideo(data.videos[0]);
        }
      } catch (err) {
        console.error("Error fetching depot induction videos:", err);
        setError("Failed to load videos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoSelect = (video: DepotInductionVideo) => {
    setSelectedVideo(video);
  };

  const handlePrevious = () => {
    if (!selectedVideo || videos.length === 0) return;
    const currentIndex = videos.findIndex(v => v.id === selectedVideo.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : videos.length - 1;
    setSelectedVideo(videos[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedVideo || videos.length === 0) return;
    const currentIndex = videos.findIndex(v => v.id === selectedVideo.id);
    const nextIndex = currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
    setSelectedVideo(videos[nextIndex]);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <PlayCircle className="w-6 h-6" />
              Depot Induction Videos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || videos.length === 0) {
    return (
      <div className="space-y-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <PlayCircle className="w-6 h-6" />
              Depot Induction Videos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              {error || "No depot induction videos available at this time."}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <PlayCircle className="w-6 h-6" />
            Depot Induction Videos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Video Player */}
          {selectedVideo && (
            <div className="space-y-2">
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <h3 className="font-semibold text-lg">{selectedVideo.title}</h3>
            </div>
          )}

          {/* Navigation and Video List */}
          {videos.length > 1 && (
            <div className="space-y-4">
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
                  {videos.findIndex(v => v.id === selectedVideo?.id) + 1} of {videos.length}
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {videos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => handleVideoSelect(video)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                      selectedVideo?.id === video.id
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
                      <PlayCircle className="h-8 w-8 text-white" />
                    </div>
                    <div className="p-2 bg-card">
                      <p className="text-xs font-medium line-clamp-2">{video.title}</p>
                    </div>
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

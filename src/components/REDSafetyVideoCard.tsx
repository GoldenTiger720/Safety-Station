import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Play } from "lucide-react";
import { YouTubeVideo } from "@/api/dashboard-api";
import YouTube from "react-youtube";

interface REDSafetyVideoCardProps {
  videos: YouTubeVideo[];
  loading: boolean;
  error: string | null;
}

const REDSafetyVideoCard: React.FC<REDSafetyVideoCardProps> = ({ videos, loading, error }) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  useEffect(() => {
    if (videos.length > 0 && !selectedVideoId) {
      setSelectedVideoId(videos[0].video_id);
    }
  }, [videos, selectedVideoId]);

  // YouTube player options
  const youtubeOptions = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      fs: 1,
      playsinline: 1,
      iv_load_policy: 3,
      cc_load_policy: 0,
    },
  };

  // YouTube player event handlers
  const onPlayerReady = (event: any) => {
    // You can add custom logic when player is ready
    console.log('YouTube player ready');
  };

  const onPlayerError = (event: any) => {
    console.error('YouTube player error:', event.data);
  };


  const selectVideo = (videoId: string) => {
    setSelectedVideoId(videoId);
  };

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
        <CardHeader className="pb-3 bg-gray-900 flex-shrink-0">
          <CardTitle className="text-lg xl:text-[2.5vw] text-white text-right">RED Safety Video</CardTitle>
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
          <CardTitle className="text-lg xl:text-[2.5vw] text-white text-right">RED Safety Video</CardTitle>
        </CardHeader>
        <CardContent className="p-3 flex-1 flex items-center justify-center">
          <p className="text-white">{error || 'No videos available'}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700 flex flex-col">
      <CardHeader className="pb-0.5 py-[1vw] bg-gray-900 flex-shrink-0">
        <CardTitle className="text-[2.5vw] text-white text-right">RED Safety Video</CardTitle>
      </CardHeader>
      <CardContent className="p-1 flex-1 flex gap-1">
        {/* Main video player */}
        <div className="bg-black rounded overflow-hidden flex-1 min-h-[60px] aspect-video flex items-center justify-center">
          {selectedVideoId && (
            <YouTube
              videoId={selectedVideoId}
              opts={youtubeOptions}
              onReady={onPlayerReady}
              onError={onPlayerError}
              className="w-full h-full"
              iframeClassName="w-full h-full rounded object-contain"
            />
          )}
        </div>

        <div className="relative w-16 sm:w-20 xl:w-[8vw] h-full">
          {videos.length === 0 && !loading && (
            <div className="text-white text-[8px] p-1">No videos</div>
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
                {videos.map((video) => (
                  <CarouselItem key={video.video_id} className="pt-1 basis-auto flex-shrink-0 min-h-0">
                    <div
                      className={`flex-shrink-0 cursor-pointer rounded overflow-hidden transition-all duration-200 ${
                        selectedVideoId === video.video_id
                          ? 'ring-1 ring-red-500'
                          : 'hover:opacity-80'
                      }`}
                      onClick={() => selectVideo(video.video_id)}
                    >
                      <div className="relative bg-gray-900 w-12 sm:w-16 xl:w-[8vw] h-8 sm:h-10 xl:h-[6vw]">
                        <img
                          src={video.thumbnail_url}
                          alt={video.title}
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
                        <p className="text-[4px] sm:text-[5px] text-white truncate leading-tight" title={video.title}>
                          {video.title}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {videos.length > 3 && (
                <>
                  <CarouselPrevious className="static h-4 w-4 mt-1 mb-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600" />
                  <CarouselNext className="static h-4 w-4 mt-1 mb-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600" />
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
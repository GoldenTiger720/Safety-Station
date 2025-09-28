import React from "react";
import YouTube from "react-youtube";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const REDSafetyVideoCard = () => {
  // YouTube video options
  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      enablejsapi: 1,
      origin: window.location.origin,
    },
  };

  // Event handlers
  const onReady = (event: any) => {
    // The player is ready and we can interact with it
    console.log('YouTube player is ready');
  };

  const onError = (event: any) => {
    console.error('YouTube player error:', event);
  };

  return (
    <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
      <CardHeader className="pb-3 bg-gray-900 flex-shrink-0">
        <CardTitle className="text-lg text-white text-right">RED Safety Video</CardTitle>
      </CardHeader>
      <CardContent className="p-3 flex-1 flex items-center">
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video w-full">
          <YouTube
            videoId="dQw4w9WgXcQ" // Default video ID - replace with actual Rhomberg Sersa video ID
            opts={opts}
            onReady={onReady}
            onError={onError}
            className="w-full h-full"
            iframeClassName="w-full h-full rounded-lg"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default REDSafetyVideoCard;
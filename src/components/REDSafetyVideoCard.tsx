import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const REDSafetyVideoCard = () => {
  return (
    <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
      <CardHeader className="pb-3 bg-gray-900 flex-shrink-0">
        <CardTitle className="text-lg text-white text-right">RED Safety Video</CardTitle>
      </CardHeader>
      <CardContent className="p-3 flex-1 flex items-center">
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video w-full">
          <video
            className="w-full h-full object-cover"
            controls
            poster="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
              type="video/mp4"
            />
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.webm"
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </CardContent>
    </Card>
  );
};

export default REDSafetyVideoCard;
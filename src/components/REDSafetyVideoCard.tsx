import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const REDSafetyVideoCard = () => {
  return (
    <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
      <CardHeader className="pb-3 bg-gray-900 flex-shrink-0">
        <CardTitle className="text-lg text-white">RED Safety Video</CardTitle>
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
          
          {/* Video Title Overlay */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-3 pointer-events-none">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-1">Safety First</h2>
              <p className="text-sm text-gray-300 mb-2">RED Initiative Training</p>
              <div className="flex items-center justify-center gap-4 text-white text-xs">
                <span>Rail Safety</span>
                <div className="w-px h-4 bg-gray-400"></div>
                <span>Depot Operations</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default REDSafetyVideoCard;
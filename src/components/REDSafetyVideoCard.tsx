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
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/@RhombergSersaRailGroup/"
            title="Rhomberg Sersa Rail Group Safety Videos"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default REDSafetyVideoCard;
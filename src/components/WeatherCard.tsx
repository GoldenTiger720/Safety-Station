"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WeatherCard: React.FC = () => {
  return (
    <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
      <CardHeader className="pb-0.5 py-[1vw] bg-gray-900 flex-shrink-0">
        <CardTitle className="text-[2.5vw] text-white text-right">
          Weather Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="p-1 flex-1">
        <div className="w-full h-full bg-white rounded">
          <iframe
            src="https://www.met.ie/weather-forecast/kildare-kildare#forecasts"
            className="w-full h-full border-0 rounded"
            title="Weather Forecast - Kildare"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;

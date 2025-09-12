import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, Volume2, Maximize2 } from 'lucide-react';

const RSRGVideoCard = () => {
  return (
    <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
      <CardHeader className="pb-3 bg-gray-900 flex-shrink-0">
        <CardTitle className="text-lg text-white">RSRG Video</CardTitle>
      </CardHeader>
      <CardContent className="p-3 flex-1 flex items-center">
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video w-full">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">CORK LINE</h2>
              <p className="text-lg text-gray-300 mb-4">Rehabilitation Project</p>
              <div className="flex items-center justify-center gap-6 text-white">
                <span className="text-sm font-medium">RHOMBERG SERSA</span>
                <div className="w-px h-6 bg-gray-600"></div>
                <span className="text-sm font-medium">Iarnród Éireann Irish Rail</span>
              </div>
            </div>
          </div>
          
          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <div className="flex items-center gap-3">
              <button className="text-white hover:text-gray-300 transition-colors">
                <Play className="w-5 h-5" />
              </button>
              <div className="flex-1">
                <div className="relative">
                  <div className="h-1 bg-gray-600 rounded-full">
                    <div className="h-1 bg-white rounded-full w-0"></div>
                  </div>
                </div>
              </div>
              <span className="text-xs text-white">0:00 / 2:45</span>
              <button className="text-white hover:text-gray-300 transition-colors">
                <Volume2 className="w-4 h-4" />
              </button>
              <button className="text-white hover:text-gray-300 transition-colors">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RSRGVideoCard;
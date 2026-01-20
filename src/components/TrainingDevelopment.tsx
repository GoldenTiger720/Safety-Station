"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Video, FileText, Upload, BookOpen } from "lucide-react";

interface TrainingDevelopmentProps {
  onBack: () => void;
}

const TrainingDevelopment: React.FC<TrainingDevelopmentProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("videos");

  return (
    <div className="h-full w-full flex flex-col bg-gray-900 p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Button>
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-green-500" />
          <h1 className="text-[1.5vw] font-bold text-white">Training & Development</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="bg-gray-800 border-b border-gray-700 flex-shrink-0 w-full justify-start rounded-none h-auto p-0">
            <TabsTrigger
              value="videos"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300 px-6 py-3 text-[1.1vw] rounded-none border-b-2 border-transparent data-[state=active]:border-green-500"
            >
              <Video className="w-5 h-5 mr-2" />
              Training Videos
            </TabsTrigger>
            <TabsTrigger
              value="instructions"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300 px-6 py-3 text-[1.1vw] rounded-none border-b-2 border-transparent data-[state=active]:border-green-500"
            >
              <FileText className="w-5 h-5 mr-2" />
              Work Instructions
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300 px-6 py-3 text-[1.1vw] rounded-none border-b-2 border-transparent data-[state=active]:border-green-500"
            >
              <Upload className="w-5 h-5 mr-2" />
              Documents
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 min-h-0 overflow-hidden mt-4">
            <TabsContent value="videos" className="h-full m-0">
              <Card className="bg-gray-800 border-gray-700 h-full">
                <CardHeader className="py-3 bg-gray-900">
                  <CardTitle className="text-[1.2vw] text-white flex items-center gap-2">
                    <Video className="w-5 h-5 text-green-500" />
                    Training Videos
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-60px)] flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-[1.2vw]">Training Videos</p>
                    <p className="text-[0.9vw] mt-2 text-gray-500">
                      Training video content will be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instructions" className="h-full m-0">
              <Card className="bg-gray-800 border-gray-700 h-full">
                <CardHeader className="py-3 bg-gray-900">
                  <CardTitle className="text-[1.2vw] text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-500" />
                    Work Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-60px)] flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-[1.2vw]">Work Instructions</p>
                    <p className="text-[0.9vw] mt-2 text-gray-500">
                      Work instruction documents will be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="h-full m-0">
              <Card className="bg-gray-800 border-gray-700 h-full">
                <CardHeader className="py-3 bg-gray-900">
                  <CardTitle className="text-[1.2vw] text-white flex items-center gap-2">
                    <Upload className="w-5 h-5 text-green-500" />
                    Temporary Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-60px)] flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Upload className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-[1.2vw]">Temporary Documents</p>
                    <p className="text-[0.9vw] mt-2 text-gray-500">
                      Upload and view temporary PDF documents here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default TrainingDevelopment;

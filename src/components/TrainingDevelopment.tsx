"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  Video,
  FileText,
  Upload,
  BookOpen,
  ExternalLink,
  Download,
  Loader2,
} from "lucide-react";

interface TrainingContent {
  id: number;
  contentType: string;
  title: string;
  description: string | null;
  linkUrl: string | null;
  pdfData: string | null;
  pdfFilename: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TrainingDevelopmentProps {
  onBack: () => void;
}

const TrainingDevelopment: React.FC<TrainingDevelopmentProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("videos");
  const [isLoading, setIsLoading] = useState(true);
  const [trainingVideos, setTrainingVideos] = useState<TrainingContent[]>([]);
  const [workInstructions, setWorkInstructions] = useState<TrainingContent[]>([]);
  const [documents, setDocuments] = useState<TrainingContent[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<TrainingContent | null>(null);

  useEffect(() => {
    fetchTrainingContent();
  }, []);

  const fetchTrainingContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/training-content");
      if (!response.ok) throw new Error("Failed to fetch training content");
      const data = await response.json();

      if (data.success) {
        setTrainingVideos(data.trainingVideos || []);
        setWorkInstructions(data.workInstructions || []);
        setDocuments(data.documents || []);
      }
    } catch (error) {
      console.error("Error fetching training content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLinkContent = (items: TrainingContent[], icon: React.ReactNode, emptyMessage: string) => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 animate-spin text-green-500" />
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="text-center text-gray-400 py-8">
          {icon}
          <p className="text-[1.2vw] mt-4">No content available</p>
          <p className="text-[0.9vw] mt-2 text-gray-500">{emptyMessage}</p>
        </div>
      );
    }

    return (
      <ScrollArea className="h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.linkUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="bg-gray-700 border-gray-600 hover:bg-gray-600 transition-colors cursor-pointer h-full">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-[1vw] mb-2">{item.title}</h3>
                      {item.description && (
                        <p className="text-gray-400 text-[0.85vw] line-clamp-2">{item.description}</p>
                      )}
                    </div>
                    <ExternalLink className="w-5 h-5 text-green-500 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </ScrollArea>
    );
  };

  const renderPdfContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 animate-spin text-green-500" />
        </div>
      );
    }

    if (workInstructions.length === 0) {
      return (
        <div className="text-center text-gray-400 py-8">
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-[1.2vw]">No work instructions available</p>
          <p className="text-[0.9vw] mt-2 text-gray-500">
            Work instruction documents will be displayed here
          </p>
        </div>
      );
    }

    if (selectedPdf) {
      return (
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-3 bg-gray-900 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPdf(null)}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to List
              </Button>
              <span className="text-white font-medium">{selectedPdf.title}</span>
            </div>
            {selectedPdf.pdfData && (
              <a
                href={selectedPdf.pdfData}
                download={selectedPdf.pdfFilename || "document.pdf"}
              >
                <Button variant="outline" size="sm" className="border-gray-600">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </a>
            )}
          </div>
          <div className="flex-1 min-h-0">
            {selectedPdf.pdfData && (
              <iframe
                src={selectedPdf.pdfData}
                className="w-full h-full border-0"
                title={selectedPdf.title}
              />
            )}
          </div>
        </div>
      );
    }

    return (
      <ScrollArea className="h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {workInstructions.map((item) => (
            <Card
              key={item.id}
              className="bg-gray-700 border-gray-600 hover:bg-gray-600 transition-colors cursor-pointer h-full"
              onClick={() => setSelectedPdf(item)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-900/50 rounded">
                    <FileText className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-[1vw] mb-1 truncate">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-gray-400 text-[0.85vw] line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    {item.pdfFilename && (
                      <p className="text-gray-500 text-[0.75vw] mt-1 truncate">
                        {item.pdfFilename}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    );
  };

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
                <CardContent className="h-[calc(100%-60px)] p-0">
                  {renderLinkContent(
                    trainingVideos,
                    <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />,
                    "Training video links will be displayed here"
                  )}
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
                <CardContent className="h-[calc(100%-60px)] p-0">
                  {renderPdfContent()}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="h-full m-0">
              <Card className="bg-gray-800 border-gray-700 h-full">
                <CardHeader className="py-3 bg-gray-900">
                  <CardTitle className="text-[1.2vw] text-white flex items-center gap-2">
                    <Upload className="w-5 h-5 text-green-500" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-60px)] p-0">
                  {renderLinkContent(
                    documents,
                    <Upload className="w-16 h-16 mx-auto mb-4 opacity-50" />,
                    "Document links will be displayed here"
                  )}
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

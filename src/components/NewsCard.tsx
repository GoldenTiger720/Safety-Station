"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNews } from "@/hooks/use-news";
import type { NewsItem } from "@/types";
import { Loader2, ExternalLink, X } from "lucide-react";

const NewsCard = () => {
  const { data, isLoading, error } = useNews();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewsClick = (item: NewsItem) => {
    if (item.news_link) {
      setSelectedNews(item);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
        <CardHeader className="pb-0.5 py-[1vw] bg-gray-900 flex-shrink-0">
          <CardTitle className="text-[2.5vw] text-white">News</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
        <CardHeader className="pb-0.5 py-[1vw] bg-gray-900 flex-shrink-0">
          <CardTitle className="text-[2.5vw] text-white">News</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <p className="text-red-400 text-sm">Failed to load news</p>
        </CardContent>
      </Card>
    );
  }

  const newsItems = data?.news || [];

  // Empty state
  if (newsItems.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
        <CardHeader className="pb-0.5 py-[1vw] bg-gray-900 flex-shrink-0">
          <CardTitle className="text-[2.5vw] text-white">News</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <p className="text-gray-400 text-sm">No news available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
        <CardHeader className="pb-0.5 py-[1vw] bg-gray-900 flex-shrink-0">
          <CardTitle className="text-[2.5vw] text-white">News</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 p-2 flex-shrink-0">
          {newsItems.slice(0, 2).map((item) => (
            <div
              key={item.id}
              onClick={() => handleNewsClick(item)}
              className={`bg-white rounded p-1 sm:p-1.5 flex gap-1 sm:gap-2 xl:gap-5 ${
                item.news_link
                  ? "cursor-pointer hover:bg-gray-50 transition-colors"
                  : ""
              }`}
            >
              <div className="flex-shrink-0 relative h-[7vw] w-[7vw]">
                {item.image_data ? (
                  <img
                    src={item.image_data}
                    alt={item.title}
                    className="rounded object-cover bg-gray-200 w-full h-full"
                  />
                ) : (
                  <div className="rounded bg-gray-200 w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 text-xs">No image</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h3 className="text-[8px] sm:text-[10px] xl:text-[1.5vw] font-semibold text-gray-900 mb-0.5 leading-tight line-clamp-1">
                  {item.title}
                  {item.news_link && (
                    <ExternalLink className="inline-block ml-1 h-2 w-2 sm:h-3 sm:w-3 text-blue-500" />
                  )}
                </h3>
                <p className="text-[6px] sm:text-[8px] xl:text-[1vw] text-gray-600 line-clamp-2 leading-tight">
                  {item.description}
                </p>
                <div className="flex items-center gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full relative overflow-hidden">
                    {item.avatar_data ? (
                      <img
                        src={item.avatar_data}
                        alt={item.poster_name || "user"}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Image
                        src="/user.jpeg"
                        alt="user"
                        fill
                        className="object-cover"
                        sizes="12px"
                      />
                    )}
                  </div>
                  <span className="text-[6px] sm:text-[8px] text-gray-500">
                    {item.poster_name || "Unknown"}
                    {item.poster_title && ` - ${item.poster_title}`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modal for displaying news link in iframe */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] w-[90vw] h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="px-4 py-3 border-b bg-gray-100 flex flex-row items-center justify-between">
            <DialogTitle className="text-lg font-semibold truncate pr-8 text-black">
              {selectedNews?.title}
            </DialogTitle>
            <button
              onClick={closeModal}
              className="absolute right-4 top-3 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-5 w-5 text-black" />
              <span className="sr-only">Close</span>
            </button>
          </DialogHeader>
          <div className="flex-1 w-full h-[calc(90vh-60px)]">
            {selectedNews?.news_link && (
              <iframe
                src={selectedNews.news_link}
                title={selectedNews.title}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewsCard;

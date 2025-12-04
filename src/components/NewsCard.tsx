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
        <CardHeader className="pb-0.5 py-1 bg-gray-900 flex-shrink-0">
          <CardTitle className="text-[1.2vw] text-white">News</CardTitle>
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
        <CardHeader className="pb-0.5 py-1 bg-gray-900 flex-shrink-0">
          <CardTitle className="text-[1.2vw] text-white">News</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <p className="text-red-400 text-[0.8vw]">Failed to load news</p>
        </CardContent>
      </Card>
    );
  }

  const newsItems = data?.news || [];

  // Empty state
  if (newsItems.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
        <CardHeader className="pb-0.5 py-1 bg-gray-900 flex-shrink-0">
          <CardTitle className="text-[1.2vw] text-white">News</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <p className="text-gray-400 text-[0.8vw]">No news available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="h-full w-full">
      <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
        <CardHeader className="pb-0.5 py-1 bg-gray-900 flex-shrink-0">
          <CardTitle className="text-[1.2vw] text-white">News</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 p-2 overflow-y-auto space-y-2">
          {newsItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNewsClick(item)}
              className={`bg-white rounded p-2 flex gap-3 ${
                item.news_link
                  ? "cursor-pointer hover:bg-gray-50 transition-colors"
                  : ""
              }`}
            >
              <div className="flex-shrink-0 relative h-[5vw] w-[5vw]">
                {item.image_data ? (
                  <Image
                    src={item.image_data}
                    alt={item.title}
                    fill
                    className="rounded object-cover bg-gray-200"
                    unoptimized
                  />
                ) : (
                  <div className="rounded bg-gray-200 w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 text-[0.6vw]">No image</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h3 className="text-[0.9vw] font-semibold text-gray-900 mb-0.5 leading-tight line-clamp-1">
                  {item.title}
                  {item.news_link && (
                    <ExternalLink className="inline-block ml-1 h-[0.8vw] w-[0.8vw] text-blue-500" />
                  )}
                </h3>
                <p className="text-[0.7vw] text-gray-600 line-clamp-2 leading-tight">
                  {item.description}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-[1vw] h-[1vw] bg-gray-300 rounded-full relative overflow-hidden">
                    {item.avatar_data ? (
                      <Image
                        src={item.avatar_data}
                        alt={item.poster_name || "user"}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <Image
                        src="/user.jpeg"
                        alt="user"
                        fill
                        className="object-cover"
                        sizes="1vw"
                      />
                    )}
                  </div>
                  <span className="text-[0.6vw] text-gray-500">
                    {item.poster_name || "Unknown"}
                    {item.poster_title && ` - ${item.poster_title}`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modal for displaying news details */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white">
          <DialogHeader className="px-6 py-4 border-b bg-gray-50 flex flex-row items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-black pr-8">
              {selectedNews?.title}
            </DialogTitle>
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-5 w-5 text-black" />
              <span className="sr-only">Close</span>
            </button>
          </DialogHeader>
          <div className="p-6">
            {/* News Image */}
            {selectedNews?.image_data && (
              <div className="mb-4 rounded-lg overflow-hidden relative h-48">
                <Image
                  src={selectedNews.image_data}
                  alt={selectedNews.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            {/* Description */}
            <p className="text-gray-700 text-base mb-6 leading-relaxed">
              {selectedNews?.description}
            </p>

            {/* Poster Info */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden relative">
                {selectedNews?.avatar_data ? (
                  <Image
                    src={selectedNews.avatar_data}
                    alt={selectedNews.poster_name || "user"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <Image
                    src="/user.jpeg"
                    alt="user"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {selectedNews?.poster_name || "Unknown"}
                </p>
                {selectedNews?.poster_title && (
                  <p className="text-sm text-gray-500">{selectedNews.poster_title}</p>
                )}
              </div>
            </div>

            {/* Open Link Button */}
            {selectedNews?.news_link && (
              <a
                href={selectedNews.news_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
                Open Full Article
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewsCard;

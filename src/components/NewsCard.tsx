import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

const NewsCard = () => {
  const newsItems = [
    {
      id: 1,
      title: "The Inside Track: June",
      description:
        "Read the latest edition of our newsletter featuring company news and updates for the month of June",
      date: "Add Kennedy",
      image:
        "https://images.unsplash.com/photo-1527295110-5145f6b148d0?fm=jpg&q=60&w=400&ixlib=rb-4.1.0",
    },
    {
      id: 2,
      title: "The Inside Track: May",
      description:
        "Get updates on our business, exciting projects for our teams and news from the depot community hub at the month of May",
      date: "Add Kennedy",
      image:
        "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?fm=jpg&q=60&w=400&ixlib=rb-4.1.0",
    },
    {
      id: 3,
      title: "The Inside Track: March",
      description:
        "Highlights from each week along with stories about our projects and data across Brookwood depot for the month of March",
      date: "Add Kennedy",
      image:
        "https://images.unsplash.com/photo-1501704163333-86d3832cd4ea?fm=jpg&q=60&w=400&ixlib=rb-4.1.0",
    },
  ];

  return (
    <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
      <CardHeader className="pb-0.5 py-1 bg-gray-900 flex-shrink-0">
        <CardTitle className="text-xs text-white">News</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 p-2 flex-1 overflow-auto">
        {newsItems.slice(0, 2).map((item) => (
          <div key={item.id} className="bg-white rounded p-1 sm:p-1.5 flex gap-1 sm:gap-2">
            <div className="flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-8 h-8 sm:w-12 sm:h-12 rounded object-cover bg-gray-200"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[8px] sm:text-[10px] font-semibold text-gray-900 mb-0.5 leading-tight line-clamp-1">
                {item.title}
              </h3>
              <p className="text-[6px] sm:text-[8px] text-gray-600 line-clamp-2 leading-tight">
                {item.description}
              </p>
              <div className="flex items-center gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
                <img
                  src="/user.jpeg"
                  alt="user"
                  className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"
                />
                <span className="text-[6px] sm:text-[8px] text-gray-500">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NewsCard;

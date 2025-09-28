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
      <CardHeader className="pb-3 bg-gray-900 flex-shrink-0">
        <CardTitle className="text-md text-white">News</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-3 flex-1 overflow-auto">
        {newsItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-3 flex gap-3">
            <div className="flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 rounded object-cover bg-gray-200"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1 leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2 leading-tight">
                  {item.description}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <img
                  src="/user.jpeg"
                  alt="user"
                  className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center"
                />
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NewsCard;

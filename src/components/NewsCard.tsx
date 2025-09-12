import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

const NewsCard = () => {
  const newsItems = [
    {
      id: 1,
      title: "The Inside Track: June",
      description: "Read the latest edition of our newsletter featuring company news and updates for the month of June",
      date: "Add Kennedy",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "The Inside Track: May",
      description: "Get updates on our business, exciting projects for our teams and news from the depot community hub at the month of May",
      date: "Add Kennedy",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "The Inside Track: March",
      description: "Highlights from each week along with stories about our projects and data across Brookwood depot for the month of March",
      date: "Add Kennedy",
      image: "/placeholder.svg"
    }
  ];

  return (
    <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
      <CardHeader className="pb-3 bg-gray-900 flex-shrink-0">
        <CardTitle className="text-lg text-white">News</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-3 flex-1 overflow-auto">
        {newsItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-3 flex gap-3">
            <div className="flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-20 h-14 rounded object-cover bg-gray-200"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-600 line-clamp-2 mb-2">{item.description}</p>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-gray-600" />
                </div>
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
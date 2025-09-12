import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, TrendingUp } from "lucide-react";
import NewsCard from "@/components/NewsCard";
import RSRGVideoCard from "@/components/RSRGVideoCard";

const PerformanceDashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
      {/* News and Video Section */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        <div className="flex-1">
          <NewsCard />
        </div>
        <div className="flex-1">
          <RSRGVideoCard />
        </div>
      </div>

      {/* Performance Highlights */}
      <div className="lg:col-span-3">
        <Card className="bg-gray-800 border-gray-700 h-full">
          <CardHeader className="pb-3 bg-gray-900">
            <CardTitle className="text-lg text-white text-right">
              Performance Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-gray-800 space-y-2 p-3">
            {/* Top Section with Headers and Data */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Spotlight Reporting */}
              <div className="space-y-3">
                <div className="bg-gray-200 rounded-lg p-3 text-center">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Spotlight Reporting
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white border border-gray-200 p-3 rounded text-center">
                    <div className="text-2xl font-bold text-gray-800">81</div>
                    <div className="text-xs text-gray-600">Spotlights YTD</div>
                  </div>
                  <div className="bg-white border border-gray-200 p-3 rounded text-center">
                    <div className="text-2xl font-bold text-gray-800">2</div>
                    <div className="text-xs text-gray-600">Spotlights MTD</div>
                  </div>
                </div>
              </div>

              {/* Safety Tours */}
              <div className="space-y-3">
                <div className="bg-gray-200 rounded-lg p-3 text-center">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Safety Tours
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white border border-gray-200 p-3 rounded text-center">
                    <div className="text-2xl font-bold text-gray-800">7.59</div>
                    <div className="text-xs text-gray-600">Safety Tour YTD</div>
                  </div>
                  <div className="bg-white border border-gray-200 p-3 rounded text-center">
                    <div className="text-2xl font-bold text-gray-800">7.33</div>
                    <div className="text-xs text-gray-600">Safety Tour MTD</div>
                  </div>
                </div>
              </div>

              {/* Possession Utilisation */}
              <div className="space-y-3">
                <div className="bg-gray-200 rounded-lg p-3 text-center">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Possession Utilisation
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white border border-gray-200 p-3 rounded text-center">
                    <div className="text-2xl font-bold text-gray-800">63</div>
                    <div className="text-xs text-gray-600">Average</div>
                  </div>
                  <div className="bg-white border border-gray-200 p-3 rounded text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      218.42
                    </div>
                    <div className="text-xs text-gray-600">Ave Work p/h</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Charts Row */}
            <div className="grid grid-cols-3 gap-4">
              {/* In Process Donut Chart */}
              <div className="bg-white border border-gray-200 p-4 rounded-lg flex flex-col items-center relative">
                <div className="flex justify-between text-xs text-gray-600 mb-2 w-full">
                  <span>7</span>
                  <span>26</span>
                  <span>1</span>
                  <span>7</span>
                </div>
                <div className="text-xs text-gray-600 mb-2 self-start">
                  Overdue 29
                </div>
                <div className="relative w-20 h-20 mb-4">
                  <svg className="w-20 h-20 transform -rotate-90">
                    {/* Red segment (large) */}
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="#ef4444"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray="80 75"
                      strokeDashoffset="0"
                    />
                    {/* Yellow segment (smaller) */}
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="#facc15"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray="75 80"
                      strokeDashoffset="-80"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium text-gray-800 mb-1">
                    In Process
                  </div>
                </div>
                <div className="absolute bottom-2 right-2">
                  <div className="text-sm font-bold text-red-500">-82.55</div>
                </div>
              </div>

              {/* Possession Donut Chart */}
              <div className="bg-white border border-gray-200 p-4 rounded-lg flex flex-col items-center justify-between">
                <div className="text-xs text-gray-600 mb-2 self-start">
                  Possession
                </div>
                <div className="relative w-20 h-20 mb-2">
                  <svg className="w-20 h-20 transform -rotate-90">
                    {/* Blue segment (about 80%) */}
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="#3b82f6"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray="160 40"
                      strokeDashoffset="0"
                    />
                    {/* Light blue/gray background for remaining */}
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray="40 160"
                      strokeDashoffset="-160"
                    />
                  </svg>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-xs font-medium text-gray-800">
                    Depot 1
                  </div>
                  <div className="text-xs text-blue-600">Maintenance</div>
                  <div className="text-sm font-bold text-gray-800">9</div>
                </div>
              </div>

              {/* Preparation Donut Chart */}
              <div className="bg-white border border-gray-200 p-4 rounded-lg flex flex-col items-center justify-between">
                <div className="flex justify-between text-xs text-gray-600 mb-2 w-full">
                  <span>Preparation</span>
                  <span>Breakdown</span>
                </div>
                <div className="relative w-20 h-20 mb-2">
                  <svg className="w-20 h-20 transform -rotate-90">
                    {/* Purple segment (larger portion) */}
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="#8b5cf6"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray="120 81"
                      strokeDashoffset="0"
                    />
                    {/* Orange segment (smaller portion) */}
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="#f97316"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray="81 120"
                      strokeDashoffset="-120"
                    />
                  </svg>
                </div>
                <div className="text-center space-y-1">
                  <div className="flex justify-between text-xs w-full">
                    <span className="text-purple-600">Working</span>
                    <span className="text-gray-600">Travel</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* In Depot */}
      <div className="lg:col-span-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-foreground">In Depot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-depot-surface rounded-lg">
                <Users className="w-6 h-6 text-depot-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Staff Present
                  </p>
                  <p className="text-xs text-muted-foreground">
                    24 staff members checked in
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-depot-surface rounded-lg">
                <Activity className="w-6 h-6 text-depot-success" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Active Operations
                  </p>
                  <p className="text-xs text-muted-foreground">
                    3 maintenance tasks ongoing
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-depot-surface rounded-lg">
                <TrendingUp className="w-6 h-6 text-depot-warning" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Performance
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Above target this week
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceDashboard;

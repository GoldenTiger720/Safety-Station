import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Activity, TrendingUp } from 'lucide-react';
import NewsCard from '@/components/NewsCard';
import RSRGVideoCard from '@/components/RSRGVideoCard';

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
        <Card className="bg-card border-border h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-foreground">Performance Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Top Section with Headers and Data */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Spotlight Reporting */}
              <div className="space-y-3">
                <div className="bg-gray-200 rounded-lg p-3 text-center">
                  <h3 className="text-sm font-semibold text-gray-700">Spotlight Reporting</h3>
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
                  <h3 className="text-sm font-semibold text-gray-700">Safety Tours</h3>
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
                  <h3 className="text-sm font-semibold text-gray-700">Possession Utilisation</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white border border-gray-200 p-3 rounded text-center">
                    <div className="text-2xl font-bold text-gray-800">63</div>
                    <div className="text-xs text-gray-600">Average</div>
                  </div>
                  <div className="bg-white border border-gray-200 p-3 rounded text-center">
                    <div className="text-2xl font-bold text-gray-800">218.42</div>
                    <div className="text-xs text-gray-600">Ave Work p/h</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Charts Row */}
            <div className="grid grid-cols-3 gap-4">
              {/* In Process Chart */}
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <div className="flex justify-between text-xs text-gray-600 mb-4">
                  <span>7</span>
                  <span>26</span>
                  <span>1</span>
                  <span>7</span>
                </div>
                <div className="text-xs text-gray-600 mb-2">Overdue 29</div>
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="36" stroke="#e5e7eb" strokeWidth="12" fill="none"/>
                    <circle cx="48" cy="48" r="36" stroke="#ef4444" strokeWidth="12" fill="none" 
                            strokeDasharray="226" strokeDashoffset="56" strokeLinecap="round"/>
                    <circle cx="48" cy="48" r="36" stroke="#facc15" strokeWidth="12" fill="none" 
                            strokeDasharray="226" strokeDashoffset="170" strokeLinecap="round"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-800">9</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-800">In Process</div>
                  <div className="text-lg font-bold text-red-500">-82.55</div>
                </div>
              </div>

              {/* Possession Chart */}
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="36" stroke="#e5e7eb" strokeWidth="12" fill="none"/>
                    <circle cx="48" cy="48" r="36" stroke="#3b82f6" strokeWidth="12" fill="none" 
                            strokeDasharray="226" strokeDashoffset="113" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-xs text-gray-600">Possession</div>
                  <div className="text-xs font-medium text-gray-800">Depot 1</div>
                  <div className="text-xs text-blue-600">Maintenance</div>
                  <div className="text-sm font-bold text-gray-800">9</div>
                </div>
              </div>

              {/* Preparation Chart */}
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="36" stroke="#e5e7eb" strokeWidth="12" fill="none"/>
                    <circle cx="48" cy="48" r="36" stroke="#8b5cf6" strokeWidth="12" fill="none" 
                            strokeDasharray="226" strokeDashoffset="90" strokeLinecap="round"/>
                    <circle cx="48" cy="48" r="36" stroke="#f97316" strokeWidth="12" fill="none" 
                            strokeDasharray="226" strokeDashoffset="180" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-xs text-purple-600">Preparation</div>
                  <div className="text-xs text-orange-600">Breakdown</div>
                  <div className="text-xs text-purple-600">Working</div>
                  <div className="text-xs text-gray-600">Travel</div>
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
                  <p className="text-sm font-medium text-foreground">Staff Present</p>
                  <p className="text-xs text-muted-foreground">24 staff members checked in</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-depot-surface rounded-lg">
                <Activity className="w-6 h-6 text-depot-success" />
                <div>
                  <p className="text-sm font-medium text-foreground">Active Operations</p>
                  <p className="text-xs text-muted-foreground">3 maintenance tasks ongoing</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-depot-surface rounded-lg">
                <TrendingUp className="w-6 h-6 text-depot-warning" />
                <div>
                  <p className="text-sm font-medium text-foreground">Performance</p>
                  <p className="text-xs text-muted-foreground">Above target this week</p>
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
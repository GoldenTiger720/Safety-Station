import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import NewsCard from "@/components/NewsCard";
import RSRGVideoCard from "@/components/RSRGVideoCard";

const PerformanceDashboard = () => {
  // Enhanced data for the donut charts with updated structure
  const inProcessData = [
    { name: "Critical", value: 65, color: "#ef4444", label: "Red" },
    { name: "Warning", value: 35, color: "#facc15", label: "Yellow" },
  ];

  const possessionData = [
    { name: "Active", value: 75, color: "#3b82f6", label: "Blue" },
    { name: "Inactive", value: 25, color: "#e5e7eb", label: "Gray" },
  ];

  const preparationData = [
    { name: "Preparation", value: 55, color: "#8b5cf6", label: "Purple" },
    { name: "Breakdown", value: 45, color: "#f97316", label: "Orange" },
  ];

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
        <Card className="bg-gray-800 border-gray-700 h-full relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80")',
            }}
          ></div>
          <CardHeader className="pb-3 bg-gray-900/80 relative z-10">
            <CardTitle className="text-lg text-white text-right">
              Performance Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-3 relative z-10">
            {/* Top Section with Headers and Data */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Spotlight Reporting */}
              <div className="space-y-3">
                <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                  <h3 className="text-lg font-bold text-black">
                    Spotlight Reporting
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white bg-opacity-85 border border-gray-200 p-3 rounded text-center">
                    <div className="text-4xl font-bold text-gray-800">81</div>
                    <div className="text-xs text-gray-600">Spotlights YTD</div>
                  </div>
                  <div className="bg-white bg-opacity-85 border border-gray-200 p-3 rounded text-center">
                    <div className="text-4xl font-bold text-gray-800">2</div>
                    <div className="text-xs text-gray-600">Spotlights MTD</div>
                  </div>
                </div>
              </div>

              {/* Safety Tours */}
              <div className="space-y-3">
                <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                  <h3 className="text-lg font-bold text-black">Safety Tours</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white bg-opacity-85 border border-gray-200 p-3 rounded text-center">
                    <div className="text-4xl font-bold text-gray-800">7.59</div>
                    <div className="text-xs text-gray-600">Safety Tour YTD</div>
                  </div>
                  <div className="bg-white bg-opacity-85 border border-gray-200 p-3 rounded text-center">
                    <div className="text-4xl font-bold text-gray-800">7.33</div>
                    <div className="text-xs text-gray-600">Safety Tour MTD</div>
                  </div>
                </div>
              </div>

              {/* Possession Utilisation */}
              <div className="space-y-3">
                <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                  <h3 className="text-lg font-bold text-black">
                    Possession Utilisation
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white bg-opacity-85 border border-gray-200 p-3 rounded text-center">
                    <div className="text-4xl font-bold text-gray-800">63</div>
                    <div className="text-xs text-gray-600">Average</div>
                  </div>
                  <div className="bg-white bg-opacity-85 border border-gray-200 p-3 rounded text-center">
                    <div className="text-4xl font-bold text-gray-800">
                      218.42
                    </div>
                    <div className="text-xs text-gray-600">Ave Work p/h</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pie Charts Section */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {/* In Process Chart */}
              <div className="bg-white bg-opacity-60 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-black text-center mb-3">
                  In Process Status
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={inProcessData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {inProcessData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-2">
                  {inProcessData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="text-xs text-black">
                        {entry.name} ({entry.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Possession Chart */}
              <div className="bg-white bg-opacity-60 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-black text-center mb-3">
                  Possession Status
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={possessionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {possessionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-2">
                  {possessionData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="text-xs text-black">
                        {entry.name} ({entry.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preparation Chart */}
              <div className="bg-white bg-opacity-60 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-black text-center mb-3">
                  Preparation Status
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={preparationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {preparationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-2">
                  {preparationData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="text-xs text-black">
                        {entry.name} ({entry.value}%)
                      </span>
                    </div>
                  ))}
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

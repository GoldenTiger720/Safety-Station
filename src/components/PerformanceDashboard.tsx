import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const PerformanceDashboard: React.FC = () => {
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
    <Card className="bg-gray-800 border-gray-700 flex flex-col h-full relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80")',
        }}
      ></div>
      <CardHeader className="pb-0.5 py-1 xl:py-[1vw] bg-gray-900/80 relative z-10">
        <CardTitle className="text-[3vw] text-white text-right">
          Performance Highlights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 p-2 flex-1 relative z-10">
        {/* Top Section with Headers and Data */}
        <div className="grid grid-cols-1 sm:h-1/2 sm:grid-cols-3 gap-1 sm:gap-2 mb-1 sm:mb-2">
          {/* Spotlight Reporting */}
          <div className="space-y-1 flex flex-col">
            <div className="bg-white bg-opacity-70 rounded p-0.5 sm:p-1 xl:py-[4vw] text-center">
              <h3 className="text-[6px] sm:text-[1.5vw] font-bold text-black">
                Spotlight Reporting
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-0.5 sm:gap-1 flex-1">
              <div className="bg-white flex flex-col items-center justify-center bg-opacity-85 border border-gray-200 p-0.5 sm:p-1 rounded text-center">
                <div className="text-[10px] sm:text-[1.5vw] font-bold text-gray-800">81</div>
                <div className="text-[5px] sm:text-[1vw] text-gray-600">Spotlights YTD</div>
              </div>
              <div className="bg-white flex flex-col items-center justify-center bg-opacity-85 border border-gray-200 p-0.5 sm:p-1 rounded text-center">
                <div className="text-[10px] sm:text-[1.5vw] font-bold text-gray-800">2</div>
                <div className="text-[5px] sm:text-[1vw] text-gray-600">Spotlights MTD</div>
              </div>
            </div>
          </div>

          {/* Safety Tours */}
          <div className="space-y-1 flex flex-col">
            <div className="bg-white bg-opacity-70 rounded p-0.5 sm:p-1 xl:py-[4vw] text-center">
              <h3 className="text-[6px] sm:text-[1.5vw] font-bold text-black">Safety Tours</h3>
            </div>
            <div className="grid grid-cols-2 gap-0.5 sm:gap-1 flex-1">
              <div className="bg-white flex flex-col items-center justify-center bg-opacity-85 border border-gray-200 p-0.5 sm:p-1 rounded text-center">
                <div className="text-[10px] sm:text-[1.5vw] font-bold text-gray-800">7.59</div>
                <div className="text-[5px] sm:text-[1vw] text-gray-600">Safety Tour YTD</div>
              </div>
              <div className="bg-white flex flex-col items-center justify-center bg-opacity-85 border border-gray-200 p-0.5 sm:p-1 rounded text-center">
                <div className="text-[10px] sm:text-[1.5vw] font-bold text-gray-800">7.33</div>
                <div className="text-[5px] sm:text-[1vw] text-gray-600">Safety Tour MTD</div>
              </div>
            </div>
          </div>

          {/* Possession Utilisation */}
          <div className="space-y-1 flex flex-col">
            <div className="bg-white bg-opacity-70 rounded p-0.5 sm:p-1 xl:py-[4vw] text-center">
              <h3 className="text-[6px] sm:text-[1.5vw] font-bold text-black">
                Possession Utilisation
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-0.5 sm:gap-1 flex-1">
              <div className="bg-white flex flex-col items-center justify-center bg-opacity-85 border border-gray-200 p-0.5 sm:p-1 rounded text-center">
                <div className="text-[10px] sm:text-[1.5vw] font-bold text-gray-800">63</div>
                <div className="text-[5px] sm:text-[1vw] text-gray-600">Average</div>
              </div>
              <div className="bg-white flex flex-col items-center justify-center bg-opacity-85 border border-gray-200 p-0.5 sm:p-1 rounded text-center">
                <div className="text-[10px] sm:text-[1.5vw] font-bold text-gray-800">218.42</div>
                <div className="text-[5px] sm:text-[1vw] text-gray-600">Ave Work p/h</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Charts Section */}
        <div className="grid grid-cols-1 sm:h-1/2 sm:grid-cols-3 gap-1 sm:gap-2">
          {/* In Process Chart */}
          <div className="bg-white bg-opacity-60 rounded p-1 sm:p-2 flex flex-col items-center justify-center">
            <h4 className="text-[5px] sm:text-[1.5vw] font-semibold text-black text-center mb-0.5">
              In Process Status
            </h4>
            <ResponsiveContainer width="100%" minHeight={30} height={`50%`}>
              <PieChart>
                <Pie
                  data={inProcessData}
                  cx="50%"
                  cy="50%"
                  innerRadius={`40%`}
                  outerRadius={`70%`}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {inProcessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Possession Chart */}
          <div className="bg-white bg-opacity-60 rounded p-1 sm:p-2 flex flex-col items-center justify-center">
            <h4 className="text-[5px] sm:text-[1.5vw] font-semibold text-black text-center mb-0.5">
              Possession Status
            </h4>
            <ResponsiveContainer width="100%" minHeight={30} height={`50%`}>
              <PieChart>
                <Pie
                  data={possessionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={`40%`}
                  outerRadius={`70%`}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {possessionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Preparation Chart */}
          <div className="bg-white bg-opacity-60 rounded p-1 sm:p-2 flex flex-col items-center justify-center">
            <h4 className="text-[5px] sm:text-[1.5vw] font-semibold text-black text-center mb-0.5">
              Preparation Status
            </h4>
            <ResponsiveContainer width="100%" minHeight={30} height={`50%`}>
              <PieChart>
                <Pie
                  data={preparationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={`40%`}
                  outerRadius={`70%`}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {preparationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceDashboard;

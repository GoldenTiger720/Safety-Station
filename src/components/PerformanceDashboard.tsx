"use client";

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
      <CardHeader className="pb-1 py-2 bg-gray-900/80 relative z-10 flex-shrink-0">
        <CardTitle className="text-[1.4vw] text-white text-center">
          Performance Highlights
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 flex-1 relative z-10 flex flex-col justify-center">
        {/* Pie Charts Section - Only donut charts */}
        <div className="grid grid-cols-3 gap-3 h-full">
          {/* In Process Chart */}
          <div className="bg-white bg-opacity-70 rounded-lg p-2 flex flex-col items-center justify-center">
            <h4 className="text-[1vw] font-semibold text-black text-center mb-1">
              In Process Status
            </h4>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={inProcessData}
                  cx="50%"
                  cy="50%"
                  innerRadius="35%"
                  outerRadius="75%"
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
          <div className="bg-white bg-opacity-70 rounded-lg p-2 flex flex-col items-center justify-center">
            <h4 className="text-[1vw] font-semibold text-black text-center mb-1">
              Possession Status
            </h4>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={possessionData}
                  cx="50%"
                  cy="50%"
                  innerRadius="35%"
                  outerRadius="75%"
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
          <div className="bg-white bg-opacity-70 rounded-lg p-2 flex flex-col items-center justify-center">
            <h4 className="text-[1vw] font-semibold text-black text-center mb-1">
              Preparation Status
            </h4>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={preparationData}
                  cx="50%"
                  cy="50%"
                  innerRadius="35%"
                  outerRadius="75%"
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

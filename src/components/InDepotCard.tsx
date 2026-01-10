"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CheckInRecord } from "@/types";

interface InDepotCardProps {
  checkedInStaff?: CheckInRecord[];
}

const InDepotCard: React.FC<InDepotCardProps> = ({ checkedInStaff = [] }) => {
  // Display only actual checked-in staff from StaffCheckIn component
  const staffInDepot = checkedInStaff.map((staff) => ({
    name: staff.name,
    company: staff.company,
    reason: staff.reason,
    isCheckedIn: true,
    isFireWarden: staff.reason.toLowerCase() === "firewarden",
    isFirstAider: staff.reason.toLowerCase() === "firstaider",
  }));

  return (
    <Card className="bg-gray-900 border-gray-700 h-full overflow-hidden flex flex-col">
      <CardHeader className="pb-0 py-1 bg-gray-800 flex-shrink-0">
        <CardTitle className="text-[1.3vw] text-white flex items-center justify-between">
          <span>In Depot</span>
          <span className="text-[0.9vw] text-gray-400">({staffInDepot.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 min-h-0 overflow-y-auto">
        {staffInDepot.length === 0 ? (
          <div className="px-2 py-3 text-center">
            <p className="text-[0.9vw] text-gray-400">
              No staff currently checked in
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-700/50">
            {staffInDepot.map((staff, index) => {
              const isSpecialRole = staff.isFireWarden || staff.isFirstAider;

              return (
                <div
                  key={index}
                  className="px-2 py-[0.5vw] hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-[1.1vw]">
                    <span className="text-gray-200 font-semibold truncate flex-shrink-0 max-w-[40%]">
                      {staff.name}
                    </span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-400 truncate flex-shrink-0 max-w-[30%]">
                      {staff.company}
                    </span>
                    <span className="text-gray-500">|</span>
                    <span
                      className={`truncate ${isSpecialRole
                        ? "bg-green-600 px-2 py-1 rounded text-white font-medium"
                        : "text-gray-400"
                        }`}
                    >
                      {staff.reason}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InDepotCard;

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
      <CardHeader className="pb-0.5 py-1 bg-gray-800 flex-shrink-0">
        <CardTitle className="text-[1.2vw] text-white">In Depot</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-700">
          {staffInDepot.length === 0 ? (
            <div className="px-2 py-4 text-center">
              <p className="text-[0.8vw] text-gray-400">
                No staff currently checked in
              </p>
            </div>
          ) : (
            staffInDepot.map((staff, index) => {
              const isSpecialRole = staff.isFireWarden || staff.isFirstAider;

              return (
                <div
                  key={index}
                  className="px-2 py-1 hover:bg-gray-800/50 transition-colors"
                >
                  <div className="grid grid-cols-2 gap-x-1 gap-y-0.5 text-[0.8vw]">
                    <div className="text-gray-400">Name:</div>
                    <div className="text-gray-200 flex items-center gap-1 flex-wrap">
                      <span className="break-words">{staff.name}</span>
                    </div>
                    <div className="text-gray-400">Company:</div>
                    <div className="text-gray-200 break-words">
                      {staff.company}
                    </div>
                    <div className="text-gray-400">Reason:</div>
                    <div className="text-gray-200 break-words">
                      <span
                        className={`${
                          isSpecialRole
                            ? "bg-green-600 px-2 py-0.5 rounded"
                            : ""
                        }`}
                      >
                        {staff.reason}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InDepotCard;

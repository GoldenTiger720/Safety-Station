import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckInRecord } from "@/api/checkin-api";

interface InDepotCardProps {
  checkedInStaff?: CheckInRecord[];
}

const InDepotCard: React.FC<InDepotCardProps> = ({ checkedInStaff = [] }) => {
  // Display only actual checked-in staff from StaffCheckIn component
  const staffInDepot = checkedInStaff.map(staff => ({
    name: staff.name,
    company: staff.company,
    reason: staff.reason,
    isCheckedIn: true,
    isFireWarden: staff.reason.toLowerCase() === 'firewarden',
    isFirstAider: staff.reason.toLowerCase() === 'firstaider'
  }));

  return (
    <Card className="bg-gray-900 border-gray-700 h-full overflow-hidden">
      <CardHeader className="pb-0.5 py-[1vw] bg-gray-800">
        <CardTitle className="text-[2.5vw] text-white">In Depot</CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-30px)] overflow-y-auto">
        <div className="divide-y divide-gray-700">
          {staffInDepot.length === 0 ? (
            <div className="px-2 py-2 text-center">
              <p className="text-[10px] xl:text-[1.5vw] text-gray-400">No staff currently checked in</p>
            </div>
          ) : (
            staffInDepot.map((staff, index) => {
              const isSpecialRole = staff.isFireWarden || staff.isFirstAider;

              return (
              <div key={index} className="px-2 py-1 hover:bg-gray-800/50 transition-colors">
                {/* Mobile: Stack vertically, Desktop: Grid */}
                <div className="block sm:hidden space-y-0.5">
                  {/* Mobile Layout - Stacked */}
                  <div className="flex items-center justify-between">
                    <span className="sm:text-[22px] xl:text-[1.5vw] font-medium text-gray-200">{staff.name}</span>
                  </div>
                  <div className="sm:text-[22px] xl:text-[1.5vw] text-gray-400">{staff.company}</div>
                  <div className={`sm:text-[22px] xl:text-[1.5vw] text-gray-300 inline-block ${isSpecialRole ? 'bg-green-600 px-2 py-0.5 rounded' : ''}`}>{staff.reason}</div>
                </div>

                {/* Desktop Layout - Grid */}
                <div className="hidden sm:block">
                  <div className="grid grid-cols-2 gap-x-0.5 sm:gap-x-1 gap-y-0.5 md:text-[22px] sm:text-[16px] xl:text-[1.5vw]">
                    <div className="text-gray-400">Name:</div>
                    <div className="text-gray-200 flex items-center gap-0.5 sm:gap-1 flex-wrap">
                      <span className="break-words">{staff.name}</span>
                    </div>
                    <div className="text-gray-400">Company:</div>
                    <div className="text-gray-200 break-words">{staff.company}</div>
                    <div className="text-gray-400">Reason:</div>
                    <div className="text-gray-200 break-words">
                      <span className={`${isSpecialRole ? 'bg-green-600 px-2 py-0.5 rounded' : ''}`}>{staff.reason}</span>
                    </div>
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
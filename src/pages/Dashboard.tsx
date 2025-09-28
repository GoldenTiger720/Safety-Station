import React, { useState } from "react";
import DepotHeader from "@/components/DepotHeader";
import DepotNavigation from "@/components/DepotNavigation";
import StaffCheckIn from "@/components/StaffCheckIn";
import DocumentViewer from "@/components/DocumentViewer";
import VideoSection from "@/components/VideoSection";
import PerformanceDashboard from "@/components/PerformanceDashboard";
import NewsCard from "@/components/NewsCard";
import REDSafetyVideoCard from "@/components/REDSafetyVideoCard";
import InDepotCard from "@/components/InDepotCard";
import WebViewer from "@/components/WebViewer";

interface CheckInRecord {
  id: string;
  name: string;
  company: string;
  reason: string;
  time: string;
  status: 'checked-in' | 'checked-out';
}

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [checkedInStaff, setCheckedInStaff] = useState<CheckInRecord[]>([]);
  const [currentUser, setCurrentUser] = useState<{ name: string; company: string } | null>(null);

  const handleBackToDashboard = () => {
    setActiveSection("dashboard");
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "checkin":
        return <StaffCheckIn onStaffUpdate={setCheckedInStaff} onUserCheckIn={(user) => { setCurrentUser(user); if (user) setActiveSection("dashboard"); }} currentUser={currentUser} />;
      case "documents":
        return <DocumentViewer />;
      case "videos":
      case "induction":
        return <VideoSection />;
      case "bpms":
        return (
          <WebViewer
            url="https://rsrg.processdesign.bicplatform.de/client/#/view"
            title="BPMS System"
            onBack={handleBackToDashboard}
          />
        );
      case "dms":
        return (
          <WebViewer
            url="https://rsrg.sharepoint.com/sites/wg-dms/SitePages/DMS-DOKUMENTE.aspx"
            title="DMS System"
            onBack={handleBackToDashboard}
          />
        );
      case "technical":
        return (
          <WebViewer
            url="https://rsrg.sharepoint.com/sites/re-rse/documents/Forms/Recent.aspx?id=%2Fsites%2Fre%2Drse%2Fdocuments%2FOperations%20Technical%20Library&newTargetListUrl=%2Fsites%2Fre%2Drse%2Fdocuments&viewpath=%2Fsites%2Fre%2Drse%2Fdocuments%2FForms%2FRecent%2Easpx"
            title="Technical Library"
            onBack={handleBackToDashboard}
          />
        );
      case "spotlight":
        return (
          <WebViewer
            url=" https://forms.office.com/Pages/ResponsePage.aspx?id=P6uWrWQ9VUSKyypPe63Cfyd-GXc638xPnbpuq9F_PqBUNTdZUDNRVTdHWFdXWkxETERROFJKV0RPMy4u"
            title="Spotlight Reports"
            onBack={handleBackToDashboard}
          />
        );
      default:
        return <DashboardOverview checkedInStaff={checkedInStaff} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-2 sm:p-3 md:p-4 space-y-0 max-w-full overflow-x-hidden">
        <DepotHeader
          userName={currentUser?.name}
          userEmail={currentUser?.company}
        />

        <DepotNavigation
          onItemClick={setActiveSection}
          activeItem={activeSection}
        />

        <div>{renderActiveSection()}</div>
      </div>
    </div>
  );
};

interface DashboardOverviewProps {
  checkedInStaff: CheckInRecord[];
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ checkedInStaff }) => {
  return (
    <div className="space-y-1 h-[calc(100vh-200px)]">
      {/* First Row: NewsCard and PerformanceDashboard side-by-side */}
      <div className="grid grid-cols-3 gap-1 h-[53%]">
        <div className="h-full">
          <NewsCard />
        </div>
        <div className="h-full col-span-2">
          <PerformanceDashboard />
        </div>
      </div>

      {/* Second Row: InDepotCard and REDSafetyVideoCard side-by-side */}
      <div className="grid grid-cols-3 gap-1 h-[20%]">
        <div className="h-full">
          <InDepotCard checkedInStaff={checkedInStaff} />
        </div>
        <div className="h-full col-span-2">
          <REDSafetyVideoCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
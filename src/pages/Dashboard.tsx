import React, { useState } from "react";
import DepotHeader from "@/components/DepotHeader";
import DepotNavigation from "@/components/DepotNavigation";
import StaffCheckIn from "@/components/StaffCheckIn";
import DocumentViewer from "@/components/DocumentViewer";
import VideoSection from "@/components/VideoSection";
import PerformanceDashboard from "@/components/PerformanceDashboard";
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
    <div className="space-y-2">
      <PerformanceDashboard checkedInStaff={checkedInStaff} />
    </div>
  );
};

export default Dashboard;
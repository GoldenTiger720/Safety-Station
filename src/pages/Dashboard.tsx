import React, { useState } from "react";
import DepotHeader from "@/components/DepotHeader";
import DepotNavigation from "@/components/DepotNavigation";
import StaffCheckIn from "@/components/StaffCheckIn";
import DocumentViewer from "@/components/DocumentViewer";
import NewsSection from "@/components/NewsSection";
import VideoSection from "@/components/VideoSection";
import PerformanceDashboard from "@/components/PerformanceDashboard";
import WebViewer from "@/components/WebViewer";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  const handleBackToDashboard = () => {
    setActiveSection("dashboard");
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "checkin":
        return <StaffCheckIn />;
      case "documents":
        return <DocumentViewer />;
      case "news":
        return <NewsSection />;
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
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-2 sm:p-3 md:p-4 space-y-3 sm:space-y-4 md:space-y-6 max-w-full overflow-x-hidden">
        <DepotHeader />

        <DepotNavigation
          onItemClick={setActiveSection}
          activeItem={activeSection}
        />

        <div className="pb-4 sm:pb-6 md:pb-8">{renderActiveSection()}</div>
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <PerformanceDashboard />
    </div>
  );
};

export default Dashboard;
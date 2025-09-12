import React, { useState } from "react";
import DepotHeader from "@/components/DepotHeader";
import DepotNavigation from "@/components/DepotNavigation";
import StaffCheckIn from "@/components/StaffCheckIn";
import DocumentViewer from "@/components/DocumentViewer";
import NewsSection from "@/components/NewsSection";
import VideoSection from "@/components/VideoSection";
import PerformanceDashboard from "@/components/PerformanceDashboard";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "checkin":
        return <StaffCheckIn />;
      case "documents":
      case "maintenance":
      case "operation":
        return <DocumentViewer />;
      case "news":
      case "spotlight":
        return <NewsSection />;
      case "videos":
      case "induction":
        return <VideoSection />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-2 sm:p-3 md:p-4 space-y-3 sm:space-y-4 md:space-y-6 max-w-full overflow-x-hidden">
        {/* Header */}
        <DepotHeader />

        {/* Navigation */}
        <DepotNavigation
          onItemClick={setActiveSection}
          activeItem={activeSection}
        />

        {/* Main Content */}
        <div className="pb-4 sm:pb-6 md:pb-8">{renderActiveSection()}</div>
      </div>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      {/* Performance Dashboard */}
      <PerformanceDashboard />
    </div>
  );
};

export default Index;

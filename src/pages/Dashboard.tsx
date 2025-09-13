import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DepotHeader from "@/components/DepotHeader";
import DepotNavigation from "@/components/DepotNavigation";
import StaffCheckIn from "@/components/StaffCheckIn";
import DocumentViewer from "@/components/DocumentViewer";
import NewsSection from "@/components/NewsSection";
import VideoSection from "@/components/VideoSection";
import PerformanceDashboard from "@/components/PerformanceDashboard";
import { useAuth } from "@/contexts/AuthContext";
import { useLogout } from "@/lib/auth-api";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const { user } = useAuth();
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleProfileClick = () => {
    // Navigate to profile page (you can implement this later)
    console.log("Profile clicked");
  };

  const handleLogoutClick = () => {
    logoutMutation.mutate();
  };

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
        <DepotHeader
          userName={user?.username}
          userEmail={user?.email}
          onProfileClick={handleProfileClick}
          onLogoutClick={handleLogoutClick}
        />

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
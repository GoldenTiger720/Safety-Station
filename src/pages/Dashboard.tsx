import React, { useState, useRef, useEffect } from "react";
import DepotHeader from "@/components/DepotHeader";
import DepotNavigation from "@/components/DepotNavigation";
import StaffCheckIn from "@/components/StaffCheckIn";
import DocumentViewer from "@/components/DocumentViewer";
import VideoSection from "@/components/VideoSection";
import PerformanceDashboard from "@/components/PerformanceDashboard";
import NewsCard from "@/components/NewsCard";
import REDSafetyVideoCard from "@/components/REDSafetyVideoCard";
import InDepotCard from "@/components/InDepotCard";
import WeatherCard from "@/components/WeatherCard";
import WebViewer from "@/components/WebViewer";
import { useYouTubeVideos, YouTubeVideo } from "@/api/dashboard-api";

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

  // Use ReactQuery hook for YouTube videos
  const { data: youtubeVideosData, isLoading: videosLoading, error: videosError } = useYouTubeVideos();
  const youtubeVideos = youtubeVideosData?.videos || [];

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
      case "admin":
        // Navigate to admin panel
        window.location.href = "/admin";
        return null;
      default:
        return <DashboardOverview checkedInStaff={checkedInStaff} youtubeVideos={youtubeVideos} videosLoading={videosLoading} videosError={videosError?.message || null} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex flex-col p-2 sm:p-3 md:p-4 space-y-0 max-w-full h-full overflow-x-hidden min-h-screen">
        <DepotHeader
          userName={currentUser?.name}
          userEmail={currentUser?.company}
        />

        <DepotNavigation
          onItemClick={setActiveSection}
          activeItem={activeSection}
        />

        {renderActiveSection()}
      </div>
    </div>
  );
};

interface DashboardOverviewProps {
  checkedInStaff: CheckInRecord[];
  youtubeVideos: YouTubeVideo[];
  videosLoading: boolean;
  videosError: string | null;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ checkedInStaff, youtubeVideos, videosLoading, videosError }) => {
  const newsCardRef = useRef<HTMLDivElement>(null);
  const performanceDashboardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col w-full flex-1 h-full overflow-hidden">
      <div className="grid grid-cols-3 gap-0.5 h-full flex-1 overflow-hidden">
        {/* Left Column: NewsCard and InDepotCard stacked */}
        <div className=" col-span-1 flex flex-col min-[1920px]:h-[90vh] gap-0.5 sm:gap-1">
          <div className="h-2/3" ref={newsCardRef}>
            <NewsCard />
          </div>
          <div className="h-1/3">
            <InDepotCard checkedInStaff={checkedInStaff} />
          </div>
        </div>

        {/* Right Column: PerformanceDashboard, WeatherCard, and REDSafetyVideoCard stacked */}
        <div className="col-span-2 flex flex-col gap-0.5 min-[1920px]:h-[90vh] sm:gap-1">
          <div className="h-1/3" ref={performanceDashboardRef}>
            <PerformanceDashboard />
          </div>
          <div className="h-1/3">
            <WeatherCard />
          </div>
          <div className="h-1/3">
            <REDSafetyVideoCard videos={youtubeVideos} loading={videosLoading} error={videosError} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
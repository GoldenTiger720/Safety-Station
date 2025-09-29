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
      case "spotlight":
        return (
          <WebViewer
            url=" https://forms.office.com/Pages/ResponsePage.aspx?id=P6uWrWQ9VUSKyypPe63Cfyd-GXc638xPnbpuq9F_PqBUNTdZUDNRVTdHWFdXWkxETERROFJKV0RPMy4u"
            title="Spotlight Reports"
            onBack={handleBackToDashboard}
          />
        );
      default:
        return <DashboardOverview checkedInStaff={checkedInStaff} youtubeVideos={youtubeVideos} videosLoading={videosLoading} videosError={videosError?.message || null} />;
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
  youtubeVideos: YouTubeVideo[];
  videosLoading: boolean;
  videosError: string | null;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ checkedInStaff, youtubeVideos, videosLoading, videosError }) => {
  const newsCardRef = useRef<HTMLDivElement>(null);
  const performanceDashboardRef = useRef<HTMLDivElement>(null);
  const [inDepotHeight, setInDepotHeight] = useState<number>(0);

  useEffect(() => {
    const calculateHeight = () => {
      if (newsCardRef.current && performanceDashboardRef.current) {
        const newsHeight = newsCardRef.current.offsetHeight;
        const performanceHeight = performanceDashboardRef.current.offsetHeight;
        const calculatedHeight = performanceHeight - newsHeight - 4; // 4px for gap
        setInDepotHeight(Math.max(calculatedHeight, 100)); // Minimum height of 100px
      }
    };

    // Calculate on mount and when window resizes
    calculateHeight();
    window.addEventListener('resize', calculateHeight);

    // Use ResizeObserver to detect component size changes
    const resizeObserver = new ResizeObserver(calculateHeight);
    if (newsCardRef.current) resizeObserver.observe(newsCardRef.current);
    if (performanceDashboardRef.current) resizeObserver.observe(performanceDashboardRef.current);

    return () => {
      window.removeEventListener('resize', calculateHeight);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="flex gap-0.5 sm:gap-1 h-[calc(100vh-140px)] sm:h-[calc(100vh-180px)] overflow-hidden">
      {/* Left Column: NewsCard and InDepotCard stacked */}
      <div className="w-1/3 flex flex-col gap-0.5 sm:gap-1">
        <div ref={newsCardRef}>
          <NewsCard />
        </div>
        <div style={{ height: inDepotHeight }}>
          <InDepotCard checkedInStaff={checkedInStaff} />
        </div>
      </div>

      {/* Right Column: PerformanceDashboard and REDSafetyVideoCard stacked */}
      <div className="w-2/3 flex flex-col gap-0.5 sm:gap-1">
        <div ref={performanceDashboardRef}>
          <PerformanceDashboard />
        </div>
        <div className="flex-1 min-h-0 h-full">
          <REDSafetyVideoCard videos={youtubeVideos} loading={videosLoading} error={videosError} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
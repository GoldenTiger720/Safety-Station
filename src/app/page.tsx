"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DepotHeader from "@/components/DepotHeader";
import DepotNavigation from "@/components/DepotNavigation";
import StaffCheckIn from "@/components/StaffCheckIn";
import DocumentViewer from "@/components/DocumentViewer";
import VideoSection from "@/components/VideoSection";
import NewsCard from "@/components/NewsCard";
import REDSafetyVideoCard from "@/components/REDSafetyVideoCard";
import InDepotCard from "@/components/InDepotCard";
import WeatherCard from "@/components/WeatherCard";
import WebViewer from "@/components/WebViewer";
import SafetyAlerts from "@/components/SafetyAlerts";
import DocumentControl from "@/components/DocumentControl";
import PerformanceDashboard from "@/components/PerformanceDashboard";
import { useYouTubeVideos } from "@/hooks/use-youtube";
import type { CheckInRecord, YouTubeVideo } from "@/types";

export default function Dashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [checkedInStaff, setCheckedInStaff] = useState<CheckInRecord[]>([]);

  // Use ReactQuery hook for YouTube videos
  const {
    data: youtubeVideosData,
    isLoading: videosLoading,
    error: videosError,
  } = useYouTubeVideos();
  const youtubeVideos = youtubeVideosData?.videos || [];

  const handleBackToDashboard = () => {
    setActiveSection("dashboard");
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "checkin":
        return <StaffCheckIn onStaffUpdate={setCheckedInStaff} />;
      case "documents":
        return <DocumentViewer />;
      case "videos":
      case "induction":
        return <VideoSection />;
      case "safety-alerts":
        return <SafetyAlerts />;
      case "document-control":
        return <DocumentControl />;
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
      case "admin":
        // Navigate to admin panel
        router.push("/admin");
        return null;
      default:
        return (
          <DashboardOverview
            checkedInStaff={checkedInStaff}
            youtubeVideos={youtubeVideos}
            videosLoading={videosLoading}
            videosError={videosError?.message || null}
          />
        );
    }
  };

  return (
    <div className="h-screen w-screen bg-background overflow-hidden">
      <div className="flex flex-col h-full w-full p-1 gap-0.5">
        <DepotHeader />
        <DepotNavigation
          onItemClick={setActiveSection}
          activeItem={activeSection}
        />

        <div className="flex-1 overflow-hidden">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
}

interface DashboardOverviewProps {
  checkedInStaff: CheckInRecord[];
  youtubeVideos: YouTubeVideo[];
  videosLoading: boolean;
  videosError: string | null;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  checkedInStaff,
  youtubeVideos,
  videosLoading,
  videosError,
}) => {
  const newsCardRef = useRef<HTMLDivElement>(null);
  const performanceDashboardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full h-full overflow-hidden">
      {/* 16:9 Landscape Layout (3840x2160) - 3 column grid for optimal space usage */}
      <div className="grid grid-cols-12 gap-1 h-full">
        {/* Left Column (3 cols): News (top) + In Depot (bottom) */}
        <div className="col-span-3 flex flex-col gap-1 h-full overflow-hidden">
          {/* News - 50% height */}
          <div className="h-[50%] min-h-0 overflow-hidden" ref={newsCardRef}>
            <NewsCard />
          </div>
          {/* In Depot - 50% height */}
          <div className="h-[50%] min-h-0 overflow-hidden">
            <InDepotCard checkedInStaff={checkedInStaff} />
          </div>
        </div>

        {/* Center Column (5 cols): Performance Highlights (top) + Weather (bottom) */}
        <div className="col-span-5 flex flex-col gap-1 h-full overflow-hidden">
          {/* Performance Highlights - 60% height */}
          <div className="h-[60%] min-h-0 overflow-hidden" ref={performanceDashboardRef}>
            <PerformanceDashboard />
          </div>
          {/* Weather - 40% height */}
          <div className="h-[40%] min-h-0 overflow-hidden">
            <WeatherCard />
          </div>
        </div>

        {/* Right Column (4 cols): RSRG Videos - full height */}
        <div className="col-span-4 h-full min-h-0 overflow-hidden">
          <REDSafetyVideoCard
            videos={youtubeVideos}
            loading={videosLoading}
            error={videosError}
          />
        </div>
      </div>
    </div>
  );
};

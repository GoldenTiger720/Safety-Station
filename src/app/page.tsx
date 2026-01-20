"use client";

import React, { useState, useRef, useEffect } from "react";
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
import SafetyAlerts from "@/components/SafetyAlerts";
import DocumentControl from "@/components/DocumentControl";
import Operation from "@/components/Operation";
import PerformanceDashboard from "@/components/PerformanceDashboard";
import TrainingDevelopment from "@/components/TrainingDevelopment";
import RSRGLinks from "@/components/RSRGLinks";
import { useYouTubeVideos } from "@/hooks/use-youtube";
import { useCheckInRecords } from "@/hooks/use-checkin";
import type { CheckInRecord, YouTubeVideo } from "@/types";

export default function Dashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [checkedInStaff, setCheckedInStaff] = useState<CheckInRecord[]>([]);

  // Fetch check-in records from database
  const { data: checkInData } = useCheckInRecords();

  // Update checkedInStaff when data is fetched from database
  useEffect(() => {
    if (checkInData?.records) {
      const checkedIn = checkInData.records.filter(
        (record) => record.status === "checked-in"
      );
      setCheckedInStaff(checkedIn);
    }
  }, [checkInData]);

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
      case "operation":
        return <Operation />;
      case "training":
        return (
          <TrainingDevelopment onBack={handleBackToDashboard} />
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
    <div className="w-full h-full overflow-hidden p-1">
      {/* 16:9 Landscape Layout (3840x2160) - 3 column grid for optimal space usage */}
      <div className="grid grid-cols-12 gap-2 h-full">
        {/* Left Column (3 cols): News (top) + In Depot (bottom) */}
        <div className="col-span-3 flex flex-col gap-2 h-full overflow-hidden">
          {/* News - 50% height */}
          <div className="h-[50%] min-h-0 overflow-hidden" ref={newsCardRef}>
            <NewsCard />
          </div>
          {/* In Depot - 50% height */}
          <div className="h-[50%] min-h-0 overflow-hidden">
            <InDepotCard checkedInStaff={checkedInStaff} />
          </div>
        </div>

        {/* Center Column (5 cols): Performance (top) + Weather (bottom) */}
        <div className="col-span-5 flex flex-col gap-2 h-full overflow-hidden">
          {/* Performance Highlights - 55% height */}
          <div className="h-[55%] min-h-0 overflow-hidden" ref={performanceDashboardRef}>
            <PerformanceDashboard />
          </div>
          {/* Weather - 45% height */}
          <div className="h-[45%] min-h-0 overflow-hidden">
            <WeatherCard />
          </div>
        </div>

        {/* Right Column (4 cols): RSRG Videos (top) + RSRG Links (bottom) */}
        <div className="col-span-4 flex flex-col h-full overflow-hidden">
          {/* RSRG Videos - 78% height */}
          <div className="h-[78%] min-h-0 overflow-hidden pb-2 border-b-2 border-white">
            <REDSafetyVideoCard
              videos={youtubeVideos}
              loading={videosLoading}
              error={videosError}
            />
          </div>
          {/* RSRG Links - 22% height */}
          <div className="h-[22%] min-h-0 overflow-hidden pt-2">
            <RSRGLinks className="border-green-500 border-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

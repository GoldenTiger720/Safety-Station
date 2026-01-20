"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Loader2, X, Users, Wrench } from "lucide-react";
import PdfViewer from "./PdfViewer";

interface OperationSchedule {
  id: number;
  week_number: number;
  year: number;
  title: string;
  description: string | null;
  pdf_data: string | null;
  pdf_filename: string | null;
  schedule_type: "this_week" | "next_week";
  team_type: "operations" | "maintenance";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface OperationsResponse {
  success: boolean;
  operations: OperationSchedule[];
  total_operations: number;
}

// Calculate ISO week number
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

// Calculate the number of ISO weeks in a year
function getWeeksInYear(year: number): number {
  const jan1 = new Date(Date.UTC(year, 0, 1));
  const jan1DayOfWeek = jan1.getUTCDay();
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  if (jan1DayOfWeek === 4 || (isLeapYear && jan1DayOfWeek === 3)) {
    return 53;
  }
  return 52;
}

// Calculate next week number and year
function getNextWeek(week: number, year: number) {
  const maxWeeks = getWeeksInYear(year);
  if (week >= maxWeeks) {
    return { weekNumber: 1, year: year + 1 };
  }
  return { weekNumber: week + 1, year: year };
}

const Operation: React.FC = () => {
  const [operations, setOperations] = useState<OperationSchedule[]>([]);
  const [selectedOperation, setSelectedOperation] = useState<OperationSchedule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();
  const currentWeek = getWeekNumber(new Date());
  const nextWeekInfo = getNextWeek(currentWeek, currentYear);

  const fetchOperations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/operations");
      if (!response.ok) throw new Error("Failed to fetch operations");
      const data: OperationsResponse = await response.json();
      setOperations(data.operations);
    } catch (err) {
      console.error("Error fetching operations:", err);
      setError(err instanceof Error ? err.message : "Failed to load operations");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOperations();
  }, [fetchOperations]);

  // Get schedules by team and week type
  const getSchedule = (teamType: "operations" | "maintenance", scheduleType: "this_week" | "next_week") => {
    return operations.find(
      (op) => op.team_type === teamType && op.schedule_type === scheduleType && op.is_active
    );
  };

  const opsThisWeek = getSchedule("operations", "this_week");
  const opsNextWeek = getSchedule("operations", "next_week");
  const maintThisWeek = getSchedule("maintenance", "this_week");
  const maintNextWeek = getSchedule("maintenance", "next_week");

  const handleScheduleClick = (operation: OperationSchedule) => {
    setSelectedOperation(operation);
  };

  const handleCloseViewer = () => {
    setSelectedOperation(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-900">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <FileText className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-400 text-lg">{error}</p>
          <Button onClick={fetchOperations} className="mt-4" variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Render a schedule card
  const renderScheduleCard = (
    schedule: OperationSchedule | undefined,
    teamType: "operations" | "maintenance",
    scheduleType: "this_week" | "next_week"
  ) => {
    const isOperations = teamType === "operations";
    const isThisWeek = scheduleType === "this_week";
    const weekNum = isThisWeek ? currentWeek : nextWeekInfo.weekNumber;
    const yearNum = isThisWeek ? currentYear : nextWeekInfo.year;

    const borderColor = isOperations
      ? isThisWeek ? "border-blue-500" : "border-blue-400"
      : isThisWeek ? "border-orange-500" : "border-orange-400";

    const selectedBorderColor = isOperations
      ? "border-blue-500 bg-blue-900/30"
      : "border-orange-500 bg-orange-900/30";

    const textColor = isOperations ? "text-blue-400" : "text-orange-400";
    const iconColor = isOperations ? "text-blue-400" : "text-orange-400";

    const isSelected = selectedOperation?.id === schedule?.id;

    return (
      <Card
        className={`bg-gray-800 border-2 cursor-pointer transition-all h-full ${
          isSelected
            ? selectedBorderColor
            : schedule
            ? `${borderColor} hover:bg-gray-700/50`
            : "border-gray-600 opacity-60"
        }`}
        onClick={() => schedule && handleScheduleClick(schedule)}
      >
        <CardHeader className="py-2 px-3">
          <CardTitle className="text-[1vw] text-white flex items-center gap-2">
            <Calendar className={`h-4 w-4 ${iconColor}`} />
            {isThisWeek ? "This Week" : "Next Week"}
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2 px-3">
          {schedule ? (
            <div>
              <div className={`text-[1.4vw] font-bold ${textColor}`}>
                Week {weekNum}, {yearNum}
              </div>
              <div className="text-gray-300 text-[0.9vw] mt-1 truncate">
                {schedule.title}
              </div>
              {schedule.pdf_filename && (
                <div className="flex items-center gap-1 text-red-400 text-[0.8vw] mt-2">
                  <FileText className="h-3 w-3" />
                  <span className="truncate">{schedule.pdf_filename}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-400 text-[0.9vw]">
              No schedule available
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="h-full w-full flex flex-row bg-gray-900 p-3 gap-3">
      {/* Schedule Cards - Left 1/4 width */}
      <div className="w-1/4 flex-shrink-0 flex flex-col gap-3">
        {/* Header */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            <h1 className="text-[1.3vw] font-bold text-white">Planning</h1>
          </div>
        </div>

        {/* Operations Team Section */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-2 px-1">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-[1vw] font-semibold text-blue-400">Operations Team</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex-1">
              {renderScheduleCard(opsThisWeek, "operations", "this_week")}
            </div>
            <div className="flex-1">
              {renderScheduleCard(opsNextWeek, "operations", "next_week")}
            </div>
          </div>
        </div>

        {/* Maintenance Team Section */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-2 px-1">
            <Wrench className="w-4 h-4 text-orange-400" />
            <span className="text-[1vw] font-semibold text-orange-400">Maintenance Team</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex-1">
              {renderScheduleCard(maintThisWeek, "maintenance", "this_week")}
            </div>
            <div className="flex-1">
              {renderScheduleCard(maintNextWeek, "maintenance", "next_week")}
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer - Right 3/4 width */}
      <div className="flex-1 min-w-0">
        <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
          <CardHeader className="py-2 bg-gray-900 flex-shrink-0">
            <CardTitle className="text-[1.1vw] text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                {selectedOperation && (
                  <>
                    {selectedOperation.team_type === "operations" ? (
                      <Users className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Wrench className="w-4 h-4 text-orange-400" />
                    )}
                  </>
                )}
                {selectedOperation ? selectedOperation.title : "Select a Schedule"}
              </span>
              {selectedOperation && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseViewer}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 p-0 overflow-hidden">
            {selectedOperation ? (
              selectedOperation.pdf_data ? (
                <PdfViewer
                  pdfUrl={selectedOperation.pdf_data}
                  title={selectedOperation.title}
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <FileText className="w-16 h-16 mb-4" />
                  <p className="text-lg">No PDF file available for this schedule</p>
                  {selectedOperation.description && (
                    <div className="mt-6 max-w-2xl text-center px-8">
                      <h3 className="text-white text-xl font-semibold mb-2">
                        {selectedOperation.title}
                      </h3>
                      <p className="text-gray-300 whitespace-pre-wrap">
                        {selectedOperation.description}
                      </p>
                    </div>
                  )}
                </div>
              )
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <FileText className="w-16 h-16 mb-4" />
                <p className="text-[1.1vw]">Select a schedule card on the left to view its PDF file</p>
                <p className="text-[0.9vw] mt-2 text-gray-500">
                  Choose from Operations Team or Maintenance Team schedules
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Operation;

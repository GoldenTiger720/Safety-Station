"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Loader2, X } from "lucide-react";
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

  // Get current and next week schedules by scheduleType
  const thisWeekSchedule = operations.find(
    (op) => op.schedule_type === "this_week" && op.is_active
  );
  const nextWeekSchedule = operations.find(
    (op) => op.schedule_type === "next_week" && op.is_active
  );

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

  return (
    <div className="h-full w-full flex flex-row bg-gray-900 p-4 gap-4">
      {/* Schedule Cards - Left 1/4 width */}
      <div className="w-1/4 flex-shrink-0 flex flex-col gap-4">
        {/* Header */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-bold text-white">Operation Schedules</h1>
          </div>
        </div>

        {/* This Week's Schedule Card */}
        <Card
          className={`bg-gray-800 border-2 cursor-pointer transition-all flex-1 ${
            selectedOperation?.schedule_type === "this_week"
              ? "border-blue-500 bg-blue-900/20"
              : thisWeekSchedule
              ? "border-blue-400 hover:border-blue-500"
              : "border-gray-600 opacity-50"
          }`}
          onClick={() => thisWeekSchedule && handleScheduleClick(thisWeekSchedule)}
        >
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-base text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              This Week&apos;s Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-4">
            {thisWeekSchedule ? (
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  Week {currentWeek}, {currentYear}
                </div>
                <div className="text-gray-300 text-sm mt-1">
                  {thisWeekSchedule.title}
                </div>
                {thisWeekSchedule.pdf_filename && (
                  <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                    <FileText className="h-4 w-4" />
                    <span className="truncate">{thisWeekSchedule.pdf_filename}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-400">
                No schedule available for this week
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Week's Schedule Card */}
        <Card
          className={`bg-gray-800 border-2 cursor-pointer transition-all flex-1 ${
            selectedOperation?.schedule_type === "next_week"
              ? "border-purple-500 bg-purple-900/20"
              : nextWeekSchedule
              ? "border-purple-400 hover:border-purple-500"
              : "border-gray-600 opacity-50"
          }`}
          onClick={() => nextWeekSchedule && handleScheduleClick(nextWeekSchedule)}
        >
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-base text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-400" />
              Next Week&apos;s Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-4">
            {nextWeekSchedule ? (
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  Week {nextWeekInfo.weekNumber}, {nextWeekInfo.year}
                </div>
                <div className="text-gray-300 text-sm mt-1">
                  {nextWeekSchedule.title}
                </div>
                {nextWeekSchedule.pdf_filename && (
                  <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                    <FileText className="h-4 w-4" />
                    <span className="truncate">{nextWeekSchedule.pdf_filename}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-400">
                No schedule available for next week
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* PDF Viewer - Right 3/4 width */}
      <div className="flex-1 min-w-0">
        <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
          <CardHeader className="py-3 bg-gray-900 flex-shrink-0">
            <CardTitle className="text-lg text-white flex items-center justify-between">
              <span>
                {selectedOperation ? selectedOperation.title : "PDF Viewer"}
              </span>
              {selectedOperation && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseViewer}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 p-0 overflow-hidden">
            {selectedOperation ? (
              selectedOperation.pdf_data ? (
                // Display PDF using PDF.js for Smart TV compatibility
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
                <p className="text-lg">Select a schedule card on the left to view its PDF file</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Operation;

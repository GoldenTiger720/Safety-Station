"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Calendar, Loader2, Download, X, ChevronLeft, ChevronRight } from "lucide-react";
import * as XLSX from "xlsx";

interface OperationSchedule {
  id: number;
  week_number: number;
  year: number;
  title: string;
  description: string | null;
  excel_data: string | null;
  excel_filename: string | null;
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

interface ExcelData {
  sheetNames: string[];
  sheets: { [key: string]: string[][] };
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
  const [excelData, setExcelData] = useState<ExcelData | null>(null);
  const [activeSheet, setActiveSheet] = useState<string>("");
  const [isParsingExcel, setIsParsingExcel] = useState(false);

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

  // Parse Excel data when operation is selected
  const parseExcelData = useCallback(async (base64Data: string) => {
    setIsParsingExcel(true);
    try {
      // Extract base64 content from data URL
      const matches = base64Data.match(/^data:([^;]+);base64,(.+)$/);
      if (!matches) {
        throw new Error("Invalid Excel data format");
      }

      const base64Content = matches[2];

      // Convert base64 to binary
      const binaryString = atob(base64Content);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Parse Excel file
      const workbook = XLSX.read(bytes, { type: "array" });

      const sheets: { [key: string]: string[][] } = {};
      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        // Convert to array of arrays with header option
        const data = XLSX.utils.sheet_to_json<string[]>(worksheet, {
          header: 1,
          defval: ""
        });
        sheets[sheetName] = data;
      });

      setExcelData({
        sheetNames: workbook.SheetNames,
        sheets: sheets,
      });
      setActiveSheet(workbook.SheetNames[0] || "");
    } catch (err) {
      console.error("Error parsing Excel file:", err);
      setExcelData(null);
    } finally {
      setIsParsingExcel(false);
    }
  }, []);

  // Get current and next week schedules by scheduleType
  const thisWeekSchedule = operations.find(
    (op) => op.schedule_type === "this_week" && op.is_active
  );
  const nextWeekSchedule = operations.find(
    (op) => op.schedule_type === "next_week" && op.is_active
  );

  const handleScheduleClick = (operation: OperationSchedule) => {
    setSelectedOperation(operation);
    setExcelData(null);
    setActiveSheet("");
    if (operation.excel_data) {
      parseExcelData(operation.excel_data);
    }
  };

  const handleCloseViewer = () => {
    setSelectedOperation(null);
    setExcelData(null);
    setActiveSheet("");
  };

  const handleSheetChange = (direction: "prev" | "next") => {
    if (!excelData) return;
    const currentIndex = excelData.sheetNames.indexOf(activeSheet);
    if (direction === "prev" && currentIndex > 0) {
      setActiveSheet(excelData.sheetNames[currentIndex - 1]);
    } else if (direction === "next" && currentIndex < excelData.sheetNames.length - 1) {
      setActiveSheet(excelData.sheetNames[currentIndex + 1]);
    }
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
          <FileSpreadsheet className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-400 text-lg">{error}</p>
          <Button onClick={fetchOperations} className="mt-4" variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Get current sheet data
  const currentSheetData = excelData?.sheets[activeSheet] || [];
  const currentSheetIndex = excelData?.sheetNames.indexOf(activeSheet) ?? -1;

  return (
    <div className="h-full w-full flex flex-row bg-gray-900 p-4 gap-4">
      {/* Schedule Cards - Left 1/4 width */}
      <div className="w-1/4 flex-shrink-0 flex flex-col gap-4">
        {/* Header */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-blue-500" />
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
                {thisWeekSchedule.excel_filename && (
                  <div className="flex items-center gap-2 text-green-400 text-sm mt-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span className="truncate">{thisWeekSchedule.excel_filename}</span>
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
                {nextWeekSchedule.excel_filename && (
                  <div className="flex items-center gap-2 text-green-400 text-sm mt-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span className="truncate">{nextWeekSchedule.excel_filename}</span>
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

      {/* Excel Viewer - Right 3/4 width */}
      <div className="flex-1 min-w-0">
        <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
          <CardHeader className="py-3 bg-gray-900 flex-shrink-0">
            <CardTitle className="text-lg text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                {selectedOperation ? selectedOperation.title : "Excel Viewer"}
              </span>
              {selectedOperation && (
                <div className="flex items-center gap-2">
                  {selectedOperation.excel_data && (
                    <a
                      href={selectedOperation.excel_data}
                      download={selectedOperation.excel_filename || "schedule.xlsx"}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-400 hover:text-green-300 border-green-600"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </a>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCloseViewer}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>

          {/* Sheet Tabs */}
          {excelData && excelData.sheetNames.length > 1 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-850 border-b border-gray-700 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSheetChange("prev")}
                disabled={currentSheetIndex <= 0}
                className="text-gray-400 hover:text-white p-1"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex gap-1 overflow-x-auto">
                {excelData.sheetNames.map((sheetName) => (
                  <Button
                    key={sheetName}
                    variant={activeSheet === sheetName ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveSheet(sheetName)}
                    className={`text-xs whitespace-nowrap ${
                      activeSheet === sheetName
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
                    }`}
                  >
                    {sheetName}
                  </Button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSheetChange("next")}
                disabled={currentSheetIndex >= excelData.sheetNames.length - 1}
                className="text-gray-400 hover:text-white p-1"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          <CardContent className="flex-1 min-h-0 p-0 overflow-hidden">
            {selectedOperation ? (
              isParsingExcel ? (
                <div className="h-full flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                  <span className="ml-2 text-gray-400">Loading Excel file...</span>
                </div>
              ) : excelData && currentSheetData.length > 0 ? (
                <div className="h-full overflow-auto">
                  <table className="w-full border-collapse text-sm">
                    <tbody>
                      {currentSheetData.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className={rowIndex === 0 ? "bg-gray-700 sticky top-0" : rowIndex % 2 === 0 ? "bg-gray-800" : "bg-gray-750"}
                        >
                          {row.map((cell, cellIndex) => {
                            const CellTag = rowIndex === 0 ? "th" : "td";
                            return (
                              <CellTag
                                key={cellIndex}
                                className={`border border-gray-600 px-3 py-2 text-left ${
                                  rowIndex === 0
                                    ? "text-white font-semibold"
                                    : "text-gray-200"
                                }`}
                              >
                                {String(cell ?? "")}
                              </CellTag>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : selectedOperation.excel_data ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <FileSpreadsheet className="w-16 h-16 mb-4" />
                  <p className="text-lg">Unable to display Excel file</p>
                  <a
                    href={selectedOperation.excel_data}
                    download={selectedOperation.excel_filename || "schedule.xlsx"}
                    className="mt-4"
                  >
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download Instead
                    </Button>
                  </a>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <FileSpreadsheet className="w-16 h-16 mb-4" />
                  <p className="text-lg">No Excel file available for this schedule</p>
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
                <FileSpreadsheet className="w-16 h-16 mb-4" />
                <p className="text-lg">Select a schedule card on the left to view its Excel file</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Operation;

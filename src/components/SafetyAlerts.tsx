"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileText, Loader2, X } from "lucide-react";
import PdfViewer from "./PdfViewer";

interface PdfFile {
  filename: string;
  data: string;
}

interface SafetyAlert {
  id: number;
  week_number: number;
  year: number;
  category: string;
  title: string;
  content: string;
  thumbnail_data: string | null;
  pdf_data: string | null;
  pdf_filename: string | null;
  pdf_files: PdfFile[] | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface SafetyAlertsResponse {
  success: boolean;
  alerts: SafetyAlert[];
  categories: string[];
  total_alerts: number;
}

const SafetyAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<SafetyAlert[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<SafetyAlert | null>(null);
  const [selectedPdfIndex, setSelectedPdfIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/safety-alerts");
      if (!response.ok) throw new Error("Failed to fetch safety alerts");
      const data: SafetyAlertsResponse = await response.json();
      setAlerts(data.alerts);
      setCategories(data.categories);
      // Auto-select first category if available
      if (data.categories.length > 0 && !selectedCategory) {
        setSelectedCategory(data.categories[0]);
      }
    } catch (err) {
      console.error("Error fetching safety alerts:", err);
      setError(err instanceof Error ? err.message : "Failed to load safety alerts");
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  // Filter alerts by selected category
  const filteredAlerts = selectedCategory
    ? alerts.filter((alert) => alert.category === selectedCategory)
    : [];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedAlert(null); // Reset selected alert when changing category
  };

  const handleAlertClick = (alert: SafetyAlert) => {
    setSelectedAlert(alert);
    setSelectedPdfIndex(0); // Reset to first PDF when selecting a new alert
  };

  const handleCloseAlert = () => {
    setSelectedAlert(null);
  };

  // Get current PDF data URL (pass directly to PdfJsViewer which handles conversion)
  const currentPdfUrl = useMemo(() => {
    if (!selectedAlert) return null;

    // Check for multiple PDFs first
    if (selectedAlert.pdf_files && selectedAlert.pdf_files.length > 0) {
      return selectedAlert.pdf_files[selectedPdfIndex]?.data || selectedAlert.pdf_files[0].data;
    }

    // Fallback to legacy single PDF
    if (selectedAlert.pdf_data) {
      return selectedAlert.pdf_data;
    }

    return null;
  }, [selectedAlert, selectedPdfIndex]);

  // Loading state
  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-900">
        <Loader2 className="h-12 w-12 animate-spin text-yellow-500" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-400 text-lg">{error}</p>
          <Button onClick={fetchAlerts} className="mt-4" variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col bg-gray-900 p-4 gap-4">
      {/* Header with Category Buttons */}
      <div className="flex-shrink-0">
        <div className="flex items-center gap-4 mb-4">
          <AlertTriangle className="w-8 h-8 text-yellow-500" />
          <h1 className="text-2xl font-bold text-white">Safety Alerts</h1>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-2">
          {categories.length === 0 ? (
            <p className="text-gray-400">No categories available</p>
          ) : (
            categories.map((category) => (
              <Button
                key={category}
                onClick={() => handleCategoryClick(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`text-lg px-6 py-3 ${
                  selectedCategory === category
                    ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-600"
                }`}
              >
                {category}
              </Button>
            ))
          )}
        </div>
      </div>

      {/* Main Content Area: Alert List (1/3) + PDF Viewer (2/3) */}
      <div className="flex-1 min-h-0 flex gap-4">
        {/* Alert List - 1/3 width */}
        <div className="w-1/3 min-h-0 overflow-hidden flex flex-col">
          <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
            <CardHeader className="py-3 bg-gray-900 flex-shrink-0">
              <CardTitle className="text-lg text-white flex items-center justify-between">
                <span>Alerts</span>
                <span className="text-sm text-gray-400">
                  ({filteredAlerts.length})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 overflow-y-auto p-2 space-y-2">
              {filteredAlerts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">
                    {selectedCategory
                      ? "No alerts in this category"
                      : "Select a category to view alerts"}
                  </p>
                </div>
              ) : (
                filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => handleAlertClick(alert)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedAlert?.id === alert.id
                        ? "bg-yellow-600/20 border-2 border-yellow-500"
                        : "bg-gray-700 hover:bg-gray-600 border-2 border-transparent"
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden bg-gray-600 relative">
                        {alert.thumbnail_data ? (
                          <Image
                            src={alert.thumbnail_data}
                            alt={alert.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Alert Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-yellow-600 text-white text-xs px-2 py-0.5 rounded font-medium">
                            Week {alert.week_number}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {alert.year}
                          </span>
                        </div>
                        <h3 className="text-white font-medium text-sm line-clamp-1">
                          {alert.title}
                        </h3>
                        <p className="text-gray-400 text-xs line-clamp-2 mt-1">
                          {alert.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* PDF Viewer - 2/3 width */}
        <div className="w-2/3 min-h-0 overflow-hidden">
          <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
            <CardHeader className="py-3 bg-gray-900 flex-shrink-0">
              <CardTitle className="text-lg text-white flex items-center justify-between">
                <span>
                  {selectedAlert ? selectedAlert.title : "PDF Viewer"}
                </span>
                {selectedAlert && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCloseAlert}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            {/* PDF File Selector - show when multiple PDFs exist */}
            {selectedAlert && selectedAlert.pdf_files && selectedAlert.pdf_files.length > 1 && (
              <div className="px-4 py-2 bg-gray-850 border-b border-gray-700 flex-shrink-0">
                <div className="flex items-center gap-2 overflow-x-auto">
                  <span className="text-gray-400 text-sm whitespace-nowrap">PDFs:</span>
                  {selectedAlert.pdf_files.map((pdf, index) => (
                    <Button
                      key={index}
                      variant={selectedPdfIndex === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPdfIndex(index)}
                      className={`text-xs whitespace-nowrap ${
                        selectedPdfIndex === index
                          ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
                      }`}
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      {pdf.filename.length > 20 ? pdf.filename.substring(0, 20) + "..." : pdf.filename}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <CardContent className="flex-1 min-h-0 p-0 overflow-hidden">
              {selectedAlert ? (
                currentPdfUrl ? (
                  // Display PDF using PDF.js for Smart Screen compatibility
                  <PdfViewer
                    pdfUrl={currentPdfUrl}
                    title={
                      selectedAlert.pdf_files && selectedAlert.pdf_files.length > 0
                        ? selectedAlert.pdf_files[selectedPdfIndex]?.filename || selectedAlert.title
                        : selectedAlert.title
                    }
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <FileText className="w-16 h-16 mb-4" />
                    <p className="text-lg">No PDF available for this alert</p>
                    <div className="mt-6 max-w-2xl text-center px-8">
                      <h3 className="text-white text-xl font-semibold mb-2">
                        {selectedAlert.title}
                      </h3>
                      <p className="text-gray-300 whitespace-pre-wrap">
                        {selectedAlert.content}
                      </p>
                    </div>
                  </div>
                )
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <FileText className="w-16 h-16 mb-4" />
                  <p className="text-lg">Select an alert to view its PDF</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SafetyAlerts;

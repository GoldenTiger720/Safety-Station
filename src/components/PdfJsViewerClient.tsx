"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// PDF.js version to use from CDN
const PDFJS_VERSION = "4.0.379";

// Declare global pdfjsLib type
declare global {
  interface Window {
    pdfjsLib: {
      GlobalWorkerOptions: { workerSrc: string };
      getDocument: (src: { data: Uint8Array } | string) => {
        promise: Promise<PDFDocument>;
      };
    };
  }
}

interface PDFDocument {
  numPages: number;
  getPage: (pageNum: number) => Promise<PDFPage>;
}

interface PDFPage {
  getViewport: (params: { scale: number }) => PDFViewport;
  render: (params: {
    canvasContext: CanvasRenderingContext2D;
    viewport: PDFViewport;
  }) => { promise: Promise<void>; cancel: () => void };
}

interface PDFViewport {
  width: number;
  height: number;
}

interface RenderTask {
  promise: Promise<void>;
  cancel: () => void;
}

interface PdfJsViewerProps {
  pdfUrl: string;
  title?: string;
}

// Load PDF.js script from CDN
const loadPdfJsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.pdfjsLib) {
      resolve();
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector(
      'script[src*="pdf.min.mjs"]'
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", () =>
        reject(new Error("Failed to load PDF.js"))
      );
      return;
    }

    // Create and load the script
    const script = document.createElement("script");
    script.src = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.mjs`;
    script.type = "module";
    script.async = true;

    script.onload = () => {
      // Set worker source
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.mjs`;
        resolve();
      } else {
        reject(new Error("PDF.js loaded but pdfjsLib not found"));
      }
    };

    script.onerror = () => reject(new Error("Failed to load PDF.js script"));

    document.head.appendChild(script);
  });
};

const PdfJsViewer: React.FC<PdfJsViewerProps> = ({ pdfUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);

  // Load PDF.js library and document
  useEffect(() => {
    let isMounted = true;

    const loadPdf = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Load PDF.js from CDN
        await loadPdfJsScript();

        const pdfjsLib = window.pdfjsLib;
        if (!pdfjsLib) {
          throw new Error("PDF.js library not available");
        }

        // Prepare PDF data
        let pdfData: Uint8Array;

        if (pdfUrl.startsWith("data:")) {
          // For data URLs, extract base64 and convert directly
          const matches = pdfUrl.match(/^data:([^;]+);base64,(.+)$/);
          if (matches) {
            const base64Data = matches[2];
            const binaryString = atob(base64Data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            pdfData = bytes;
          } else {
            throw new Error("Invalid data URL format");
          }
        } else if (pdfUrl.startsWith("blob:")) {
          // For blob URLs, fetch the data first
          const response = await fetch(pdfUrl);
          const arrayBuffer = await response.arrayBuffer();
          pdfData = new Uint8Array(arrayBuffer);
        } else {
          // For regular URLs, let PDF.js handle it
          const loadingTask = pdfjsLib.getDocument(pdfUrl);
          const pdf = await loadingTask.promise;
          if (isMounted) {
            setPdfDoc(pdf);
            setTotalPages(pdf.numPages);
            setCurrentPage(1);
          }
          return;
        }

        // Load PDF from data
        const loadingTask = pdfjsLib.getDocument({ data: pdfData });
        const pdf = await loadingTask.promise;

        if (isMounted) {
          setPdfDoc(pdf);
          setTotalPages(pdf.numPages);
          setCurrentPage(1);
        }
      } catch (err) {
        console.error("Error loading PDF:", err);
        if (isMounted) {
          const errorMessage =
            err instanceof Error ? err.message : "Unknown error";
          setError(`Failed to load PDF: ${errorMessage}`);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPdf();

    return () => {
      isMounted = false;
    };
  }, [pdfUrl]);

  // Render current page
  const renderPage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current || !containerRef.current) return;

    try {
      // Cancel any ongoing render task
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // Ignore cancel errors
        }
      }

      const page = await pdfDoc.getPage(currentPage);
      const canvas = canvasRef.current;
      const container = containerRef.current;
      const context = canvas.getContext("2d");

      if (!context) return;

      // Calculate scale to fit container width while respecting zoom
      const containerWidth = container.clientWidth - 32; // Padding
      const containerHeight = container.clientHeight - 32;
      const viewport = page.getViewport({ scale: 1 });

      // Calculate scale to fit width or height
      const scaleToFitWidth = containerWidth / viewport.width;
      const scaleToFitHeight = containerHeight / viewport.height;
      const baseScale = Math.min(scaleToFitWidth, scaleToFitHeight);

      const finalScale = baseScale * scale;
      const scaledViewport = page.getViewport({ scale: finalScale });

      // Set canvas dimensions
      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;

      // Render the page
      renderTaskRef.current = page.render({
        canvasContext: context,
        viewport: scaledViewport,
      });
      await renderTaskRef.current.promise;
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "RenderingCancelledException") {
        console.error("Error rendering page:", err);
      }
    }
  }, [pdfDoc, currentPage, scale]);

  // Re-render when page or scale changes
  useEffect(() => {
    renderPage();
  }, [renderPage]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      renderPage();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderPage]);

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-800">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading PDF...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-800">
        <div className="text-center">
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col bg-gray-800">
      {/* Controls */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
        {/* Page Navigation */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevPage}
            disabled={currentPage <= 1}
            className="bg-gray-700 border-gray-600 hover:bg-gray-600"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-white text-sm px-3">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage >= totalPages}
            className="bg-gray-700 border-gray-600 hover:bg-gray-600"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="bg-gray-700 border-gray-600 hover:bg-gray-600"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-white text-sm px-3 min-w-[60px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={zoomIn}
            disabled={scale >= 3.0}
            className="bg-gray-700 border-gray-600 hover:bg-gray-600"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* PDF Canvas Container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto flex items-start justify-center p-4"
      >
        <canvas
          ref={canvasRef}
          className="shadow-lg"
          style={{ maxWidth: "100%" }}
        />
      </div>
    </div>
  );
};

export default PdfJsViewer;

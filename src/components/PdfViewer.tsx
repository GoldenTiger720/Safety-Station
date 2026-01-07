"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import PdfJsViewer with SSR disabled
const PdfJsViewer = dynamic(() => import("./PdfJsViewerClient"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-800">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-yellow-500 mx-auto mb-4" />
        <p className="text-gray-400">Loading PDF viewer...</p>
      </div>
    </div>
  ),
});

interface PdfViewerProps {
  pdfUrl: string;
  title?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl, title }) => {
  return <PdfJsViewer pdfUrl={pdfUrl} title={title} />;
};

export default PdfViewer;

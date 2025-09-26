import React from "react";
import { DepotButton } from "@/components/ui/depot-button";
import { ArrowLeft } from "lucide-react";

interface WebViewerProps {
  url: string;
  title: string;
  onBack: () => void;
}

const WebViewer: React.FC<WebViewerProps> = ({ url, title, onBack }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Back button positioned in upper right corner */}
      <div className="absolute top-4 right-4 z-10">
        <DepotButton
          variant="secondary"
          size="default"
          onClick={onBack}
          className="flex items-center gap-2 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </DepotButton>
      </div>

      {/* Full screen website iframe */}
      <iframe
        src={url}
        title={title}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
      />
    </div>
  );
};

export default WebViewer;
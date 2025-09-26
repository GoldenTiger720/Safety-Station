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
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Top navbar with back button */}
      <div className="flex items-center justify-between bg-depot-surface-elevated border-b border-gray-200 px-4 py-1" style={{height: '30px'}}>
        <div className="flex items-center gap-2">
          <DepotButton
            variant="secondary"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-1 h-6 px-2 py-0"
          >
            <ArrowLeft className="w-3 h-3" />
            Back
          </DepotButton>
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
      </div>

      {/* Website iframe below navbar */}
      <div className="flex-1">
        <iframe
          src={url}
          title={title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
        />
      </div>
    </div>
  );
};

export default WebViewer;
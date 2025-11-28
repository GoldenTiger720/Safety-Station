"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { DepotButton } from "@/components/ui/depot-button";
import { ArrowLeft, Loader2, ExternalLink } from "lucide-react";

interface WebViewerProps {
  url: string;
  title: string;
  onBack: () => void;
}

const WebViewer: React.FC<WebViewerProps> = ({ url, title, onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const openInNewWindow = useCallback(() => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, [url]);

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    try {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        const iframeLocation = iframe.contentWindow.location.href;
        if (iframeLocation === "about:blank") {
          openInNewWindow();
          onBack();
        }
      }
    } catch {
      openInNewWindow();
      onBack();
    }
  }, [openInNewWindow, onBack]);

  const handleIframeError = useCallback(() => {
    setIsLoading(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    openInNewWindow();
    onBack();
  }, [openInNewWindow, onBack]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        openInNewWindow();
        onBack();
      }
    }, 10000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoading, openInNewWindow, onBack]);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Top navbar with back button */}
      <div
        className="flex items-center justify-between bg-depot-surface-elevated border-b border-gray-200 px-4 py-1"
        style={{ height: "30px" }}
      >
        <div className="flex items-center gap-2">
          <DepotButton
            variant="secondary"
            onClick={onBack}
            className="flex items-center gap-1 h-6 px-2 py-0"
          >
            <ArrowLeft className="w-3 h-3" />
            Back
          </DepotButton>
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <DepotButton
            variant="secondary"
            onClick={openInNewWindow}
            className="flex items-center gap-1 h-6 px-2 py-0"
          >
            <ExternalLink className="w-3 h-3" />
            Open in New Tab
          </DepotButton>
          {isLoading && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Loader2 className="w-3 h-3 animate-spin" />
              Loading...
            </div>
          )}
        </div>
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-depot-surface to-depot-surface-elevated">
          <div className="text-center space-y-4">
            <div className="relative">
              <Loader2 className="w-12 h-12 animate-spin text-depot-primary mx-auto" />
              <div className="absolute inset-0 w-12 h-12 border-4 border-depot-accent/20 rounded-full mx-auto"></div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Loading {title}
              </h3>
              <p className="text-sm text-muted-foreground">
                Please wait while we prepare your content...
              </p>
            </div>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-depot-primary rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-depot-primary rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-depot-primary rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Website iframe below navbar */}
      <div className="flex-1" style={{ display: isLoading ? "none" : "block" }}>
        <iframe
          ref={iframeRef}
          src={url}
          title={title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      </div>
    </div>
  );
};

export default WebViewer;

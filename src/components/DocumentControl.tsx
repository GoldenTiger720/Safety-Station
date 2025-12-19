"use client";

import React from "react";
import { DepotButton } from "@/components/ui/depot-button";

const DocumentControl: React.FC = () => {
  const handleBPMSClick = () => {
    window.open(
      "https://rsrg.processdesign.bicplatform.de/client/#/view",
      "_blank"
    );
  };

  const handleDMSClick = () => {
    window.open(
      "https://rsrg.sharepoint.com/sites/wg-dms/SitePages/DMS-DOKUMENTE.aspx",
      "_blank"
    );
  };

  const handleTechnicalLibraryClick = () => {
    window.open(
      "https://rsrg.sharepoint.com/sites/re-rse/documents/Forms/Recent.aspx?id=%2Fsites%2Fre%2Drse%2Fdocuments%2FOperations%20Technical%20Library&newTargetListUrl=%2Fsites%2Fre%2Drse%2Fdocuments&viewpath=%2Fsites%2Fre%2Drse%2Fdocuments%2FForms%2FRecent%2Easpx",
      "_blank"
    );
  };

  return (
    <div className="flex items-center justify-center gap-6 p-8 m-4 border-2 border-border rounded-lg bg-card">
      <DepotButton
        variant="default"
        onClick={handleBPMSClick}
        className="text-lg py-6 px-12"
      >
        BPMS
      </DepotButton>

      <DepotButton
        variant="success"
        onClick={handleDMSClick}
        className="text-lg py-6 px-12"
      >
        DMS
      </DepotButton>

      <DepotButton
        variant="accent"
        onClick={handleTechnicalLibraryClick}
        className="text-lg py-6 px-12"
      >
        Technical Library
      </DepotButton>
    </div>
  );
};

export default DocumentControl;

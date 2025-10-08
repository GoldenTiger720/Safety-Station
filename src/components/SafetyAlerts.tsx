import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DepotButton } from "@/components/ui/depot-button";
import { AlertTriangle, FileText, Database } from "lucide-react";

const SafetyAlerts: React.FC = () => {
  const handleBPMSClick = () => {
    window.open("https://rsrg.processdesign.bicplatform.de/client/#/view", "_blank");
  };

  const handleDMSClick = () => {
    window.open("https://rsrg.sharepoint.com/sites/wg-dms/SitePages/DMS-DOKUMENTE.aspx", "_blank");
  };

  return (
    <div className="space-y-6 p-4">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl">
            <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500" />
            Safety Alerts & Systems
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-muted-foreground">
            Access important safety systems and documentation portals
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* BPMS Card */}
            <Card className="bg-depot-surface border-2 border-border hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Database className="w-6 h-6 text-blue-500" />
                  BPMS System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Business Process Management System - Access process workflows, documentation, and system controls.
                </p>
                <DepotButton
                  variant="default"
                  onClick={handleBPMSClick}
                  className="w-full text-lg py-6"
                >
                  Open BPMS
                </DepotButton>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Direct Link:</p>
                  <a
                    href="https://rsrg.processdesign.bicplatform.de/client/#/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:text-blue-600 break-all underline"
                  >
                    https://rsrg.processdesign.bicplatform.de/client/#/view
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* DMS Card */}
            <Card className="bg-depot-surface border-2 border-border hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <FileText className="w-6 h-6 text-green-500" />
                  DMS System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Document Management System - Access company documents, safety procedures, and compliance materials.
                </p>
                <DepotButton
                  variant="success"
                  onClick={handleDMSClick}
                  className="w-full text-lg py-6"
                >
                  Open DMS
                </DepotButton>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Direct Link:</p>
                  <a
                    href="https://rsrg.sharepoint.com/sites/wg-dms/SitePages/DMS-DOKUMENTE.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:text-blue-600 break-all underline"
                  >
                    https://rsrg.sharepoint.com/sites/wg-dms/SitePages/DMS-DOKUMENTE.aspx
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyAlerts;

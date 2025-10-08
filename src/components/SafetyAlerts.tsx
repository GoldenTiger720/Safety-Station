import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const SafetyAlerts: React.FC = () => {
  return (
    <div className="space-y-6 p-4">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl">
            <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500" />
            Safety Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-muted-foreground">
            Safety alerts and notifications will be displayed here
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyAlerts;

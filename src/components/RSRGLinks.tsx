"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Globe, Map, ExternalLink } from "lucide-react";

interface RSRGLinksProps {
  className?: string;
}

const RSRGLinks: React.FC<RSRGLinksProps> = ({ className }) => {
  const links = [
    {
      id: "spotlight",
      label: "Spotlight",
      icon: Star,
      url: "https://forms.office.com/Pages/ResponsePage.aspx?id=P6uWrWQ9VUSKyypPe63Cfyd-GXc638xPnbpuq9F_PqBUNTdZUDNRVTdHWFdXWkxETERROFJKV0RPMy4u",
      description: "Submit Spotlight Reports",
    },
    {
      id: "depot360",
      label: "Depot 360",
      icon: Globe,
      url: "#", // Placeholder URL - update with actual Depot 360 URL
      description: "Virtual Depot Tour",
    },
    {
      id: "maps",
      label: "RSRG Maps",
      icon: Map,
      url: "https://maps.rsrg.com/",
      description: "Location Maps",
    },
  ];

  const handleLinkClick = (url: string) => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Card className={`bg-gray-800 h-full flex flex-col ${className || "border-gray-700"}`}>
      <CardHeader className="pb-1 py-1 bg-gray-900 flex-shrink-0">
        <CardTitle className="text-[1vw] text-white text-right">
          RSRG Links
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 flex-1 flex items-center justify-center">
        <div className="flex flex-row gap-3 w-full">
          {links.map((link) => {
            const IconComponent = link.icon;
            return (
              <Button
                key={link.id}
                onClick={() => handleLinkClick(link.url)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 h-auto flex items-center justify-center gap-2 text-[0.9vw] font-semibold transition-all"
                disabled={link.url === "#"}
              >
                <IconComponent className="w-[1vw] h-[1vw]" />
                <span>{link.label}</span>
                {link.url !== "#" && (
                  <ExternalLink className="w-[0.8vw] h-[0.8vw] ml-1 opacity-70" />
                )}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RSRGLinks;

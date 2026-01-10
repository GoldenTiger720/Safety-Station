"use client";

import React from "react";
import { DepotButton } from "@/components/ui/depot-button";

interface NavigationItem {
  id: string;
  label: string;
  label1: string;
  icon: React.ReactNode | null;
  variant:
  | "default"
  | "secondary"
  | "accent"
  | "warning"
  | "success"
  | "surface";
  size: "default" | "lg" | "xl";
}

const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    label1: "",
    icon: null,
    variant: "accent",
    size: "default",
  },
  {
    id: "checkin",
    label: "Staff Check",
    label1: "In/Out",
    icon: null,
    variant: "default",
    size: "default",
  },
  {
    id: "induction",
    label: "Depot",
    label1: "Induction",
    icon: null,
    variant: "default",
    size: "default",
  },
  {
    id: "safety-alerts",
    label: "Safety",
    label1: "Alerts",
    icon: null,
    variant: "default",
    size: "default",
  },
  {
    id: "document-control",
    label: "Document",
    label1: "Control",
    icon: null,
    variant: "default",
    size: "default",
  },
  {
    id: "operation",
    label: "Planning",
    label1: "",
    icon: null,
    variant: "default",
    size: "default",
  },
  {
    id: "spotlight",
    label: "Spotlight",
    label1: "Report",
    icon: null,
    variant: "accent",
    size: "default",
  },
];

interface DepotNavigationProps {
  onItemClick: (itemId: string) => void;
  activeItem?: string;
}

const DepotNavigation: React.FC<DepotNavigationProps> = ({
  onItemClick,
  activeItem,
}) => {
  return (
    <div className="flex-shrink-0">
      <div className="py-2 px-2 bg-depot-surface-elevated">
        <div className="grid grid-cols-7 gap-2">
          {navigationItems.map((item) => (
            <DepotButton
              key={item.id}
              variant={activeItem === item.id ? "accent" : item.variant}
              onClick={() => onItemClick(item.id)}
              className="flex flex-col items-center justify-center leading-tight py-3"
            >
              <span className="text-[1.4vw] font-semibold text-center break-words">
                {item.label}
              </span>
              {item.label1 && (
                <span className="text-[1.4vw] font-semibold text-center break-words">
                  {item.label1}
                </span>
              )}
            </DepotButton>
          ))}
        </div>
      </div>
      {/* White separator line */}
      <div className="h-[2px] bg-white w-full"></div>
    </div>
  );
};

export default DepotNavigation;

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
    label1:"In/Out",
    icon: null,
    variant: "default",
    size: "default",
  },
  {
    id: "induction",
    label: "Depot",
    label1:  "Induction",
    icon: null,
    variant: "secondary",
    size: "default",
  },
  {
    id: "bpms",
    label: "BPMS",
    label1: "",
    icon: null,
    variant: "default",
    size: "default",
  },
  {
    id: "dms",
    label: "DMS",
    label1: "",
    icon: null,
    variant: "default",
    size: "default",
  },
  {
    id: "technical",
    label: "Technical",
    label1: "Library",
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
    <div className="p-2 sm:p-3 md:p-4 lg:p-2 bg-depot-surface-elevated">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1.5 sm:gap-2 md:gap-3">
        {navigationItems.map((item) => (
          <DepotButton
            key={item.id}
            variant={activeItem === item.id ? "accent" : item.variant}
            size={item.size}
            onClick={() => onItemClick(item.id)}
            className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 md:gap-2 h-auto py-1.5 sm:py-2 md:py-3 min-h-[70px] sm:min-h-[80px] md:min-h-[90px] lg:min-h-[100px] transition-all duration-200 hover:scale-105"
          >
            <span className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-base font-medium text-center leading-[1.2] break-words px-0.5 w-full hyphens-auto line-clamp-2 overflow-wrap-anywhere">
              {item.label}
            </span>
            <span className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-base font-medium text-center leading-[1.2] break-words px-0.5 w-full hyphens-auto line-clamp-2 overflow-wrap-anywhere">
              {item.label1}
            </span>
          </DepotButton>
        ))}
      </div>
    </div>
  );
};

export default DepotNavigation;

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
    <div className="p-1 sm:p-2 md:p-3 bg-depot-surface-elevated">
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 md:gap-2">
        {navigationItems.map((item) => (
          <DepotButton
            key={item.id}
            variant={activeItem === item.id ? "accent" : item.variant}
            size={item.size}
            onClick={() => onItemClick(item.id)}
            className="flex flex-col items-center justify-center sm:gap-1 "
          >
            <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-medium text-center leading-tight break-words w-full hyphens-auto overflow-wrap-anywhere">
              {item.label}
            </span>
            {item.label1 && (
              <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-medium text-center leading-tight break-words px-0.5 w-full hyphens-auto line-clamp-1 overflow-wrap-anywhere">
                {item.label1}
              </span>
            )}
          </DepotButton>
        ))}
      </div>
    </div>
  );
};

export default DepotNavigation;

import React from "react";
import { DepotButton } from "@/components/ui/depot-button";
import {
  UserCheck,
  GraduationCap,
  BarChart3,
  Database,
  Wrench,
  AlertTriangle,
  LayoutDashboard,
} from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  label1: string; 
  icon: React.ReactNode;
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
    icon: <LayoutDashboard className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />,
    variant: "accent",
    size: "default",
  },
  {
    id: "checkin",
    label: "Staff Check",
    label1:"In/Out",
    icon: <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />,
    variant: "default",
    size: "default",
  },
  {
    id: "induction",
    label: "Depot",
    label1:  "Induction",
    icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />,
    variant: "secondary",
    size: "default",
  },
  {
    id: "bpms",
    label: "BPMS",
    label1: "",
    icon: <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />,
    variant: "default",
    size: "default",
  },
  {
    id: "dms",
    label: "DMS",
    label1: "",
    icon: <Database className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />,
    variant: "default",
    size: "default",
  },
  {
    id: "technical",
    label: "Technical",
    label1: "Library",
    icon: <Wrench className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />,
    variant: "default",
    size: "default",
  },
  {
    id: "spotlight",
    label: "Spotlight",
    label1: "Report",
    icon: <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />,
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
    <div className="p-2 sm:p-3 md:p-4 lg:p-6 bg-depot-surface-elevated">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-2 md:gap-3">
        {navigationItems.map((item) => (
          <DepotButton
            key={item.id}
            variant={activeItem === item.id ? "accent" : item.variant}
            size={item.size}
            onClick={() => onItemClick(item.id)}
            className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 md:gap-2 h-auto py-1.5 sm:py-2 md:py-3 min-h-[70px] sm:min-h-[80px] md:min-h-[90px] lg:min-h-[100px] transition-all duration-200 hover:scale-105"
          >
            {item.icon}
            <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-medium text-center leading-[1.2] break-words px-0.5 w-full hyphens-auto line-clamp-2 overflow-wrap-anywhere">
              {item.label}
            </span>
            <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-medium text-center leading-[1.2] break-words px-0.5 w-full hyphens-auto line-clamp-2 overflow-wrap-anywhere">
              {item.label1}
            </span>
          </DepotButton>
        ))}
      </div>
    </div>
  );
};

export default DepotNavigation;

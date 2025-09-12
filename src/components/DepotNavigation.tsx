import React from "react";
import { DepotButton } from "@/components/ui/depot-button";
import {
  UserCheck,
  GraduationCap,
  BarChart3,
  Database,
  Wrench,
  Settings,
  AlertTriangle,
} from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
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
    id: "checkin",
    label: "Staff Check In/Out",
    icon: <UserCheck className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" />,
    variant: "default",
    size: "default",
  },
  {
    id: "induction",
    label: "Depot Induction",
    icon: <GraduationCap className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
    variant: "secondary",
    size: "default",
  },
  {
    id: "bpms",
    label: "BPMS",
    icon: <BarChart3 className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
    variant: "default",
    size: "default",
  },
  {
    id: "dms",
    label: "DMS",
    icon: <Database className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
    variant: "default",
    size: "default",
  },
  {
    id: "maintenance",
    label: "Maintenance Manuals",
    icon: <Wrench className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
    variant: "default",
    size: "default",
  },
  {
    id: "operation",
    label: "Operation Manuals",
    icon: <Settings className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
    variant: "default",
    size: "default",
  },
  {
    id: "spotlight",
    label: "Spotlight Report",
    icon: <AlertTriangle className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
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
    <div className="p-3 sm:p-4 md:p-6 bg-depot-surface-elevated">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
        {navigationItems.map((item) => (
          <DepotButton
            key={item.id}
            variant={activeItem === item.id ? "accent" : item.variant}
            size={item.size}
            onClick={() => onItemClick(item.id)}
            className="flex flex-col items-center justify-center gap-1 sm:gap-2 h-auto py-2 sm:py-3 md:py-4 min-h-[80px] sm:min-h-[100px] md:min-h-[120px] lg:min-h-[140px] transition-all duration-200 hover:scale-105"
          >
            {item.icon}
            <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-medium text-center leading-tight break-words px-1">
              {item.label}
            </span>
          </DepotButton>
        ))}
      </div>
    </div>
  );
};

export default DepotNavigation;

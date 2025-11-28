import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const depotButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-depot-primary text-primary-foreground shadow hover:bg-depot-primary/90",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        accent: "bg-depot-accent text-accent-foreground shadow hover:bg-depot-accent/90",
        warning: "bg-depot-warning text-white shadow hover:bg-depot-warning/90",
        success: "bg-depot-success text-white shadow hover:bg-depot-success/90",
        surface: "bg-depot-surface text-foreground shadow hover:bg-depot-surface-elevated",
        ghost: "hover:bg-depot-surface hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface DepotButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof depotButtonVariants> {
  asChild?: boolean;
}

const DepotButton = React.forwardRef<HTMLButtonElement, DepotButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(depotButtonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
DepotButton.displayName = "DepotButton";

export { DepotButton, depotButtonVariants };

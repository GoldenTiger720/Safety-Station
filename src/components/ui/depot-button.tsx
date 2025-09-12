import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const depotButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
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
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-16 rounded-xl px-8 text-lg",
        xl: "h-20 rounded-xl px-12 text-xl font-semibold",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface DepotButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof depotButtonVariants> {
  asChild?: boolean;
}

const DepotButton = React.forwardRef<HTMLButtonElement, DepotButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(depotButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
DepotButton.displayName = "DepotButton";

export { DepotButton, depotButtonVariants };
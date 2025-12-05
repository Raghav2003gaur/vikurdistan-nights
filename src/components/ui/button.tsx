import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Premium variants for Vikurdistan
        gold: "bg-gold-gradient text-deep-dark font-semibold hover:shadow-[0_0_30px_hsl(45_60%_53%/0.4)] hover:scale-[1.02] active:scale-[0.98]",
        "gold-outline": "border-2 border-gold text-gold hover:bg-gold/10 hover:shadow-[0_0_20px_hsl(45_60%_53%/0.3)]",
        forest: "bg-forest-gradient text-foreground font-semibold hover:shadow-[0_0_30px_hsl(156_60%_14%/0.4)] hover:scale-[1.02] active:scale-[0.98]",
        glass: "bg-[hsl(0_0%_100%/0.03)] border border-[hsl(0_0%_100%/0.08)] backdrop-blur-xl text-foreground hover:bg-[hsl(0_0%_100%/0.08)]",
        glow: "bg-gold text-deep-dark font-semibold animate-glow-pulse hover:scale-[1.02]",
        neon: "border border-blue-accent text-blue-accent hover:bg-blue-accent/10 hover:shadow-[0_0_25px_hsl(197_100%_47%/0.4)]",
        hero: "bg-gold-gradient text-deep-dark font-semibold text-base px-8 py-6 hover:shadow-[0_0_40px_hsl(45_60%_53%/0.5)] hover:scale-[1.03] active:scale-[0.98] rounded-xl",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        xl: "h-14 rounded-xl px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

// Import React
import * as React from "react";

// Import Radix Toggle primitive
import * as TogglePrimitive from "@radix-ui/react-toggle";

// Import class variance utility for styling variants
import { cva, type VariantProps } from "class-variance-authority";

// Utility for conditionally joining class names
import { cn } from "@/lib/utils";

// Define toggle styles with variants and sizes
const toggleVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    // Style variants
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      // Size variants
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    // Default variant values
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Toggle component with ref forwarding
const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

// Set display name for DevTools
Toggle.displayName = TogglePrimitive.Root.displayName;

// Export Toggle component and variants
export { Toggle, toggleVariants };

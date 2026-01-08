import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

// Wrapper for Sonner toast notifications with dynamic theme support
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme(); // Get current theme from Next.js

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          // Base toast styling
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          // Description text styling
          description: "group-[.toast]:text-muted-foreground",
          // Action button styling
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          // Cancel button styling
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };

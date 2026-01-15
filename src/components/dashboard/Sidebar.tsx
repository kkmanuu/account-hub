import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Shield,
  Bell,
  CreditCard,
  Flag,
  Users,
  ChevronLeft,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

// Navigation items for sidebar
const navItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "feature-flags", label: "Feature Flags", icon: Flag },
  { id: "team", label: "Team", icon: Users },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  // Sidebar collapse state & mobile menu state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sidebarWidth = isCollapsed ? 80 : 256; // Width based on collapse

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar container */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn(
          "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-50",
          "flex flex-col",
          "lg:relative lg:translate-x-0",
          !isMobileOpen && "-translate-x-full lg:translate-x-0"
        )}
        style={{ width: sidebarWidth }}
      >
        {/* Logo and collapse button */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          {/* Logo and title */}
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">S</span>
                </div>
                <span className="font-semibold text-sidebar-foreground">Settings</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapse/expand button */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
              <ChevronLeft className="h-4 w-4" />
            </motion.div>
          </Button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id); // Change section on click
                  setIsMobileOpen(false); // Close mobile menu if open
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  "text-sm font-medium",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                {/* Icon */}
                <Icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-primary")} />

                {/* Label (hidden when collapsed) */}
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-muted-foreground"
              >
                <p>v1.0.0</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  );
}

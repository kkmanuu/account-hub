import { useState } from "react";
import { motion } from "framer-motion";
import { Flag, Search, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";


interface Feature {
  id: string;
  name: string;
  description: string;
  environment: "beta" | "stable" | "experimental";
  enabled: boolean;
}

const initialFeatures: Feature[] = [
  {
    id: "dark-mode",
    name: "Dark Mode",
    description: "Enable dark mode theme for the application interface",
    environment: "stable",
    enabled: true,
  },
  {
    id: "ai-assistant",
    name: "AI Assistant",
    description: "AI-powered assistant for task automation and suggestions",
    environment: "beta",
    enabled: true,
  },
  {
    id: "advanced-analytics",
    name: "Advanced Analytics",
    description: "Deep insights with custom dashboards and reports",
    environment: "stable",
    enabled: false,
  },
  {
    id: "real-time-collab",
    name: "Real-time Collaboration",
    description: "Live cursors and simultaneous editing with team members",
    environment: "beta",
    enabled: true,
  },
  {
    id: "edge-compute",
    name: "Edge Computing",
    description: "Distributed processing at edge locations for reduced latency",
    environment: "experimental",
    enabled: false,
  },
  {
    id: "quantum-encrypt",
    name: "Quantum Encryption",
    description: "Next-generation encryption using quantum-resistant algorithms",
    environment: "experimental",
    enabled: false,
  },
  {
    id: "voice-commands",
    name: "Voice Commands",
    description: "Control the app using natural voice commands",
    environment: "beta",
    enabled: false,
  },
  {
    id: "biometric-auth",
    name: "Biometric Authentication",
    description: "Sign in using fingerprint or face recognition",
    environment: "stable",
    enabled: true,
  },
];

const environmentConfig = {
  stable: { label: "Stable", className: "bg-success/10 text-success border-success/20" },
  beta: { label: "Beta", className: "bg-primary/10 text-primary border-primary/20" },
  experimental: { label: "Experimental", className: "bg-warning/10 text-warning border-warning/20" },
};

export function FeatureFlagsSection() {
  const [features, setFeatures] = useState(initialFeatures);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEnvironment, setFilterEnvironment] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ open: boolean; feature: Feature | null }>({
    open: false,
    feature: null,
  });

  const filteredFeatures = features.filter((feature) => {
    const matchesSearch =
      feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterEnvironment || feature.environment === filterEnvironment;
    return matchesSearch && matchesFilter;
  });

  const handleToggle = (feature: Feature) => {
    if (feature.environment === "experimental" && !feature.enabled) {
      setConfirmDialog({ open: true, feature });
    } else {
      toggleFeature(feature.id);
    }
  };

  const toggleFeature = (featureId: string) => {
    setFeatures((prev) =>
      prev.map((f) => (f.id === featureId ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const confirmExperimentalFeature = () => {
    if (confirmDialog.feature) {
      toggleFeature(confirmDialog.feature.id);
    }
    setConfirmDialog({ open: false, feature: null });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-semibold">Feature Flags</h2>
        <p className="text-muted-foreground mt-1">
          Enable or disable features for your account
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-card rounded-xl border border-border p-4 shadow-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {Object.entries(environmentConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() =>
                  setFilterEnvironment(filterEnvironment === key ? null : key)
                }
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all border",
                  filterEnvironment === key
                    ? config.className
                    : "text-muted-foreground border-border hover:bg-muted"
                )}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feature List */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="divide-y divide-border">
          {filteredFeatures.map((feature, index) => {
            const envConfig = environmentConfig[feature.environment];
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 rounded-lg bg-muted mt-0.5">
                      <Flag className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="font-medium">{feature.name}</h4>
                        <Badge variant="outline" className={envConfig.className}>
                          {envConfig.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={feature.enabled}
                    onCheckedChange={() => handleToggle(feature)}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredFeatures.length === 0 && (
          <div className="p-8 text-center">
            <Flag className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No features found</p>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog
        open={confirmDialog.open}
        onOpenChange={(open) =>
          setConfirmDialog({ open, feature: open ? confirmDialog.feature : null })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Enable Experimental Feature?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.feature && (
                <>
                  You're about to enable <strong>{confirmDialog.feature.name}</strong>.
                  Experimental features may be unstable and could change or be removed
                  without notice. Are you sure you want to proceed?
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmExperimentalFeature}
              className="bg-warning text-warning-foreground hover:bg-warning/90"
            >
              Enable Feature
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
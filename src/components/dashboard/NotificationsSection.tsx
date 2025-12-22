import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Bell, MessageSquare } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";


interface NotificationCategory {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface NotificationGroup {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  masterEnabled: boolean;
  categories: NotificationCategory[];
}

const initialNotifications: NotificationGroup[] = [
  {
    id: "email",
    title: "Email Notifications",
    description: "Receive notifications via email",
    icon: Mail,
    masterEnabled: true,
    categories: [
      { id: "product", title: "Product updates", description: "New features and improvements", enabled: true },
      { id: "billing", title: "Billing alerts", description: "Payment confirmations and invoices", enabled: true },
      { id: "security", title: "Security alerts", description: "Suspicious activity and login attempts", enabled: true },
      { id: "tips", title: "Tips & tutorials", description: "Helpful guides and best practices", enabled: false },
    ],
  },
  {
    id: "inapp",
    title: "In-App Notifications",
    description: "Notifications within the application",
    icon: Bell,
    masterEnabled: true,
    categories: [
      { id: "mentions", title: "Mentions", description: "When someone mentions you", enabled: true },
      { id: "comments", title: "Comments", description: "Replies to your posts", enabled: true },
      { id: "updates", title: "Status updates", description: "Task and project updates", enabled: true },
      { id: "reminders", title: "Reminders", description: "Scheduled reminders", enabled: false },
    ],
  },
  {
    id: "sms",
    title: "SMS Alerts",
    description: "Critical alerts via text message",
    icon: MessageSquare,
    masterEnabled: false,
    categories: [
      { id: "critical", title: "Critical alerts", description: "System outages and critical issues", enabled: true },
      { id: "payment", title: "Payment alerts", description: "Failed payments and renewals", enabled: true },
    ],
  },
];

export function NotificationsSection() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const { toast } = useToast();

  const handleMasterToggle = (groupId: string) => {
    setNotifications((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? { ...group, masterEnabled: !group.masterEnabled }
          : group
      )
    );
    toast({
      title: "Preferences updated",
      description: "Your notification settings have been saved.",
    });
  };

  const handleCategoryToggle = (groupId: string, categoryId: string) => {
    setNotifications((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              categories: group.categories.map((cat) =>
                cat.id === categoryId ? { ...cat, enabled: !cat.enabled } : cat
              ),
            }
          : group
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-semibold">Notifications</h2>
        <p className="text-muted-foreground mt-1">
          Choose what notifications you want to receive
        </p>
      </div>

      <div className="space-y-6">
        {notifications.map((group, groupIndex) => {
          const Icon = group.icon;
          return (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
              className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
            >
              {/* Header with master toggle */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{group.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {group.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={group.masterEnabled}
                    onCheckedChange={() => handleMasterToggle(group.id)}
                  />
                </div>
              </div>

              {/* Categories */}
              <motion.div
                initial={false}
                animate={{
                  height: group.masterEnabled ? "auto" : 0,
                  opacity: group.masterEnabled ? 1 : 0,
                }}
                className="overflow-hidden"
              >
                <div className="p-2">
                  {group.categories.map((category, catIndex) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: catIndex * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-sm">{category.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                      <Switch
                        checked={category.enabled}
                        onCheckedChange={() =>
                          handleCategoryToggle(group.id, category.id)
                        }
                        disabled={!group.masterEnabled}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
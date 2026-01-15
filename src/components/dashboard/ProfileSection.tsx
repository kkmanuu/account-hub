import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/hooks/use-toast";

// Initial profile data
const initialProfile = {
  fullName: "John Doe",
  email: "john@company.com",
  role: "Admin",
  timezone: "America/New_York",
  language: "en",
};

export function ProfileSection() {
  const [profile, setProfile] = useState(initialProfile); // current state
  const [originalProfile] = useState(initialProfile); // for comparing changes
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Check if there are unsaved changes
  const hasChanges = JSON.stringify(profile) !== JSON.stringify(originalProfile);

  // Simulate saving profile changes
  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate API call
    setIsSaving(false);
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully.",
    });
  };

  // Reset to original values
  const handleCancel = () => {
    setProfile(originalProfile);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Profile</h2>
        <p className="text-muted-foreground mt-1">
          Manage your personal information and preferences
        </p>
      </div>

      {/* Avatar / Profile photo */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-card">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Profile Photo
        </h3>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=192&h=192&fit=crop&crop=face" />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-medium">
                JD
              </AvatarFallback>
            </Avatar>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute inset-0 flex items-center justify-center bg-foreground/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Camera className="h-6 w-6 text-background" />
            </motion.button>
          </div>
          <div>
            <Button variant="outline" size="sm">
              Upload new photo
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              JPG, PNG or GIF. Max size 2MB.
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-card">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
          Personal Information
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={profile.fullName}
              onChange={(e) =>
                setProfile({ ...profile, fullName: e.target.value })
              }
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              placeholder="Enter your email"
            />
          </div>

          {/* Role (disabled) */}
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" value={profile.role} disabled className="bg-muted" />
            <p className="text-xs text-muted-foreground">
              Contact an admin to change your role
            </p>
          </div>

          {/* Timezone */}
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={profile.timezone}
              onValueChange={(value) =>
                setProfile({ ...profile, timezone: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                <SelectItem value="Europe/London">London (GMT)</SelectItem>
                <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={profile.language}
              onValueChange={(value) =>
                setProfile({ ...profile, language: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions: Save / Cancel */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: hasChanges ? 1 : 0,
            height: hasChanges ? "auto" : 0,
          }}
          className="flex items-center gap-3 mt-6 pt-6 border-t border-border"
        >
          <Button onClick={handleSave} disabled={isSaving || !hasChanges}>
            {isSaving ? (
              // Loading spinner
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}
                className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full"
              />
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Save changes
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleCancel} disabled={!hasChanges}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

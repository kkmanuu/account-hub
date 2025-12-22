import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Plus, Mail, MoreHorizontal, Shield, UserX, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member";
  avatar?: string;
  status: "active" | "pending";
}

const initialMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    role: "owner",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@company.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face",
    status: "active",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@company.com",
    role: "member",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face",
    status: "active",
  },
  {
    id: "4",
    name: "Emily Wilson",
    email: "emily@company.com",
    role: "member",
    status: "pending",
  },
];

const roleConfig = {
  owner: { label: "Owner", icon: Crown, className: "bg-warning/10 text-warning border-warning/20" },
  admin: { label: "Admin", icon: Shield, className: "bg-primary/10 text-primary border-primary/20" },
  member: { label: "Member", icon: Users, className: "bg-muted text-muted-foreground border-border" },
};

export function TeamSection() {
  const [members] = useState(initialMembers);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const handleInvite = () => {
    // Handle invite logic
    setInviteEmail("");
    setInviteRole("member");
    setIsInviteOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Team</h2>
          <p className="text-muted-foreground mt-1">
            Manage your team members and their permissions
          </p>
        </div>
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your team
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInvite} disabled={!inviteEmail}>
                <Mail className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Team Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="bg-card rounded-xl border border-border p-4 shadow-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{members.filter((m) => m.status === "active").length}</p>
              <p className="text-sm text-muted-foreground">Active Members</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 shadow-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Mail className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{members.filter((m) => m.status === "pending").length}</p>
              <p className="text-sm text-muted-foreground">Pending Invites</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 shadow-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted">
              <Shield className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">{members.filter((m) => m.role === "admin" || m.role === "owner").length}</p>
              <p className="text-sm text-muted-foreground">Admins</p>
            </div>
          </div>
        </div>
      </div>

      {/* Member List */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-medium">All Members</h3>
        </div>
        <div className="divide-y divide-border">
          {members.map((member, index) => {
            const roleInfo = roleConfig[member.role];
            const RoleIcon = roleInfo.icon;
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{member.name}</p>
                        {member.status === "pending" && (
                          <Badge variant="outline" className="text-xs">
                            Pending
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={cn("gap-1", roleInfo.className)}>
                      <RoleIcon className="h-3 w-3" />
                      {roleInfo.label}
                    </Badge>
                    {member.role !== "owner" && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Shield className="h-4 w-4 mr-2" />
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <UserX className="h-4 w-4 mr-2" />
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Download, Check, Zap, Crown, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    icon: Zap,
    features: ["5 team members", "10GB storage", "Basic analytics", "Email support"],
    current: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    icon: Crown,
    features: ["Unlimited team members", "100GB storage", "Advanced analytics", "Priority support", "Custom integrations"],
    current: true,
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    icon: Building,
    features: ["Everything in Pro", "Unlimited storage", "Dedicated support", "SLA guarantee", "Custom contracts"],
    current: false,
  },
];

const invoices = [
  { id: "INV-001", date: "Dec 1, 2024", amount: "$29.00", status: "Paid" },
  { id: "INV-002", date: "Nov 1, 2024", amount: "$29.00", status: "Paid" },
  { id: "INV-003", date: "Oct 1, 2024", amount: "$29.00", status: "Paid" },
  { id: "INV-004", date: "Sep 1, 2024", amount: "$29.00", status: "Paid" },
];

const usage = [
  { label: "Storage", used: 45, total: 100, unit: "GB" },
  { label: "API Calls", used: 8500, total: 10000, unit: "calls" },
  { label: "Team Members", used: 8, total: 50, unit: "members" },
];

export function BillingSection() {
  const [currentPlan] = useState("pro");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-semibold">Billing & Subscription</h2>
        <p className="text-muted-foreground mt-1">
          Manage your subscription and billing details
        </p>
      </div>

      {/* Current Plan */}
      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          const isCurrent = plan.id === currentPlan;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative bg-card rounded-xl border p-6 shadow-card transition-all",
                isCurrent ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}
              {isCurrent && (
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                    Current Plan
                  </Badge>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={cn(
                  "p-2 rounded-lg",
                  isCurrent ? "bg-primary/10" : "bg-muted"
                )}>
                  <Icon className={cn(
                    "h-5 w-5",
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  )} />
                </div>
                <h3 className="font-semibold">{plan.name}</h3>
              </div>

              <div className="mb-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className={cn(
                      "h-4 w-4",
                      isCurrent ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={isCurrent ? "outline" : "default"}
                className="w-full"
                disabled={isCurrent}
              >
                {isCurrent ? "Current Plan" : plan.price === 0 ? "Downgrade" : "Upgrade"}
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Usage */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-card">
        <h3 className="font-medium mb-6">Current Usage</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {usage.map((item) => {
            const percentage = (item.used / item.total) * 100;
            return (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-muted-foreground">
                    {item.used.toLocaleString()} / {item.total.toLocaleString()} {item.unit}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {Math.round(percentage)}% used
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Payment Method</h3>
          <Button variant="outline" size="sm">
            Update
          </Button>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-background">
          <div className="p-2 rounded-lg bg-muted">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">•••• •••• •••• 4242</p>
            <p className="text-sm text-muted-foreground">Expires 12/26</p>
          </div>
          <Badge variant="secondary" className="ml-auto">Visa</Badge>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-medium">Billing History</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
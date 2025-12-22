import { useState } from "react";
import { Helmet } from "react-helmet";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { ProfileSection } from "@/components/dashboard/ProfileSection";
import { SecuritySection } from "@/components/dashboard/SecuritySection";
import { NotificationsSection } from "@/components/dashboard/NotificationsSection";
import { BillingSection } from "@/components/dashboard/BillingSection";
import { FeatureFlagsSection } from "@/components/dashboard/FeatureFlagsSection";
import { TeamSection } from "@/components/dashboard/TeamSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />;
      case "security":
        return <SecuritySection />;
      case "notifications":
        return <NotificationsSection />;
      case "billing":
        return <BillingSection />;
      case "feature-flags":
        return <FeatureFlagsSection />;
      case "team":
        return <TeamSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Settings - SaaS Dashboard</title>
        <meta name="description" content="Manage your account settings, security preferences, billing, and team members in one place." />
      </Helmet>
      
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          
          <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
              {renderSection()}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Index;
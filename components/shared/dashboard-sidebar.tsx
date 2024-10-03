"use client";

import {
  LayoutDashboardIcon,
  LucideSettings,
  Package,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import SideNavItem from "./side-nav-item";
import ProfileCard from "./profile-card";
import Image from "next/image";

const DashboardSidebar: React.FC = () => {
  const [uniqueLink, setUniqueLink] = useState<string>("");

  useEffect(() => {
    const storedBusiness = localStorage.getItem("businessDetails");
    if (storedBusiness) {
      const businessDetails = JSON.parse(storedBusiness);
      const businessUniqueLink = businessDetails.unique_link; // Extract unique link
      const businessName = businessDetails.name; // To ensure formatting is consistent

      if (businessUniqueLink && businessName) {
        setUniqueLink(
          `revela.live/${businessName.toLowerCase().replace(/\s+/g, '-')}/${businessUniqueLink}`
        );
      }
    }
  }, []);

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Image
            src="/images/logo-alt.svg"
            alt="Image"
            width={53}
            height={53}
            className="w-36 h-full"
          />
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <SideNavItem href="/dashboard" icon={LayoutDashboardIcon}>
              Dashboard
            </SideNavItem>
            <SideNavItem href="/dashboard/customers" icon={Users}>
              Customers
            </SideNavItem>
            <SideNavItem href="/dashboard/products" icon={Package}>
              Products
            </SideNavItem>
            <SideNavItem href="/dashboard/user-settings" icon={LucideSettings}>
              Settings
            </SideNavItem>
          </nav>
        </div>
        <ProfileCard uniqueLink={uniqueLink} />
      </div>
    </div>
  );
};

export default DashboardSidebar;

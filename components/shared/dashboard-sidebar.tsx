"use client";

import {
  CircleUser,
  LayoutDashboardIcon,
  LineChart,
  LucideSettings,
  Package,
  Users,
} from "lucide-react";
import React from "react";
import SideNavItem from "./side-nav-item";
import ProfileCard from "./profile-card";
import Image from "next/image";

const DashboardSidebar: React.FC = () => {
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
        <ProfileCard />
      </div>
    </div>
  );
};

export default DashboardSidebar;

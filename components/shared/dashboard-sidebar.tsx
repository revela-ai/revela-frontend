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
import { Button } from "../ui/button";
import RevelaLogo from "./logo";
import SideNavItem from "./side-nav-item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const DashboardSidebar: React.FC = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <RevelaLogo imageClassName="w-8" textClassName="lg:text-xl" />
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <SideNavItem href="/dashboard" icon={LayoutDashboardIcon}>
              Dashboard
            </SideNavItem>
            <SideNavItem href="/dashboard/products" icon={Package}>
              Products
            </SideNavItem>
            <SideNavItem href="/dashboard/customers" icon={Users}>
              Customers
            </SideNavItem>
            <SideNavItem href="/dashboard/analytics" icon={LineChart}>
              Analytics
            </SideNavItem>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className=" border rounded-md shadow-lg p-4 flex items-center">
            <CircleUser />
            <div className="mx-auto text-muted-foreground text-xs">
              <p className="text-primary font-semibold">Precious A.</p>
              <p>Upgrade Plan</p>
            </div>
            <div className="ms-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <LucideSettings />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="border bg-slate-50 rounded-md p-2"
                >
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;

"use client"

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  Bell,
  CircleUser,
  HomeIcon,
  LineChart,
  LucideSettings,
  Menu,
  Package,
  Search,
  Users,
} from "lucide-react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import RevelaLogo from "./logo";
import SideNavItem from "./side-nav-item"; 

export default function MobileDashboardSidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <header className="flex h-14 items-center gap-4 px-4 lg:h-[60px] lg:px-6">
      <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-4 text-lg font-medium">
            <RevelaLogo imageClassName="w-8" textClassName="lg:text-xl"/>
            <SideNavItem href="/dashboard" icon={HomeIcon} onClick={() => setSidebarOpen(false)}>Dashboard</SideNavItem>
            <SideNavItem href="/dashboard/products" icon={Package} onClick={() => setSidebarOpen(false)}>Products</SideNavItem>
            <SideNavItem href="/dashboard/customers" icon={Users} onClick={() => setSidebarOpen(false)}>Customers</SideNavItem>
            <SideNavItem href="/dashboard/analytics" icon={LineChart} onClick={() => setSidebarOpen(false)}>Analytics</SideNavItem>
          </nav>
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
                    <span className="sr-only">Toggle settings menu</span>
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
        </SheetContent>
      </Sheet>
      <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
    </header>
  );
}

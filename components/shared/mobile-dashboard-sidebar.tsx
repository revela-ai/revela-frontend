"use client";

import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { HomeIcon, LucideSettings, Menu, Package, Users } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SideNavItem from "./side-nav-item";
import ProfileCard from "./profile-card";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { getCookie } from "@/utils/utils";
import Image from "next/image";
import UserAccount from "./user-account";
import { useToast } from "@/hooks/use-toast";

export default function MobileDashboardSidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [avatarFallback, setAvatarFallback] = useState<string>("P");
  const [uniqueLink, setUniqueLink] = useState<string>("");
  const pathname = usePathname();
  const pathSegments = pathname?.split("/").filter(Boolean) || [];
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return { href, label: segment.charAt(0).toUpperCase() + segment.slice(1) };
  });

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const storedBusiness = localStorage.getItem("businessDetails");
    if (storedBusiness) {
      const businessDetails = JSON.parse(storedBusiness);
      const businessName = businessDetails.name;
      const businessUniqueLink = businessDetails.unique_link;
      if (businessName) {
        setAvatarFallback(businessName.charAt(0).toUpperCase());
      }
      if (businessUniqueLink) {
        setUniqueLink(`revela.live/${businessName.toLowerCase().replace(/\s+/g, '-')}/${businessUniqueLink}`);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      const csrfToken = getCookie("csrftoken");
      const accessToken = getCookie("access_token");
      const refreshToken = getCookie("refresh_token");

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (csrfToken) {
        headers["X-CSRFToken"] = csrfToken;
      }

      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const response = await fetch(
        "https://quantum-backend-sxxx.onrender.com/accounts/logout/",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ refresh: refreshToken }),
          credentials: "include",
        }
      );

      if (response.ok) {
        document.cookie =
          "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        document.cookie =
          "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";

        toast({
          title: "Successfully logged out",
          description: "You will be redirected shortly.",
        });

        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } else {
        toast({
          title: "Logout failed",
          description: "Unable to log out. Please try again.",
          variant: "destructive",
        });
        console.error("Logout failed");
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "An error occurred during logout. Please try again.",
        variant: "destructive",
      });
      console.error("An error occurred during logout", error);
    }
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b lg:border bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 xl:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-4 text-lg font-medium">
            <Image
              src="/images/logo-alt.svg"
              alt="Image"
              width={53}
              height={53}
              className="w-36 h-full"
            />
            <SideNavItem
              href="/dashboard"
              icon={HomeIcon}
              onClick={() => setSidebarOpen(false)}
            >
              Dashboard
            </SideNavItem>
            <SideNavItem
              href="/dashboard/products"
              icon={Package}
              onClick={() => setSidebarOpen(false)}
            >
              Products
            </SideNavItem>
            <SideNavItem
              href="/dashboard/customers"
              icon={Users}
              onClick={() => setSidebarOpen(false)}
            >
              Customers
            </SideNavItem>
            {/* <SideNavItem
              href="/dashboard/user-settings"
              icon={LucideSettings}
              onClick={() => setSidebarOpen(false)}
            >
              Settings
            </SideNavItem> */}
          </nav>
          <ProfileCard uniqueLink={uniqueLink} />
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {breadcrumbItems.length === 0 ? (
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ) : (
            breadcrumbItems.map((item, index) => (
              <React.Fragment key={item.href}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <UserAccount avatarFallback={avatarFallback} handleLogout={handleLogout}/>
    </header>
  );
}

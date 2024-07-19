"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from "@/components/shared/dashboard-sidebar";
import MobileDashboardSidebar from "@/components/shared/mobile-dashboard-sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const accessToken = document.cookie.split('; ').find(row => row.startsWith('access_token='));

    if (!accessToken) {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardSidebar/>
      <div className="flex flex-col">
        <MobileDashboardSidebar/>
        <main>{children}</main>
      </div>
    </div>
  );
}

import DashboardSidebar from "@/components/shared/dashboard-sidebar";
import MobileDashboardSidebar from "@/components/shared/mobile-dashboard-sidebar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

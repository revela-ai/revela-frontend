import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { FC } from "react";
import { LucideIcon } from "lucide-react";

interface SideNavItemProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  onClick?: () => void;
}

const SideNavItem: FC<SideNavItemProps> = ({ href, icon: Icon, children, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 text-base rounded-lg px-3 py-2 transition-all ${
        isActive ? "bg-primary text-white" : "text-muted-foreground hover:text-primary"
      }`}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Link>
  );
};

export default SideNavItem;

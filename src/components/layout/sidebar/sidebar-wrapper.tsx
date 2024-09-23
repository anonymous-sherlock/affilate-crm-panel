"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/providers/sidebar";

interface Props {
  children: React.ReactNode;
}
export const SidebarWrapper = ({ children }: Props) => {
  const { isOpen } = useSidebar();
  return (
    <nav className={cn("sidebar-transition fixed top-0 z-[50] h-screen w-0 overflow-hidden bg-white shadow-md md:left-0 md:w-[--sidebar-width]", isOpen && "w-[--sidebar-width]")}>
      {children}
    </nav>
  );
};

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/providers/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <div className="bg-light-backgorund">
        <Sidebar />
        <Header />
        <div className="sidebar-transition pc-container min-h-[100vh]">
          <div className="pc-content">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;

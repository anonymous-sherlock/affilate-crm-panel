import React, { Suspense } from "react";

import { Breadcrumbs } from "@/components/global/breadcrumbs";
import { PageLoader } from "@/components/global/page-loader";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/providers/sidebar";

type Props = {
  children: React.ReactNode;
};

function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <div className="bg-light-backgorund">
        <Sidebar />
        <Header />
        <Suspense fallback={<PageLoader />}>
          <div className="sidebar-transition pc-container ml-0 min-h-[100vh] overflow-x-hidden md:ml-[--sidebar-width]">
            <div className="pc-content">
              <Breadcrumbs separator="/" />
              {children}
            </div>
          </div>
        </Suspense>
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;

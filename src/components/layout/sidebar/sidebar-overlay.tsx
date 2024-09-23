"use client";

import React from "react";
import { useSidebar } from "@/providers/sidebar";
import { cn } from "@/lib/utils";

export const SidebarOverlay = () => {
  const { closeSidebar, isOpen } = useSidebar();
  return <div onClick={() => closeSidebar()} className={cn("fixed inset-0 z-[49] max-h-screen bg-[#00000026] backdrop-blur-[7px] md:hidden", isOpen ? "block" : "hidden")} />;
};

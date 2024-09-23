"use client";
import { useMediaQuery } from "@mantine/hooks";
import React, { createContext, ReactNode, useContext, useEffect, useLayoutEffect, useState } from "react";

interface SidebarContextProps {
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isDestopDevice = useMediaQuery("(min-width: 769px)") ?? false;
  const [isOpen, setIsOpen] = useState(isDestopDevice ?? true);

  useEffect(() => {});

  useLayoutEffect(() => {
    if (isOpen) {
      document.documentElement.style.setProperty("--sidebar-width", "280px");
    } else {
      document.documentElement.style.setProperty("--sidebar-width", "0px");
    }
  }, [isOpen]);

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return <SidebarContext.Provider value={{ isOpen, openSidebar, closeSidebar, toggleSidebar }}>{children}</SidebarContext.Provider>;
};

export const useSidebar = (): SidebarContextProps => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

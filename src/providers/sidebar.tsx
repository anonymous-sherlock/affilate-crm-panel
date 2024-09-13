"use client";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface SidebarContextProps {
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Change CSS variable based on the `isOpen` state
    if (isOpen) {
      document.documentElement.style.setProperty("--sidebar-width", "280px"); // Set the sidebar width when open
    } else {
      document.documentElement.style.setProperty("--sidebar-width", "0px"); // Set the sidebar width to 0px when closed
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

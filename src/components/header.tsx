"use client";
import { PanelTopClose } from "lucide-react";
import { Bell, CirclesFour, GearSix } from "@phosphor-icons/react";
import React from "react";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useSidebar } from "@/providers/sidebar";

export const Header = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="sidebar-transition fixed grid place-items-center top-0 bg-[#f4f7fab3] right-0 left-[--sidebar-width] z-[999] min-h-[74px] backdrop-blur-[7px]">
      <div className="px-4 w-full flex justify-between items-center">
        <div>
          <Button size="icon" variant="secondary" onClick={() => toggleSidebar()}>
            <PanelTopClose className="rotate-90" />
          </Button>
        </div>
        <div className="flex gap-3">
          <Button size="icon" variant="secondary">
            <CirclesFour size={26} weight="duotone" />
          </Button>
          <Button size="icon" variant="secondary">
            <GearSix size={26} weight="duotone" />
          </Button>
          <Button size="icon" variant="secondary">
            <Bell size={26} weight="duotone" />
          </Button>
          <UserButton />
        </div>
      </div>
    </header>
  );
};

"use client";

import { Bell, CirclesFour, GearSix } from "@phosphor-icons/react";
import { List } from "@phosphor-icons/react/dist/ssr";

import { useSidebar } from "@/providers/sidebar";

import { Button } from "../ui/button";
import { ProfileMenuDropdown } from "./header/profile-menu-dropdown";
import { SearchBar } from "./header/search-bar";

export const Header = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="sidebar-transition fixed left-0 right-0 top-0 z-[29] grid min-h-[74px] place-items-center bg-[#f4f7fab3] backdrop-blur-[4px] md:left-[--sidebar-width]">
      <div className="flex w-full items-center justify-between gap-3 px-4">
        <div className="flex items-center justify-start gap-3">
          <Button size="icon" variant="secondary" onClick={() => toggleSidebar()}>
            <List size={26} weight="bold" />
          </Button>
          <SearchBar />
        </div>
        <div className="flex items-center gap-3">
          <Button size="icon" variant="secondary">
            <CirclesFour size={26} weight="duotone" />
          </Button>
          <Button size="icon" variant="secondary">
            <GearSix size={26} weight="duotone" className="animate-spin-slow" />
          </Button>
          <Button size="icon" variant="secondary">
            <Bell size={26} weight="duotone" />
          </Button>
          <ProfileMenuDropdown />
        </div>
      </div>
    </header>
  );
};

"use client";

import Link from "next/link";

import { SignOutButton } from "@clerk/nextjs";
import { Gear, Lock, Power, User, WindowsLogo } from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

export function UserDropdownMenu() {
  return (
    <Popover>
      <PopoverTrigger className="flex size-10 items-center justify-center rounded-full bg-btn-hover">
        <WindowsLogo weight="duotone" size={24} />
      </PopoverTrigger>
      <PopoverContent side="top" align="end" className={cn("w-fit p-0 !shadow-card-shadow")}>
        <ul className="flex max-w-[250px] flex-wrap items-center justify-center">
          <li className="before:height-[1px] relative flex-[50%_1] before:absolute before:bottom-[-2px] before:left-0 before:w-full before:overflow-hidden before:border-b before:opacity-60">
            <Link href="#" className="group/link-hover m-[8px] flex flex-col items-center gap-2 rounded-md p-[12px_4px] hover:bg-primary/10">
              <User size={26} weight="duotone" className="group-hover/link-hover:text-primary" />
              <span className="text-sm group-hover/link-hover:text-primary">My Account</span>
            </Link>
          </li>
          <li className="before:height-[1px] relative flex-[50%_1] before:absolute before:bottom-[-2px] before:left-0 before:w-full before:overflow-hidden before:border-b before:opacity-60 after:absolute after:left-0 after:top-0 after:h-full after:w-[1px] after:border-l after:opacity-60">
            <Link href="#" className="group/link-hover m-[8px] flex flex-col items-center gap-2 rounded-md p-[12px_4px] hover:bg-primary/10">
              <Gear size={26} weight="duotone" className="group-hover/link-hover:text-primary" />
              <span className="text-sm group-hover/link-hover:text-primary">Settings</span>
            </Link>
          </li>
          <li className="relative flex-[50%_1]">
            <Link href="#" className="group/link-hover m-[8px] flex flex-col items-center gap-2 rounded-md p-[12px_4px] hover:bg-primary/10">
              <Lock size={26} weight="duotone" className="group-hover/link-hover:text-primary" />
              <span className="text-sm group-hover/link-hover:text-primary">Lock Screen</span>
            </Link>
          </li>
          <li className="relative flex-[50%_1] after:absolute after:left-0 after:top-0 after:h-full after:w-[1px] after:border-l after:opacity-60">
            <SignOutButton signOutOptions={{ redirectUrl: "/sign-in" }}>
              <div className="group/link-hover m-[8px] flex cursor-pointer flex-col items-center gap-2 rounded-md p-[12px_4px] hover:bg-destructive/10">
                <Power size={26} weight="duotone" className="group-hover/link-hover:text-destructive" />
                <span className="text-sm group-hover/link-hover:text-destructive">Logout</span>
              </div>
            </SignOutButton>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}

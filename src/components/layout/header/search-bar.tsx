"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import React from "react";

export const SearchBar = () => {
  return (
    <>
      <Button
        variant="outline"
        size="lg"
        className={cn(
          "relative hidden h-10 items-center justify-start rounded-md border border-input bg-white px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-white/50 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-transparent sm:pr-12 md:inline-flex md:w-40 lg:w-64",
        )}
        onClick={() => {
          var event = new KeyboardEvent("keydown", {
            key: "k",
            ctrlKey: true, // for Ctrl + K
            metaKey: true, // for Command + K
          });

          document.dispatchEvent(event);
        }}
      >
        <MagnifyingGlass size={20} weight="duotone" className="mr-2" />
        <span className="hidden md:inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1/2 hidden h-5 -translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <Button size="icon" variant="secondary" className="flex md:hidden">
        <MagnifyingGlass size={26} weight="duotone" />
      </Button>
    </>
  );
};

"use client";

import { usePathname } from "next/navigation";
import React from "react";

import { menuItems } from "@/constant/menu";
import "@/styles/sidebar.module.css";

import { MenuItem } from "./menu-items";

export const MenuLists = () => {
  const pathname = usePathname();
  return (
    <ul className="list-none">
      {menuItems.map((menu, index) => {
        return (
          <React.Fragment key={menu.label}>
            <li className="pc-item pc-caption p-[12px_20px_2px]">
              <label className="text-xs">{menu.label}</label>
            </li>
            {menu.subMenu &&
              menu.subMenu.map((subMenu, subIndex) => (
                <MenuItem key={subMenu.label} menu={subMenu} isActive={subMenu.items?.some((item) => item.link === pathname) || pathname === subMenu.link} />
              ))}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

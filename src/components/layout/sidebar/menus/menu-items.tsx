import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { ChevronRightIcon } from "lucide-react";

import { SubMenuType } from "@/constant/menu";
import { cn } from "@/lib/utils";

type MenuItemProps = {
  menu: SubMenuType;
  isActive: boolean;
};

export const MenuItem: React.FC<MenuItemProps> = ({ menu, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const Tag = menu.link ? Link : "button";
  useEffect(() => {
    if (isActive) {
      setIsOpen(true);
    }
  }, [isActive]);
  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <li className={cn("overflow-hidden rounded-md text-[14px] text-[#39465f]", isActive && "bg-primary/10", !isActive && "hover:bg-btn-hover")}>
        <Tag
          href={menu?.link ?? "#"}
          className={cn("relative flex w-full items-center justify-start gap-4 p-[14px_20px] text-[14px] text-[#39465f]", isActive && "text-primary")}
          onClick={menu.items ? toggleSubMenu : undefined}
        >
          {menu?.icon && <menu.icon weight="duotone" size={22} />}
          <span className="inline">{menu.label}</span>
          {menu.items && menu.items.length > 0 && (
            <ChevronRightIcon
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                toggleSubMenu();
              }}
              className={`ml-auto h-6 w-6 rounded-full p-1 transition-transform ${isOpen ? "rotate-90" : ""}`}
            />
          )}
        </Tag>
      </li>
      {menu.items && (
        <ul
          className={`relative overflow-hidden transition-all duration-300 after:absolute after:left-[30px] after:top-0 after:h-full after:w-[1px] after:border-l after:border-l-card-border ${
            isOpen ? "h-auto" : "h-0"
          }`}
        >
          {menu.items.map((item, index) => {
            const activeSubmenu = item.link === pathname;
            return (
              <li key={index} className="group/sub-link text-[14px]">
                <Link
                  href={item.link ?? "#"}
                  className={cn(
                    "relative block w-full p-[12px_30px_12px_60px] after:absolute after:left-[45px] after:top-1/2 after:h-[5px] after:w-[5px] after:-translate-y-1/2 after:rounded-full after:bg-[#dbe0e5] after:group-hover/sub-link:bg-primary",
                    activeSubmenu && "text-primary",
                    activeSubmenu && "after:bg-primary"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

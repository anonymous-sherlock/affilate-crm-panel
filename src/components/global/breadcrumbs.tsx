"use client";
import React, { ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
type BreadCrumbProps = {
  separator?: ReactNode;
  classname?: string;
};
export const Breadcrumbs = ({ separator = "/", classname }: BreadCrumbProps) => {
  const path = usePathname();
  const pathname = path.substring(1);
  const pathNames = pathname.split("/").filter((path) => path);

  return (
    <div className={cn("mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", classname)}>
      <h2 className="text-title-md2 font-medium text-black text-opacity-70 dark:text-white capitalize md:block hidden">
        {pathname
          .trim()
          .split("/")
          .map((part, index, array) => (
            <React.Fragment key={index}>{index === 0 ? array[0] : null} </React.Fragment>
          ))}{" "}
        Overview
      </h2>
      <nav>
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link className="font-medium hover:text-primary" href="/">
              Home &nbsp;{separator}
            </Link>
          </li>
          {pathname
            .trim()
            .split("/")
            .map((part, index, array) => {
              let href = `${pathNames.slice(0, index + 1).join("/")}`;
              return (
                <li key={index} className="font-medium">
                  {pathname === href ? (
                    <span className="text-gray-400 capitalize">{part}</span>
                  ) : (
                    <Link className={cn("font-medium hover:text-primary capitalize")} href={`/${array.slice(0, index + 1).join("/")}`}>
                      {part} {index !== array.length - 1 && <span className="text-black">{separator}</span>}
                    </Link>
                  )}
                </li>
              );
            })}
        </ol>
      </nav>
    </div>
  );
};

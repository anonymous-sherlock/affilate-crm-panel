import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth, currentUser } from "@clerk/nextjs/server";

import { ScrollArea } from "@/components/ui/scroll-area";
import { getInitialFromName } from "@/lib/utils";
import logo from "@/public/logo.png";
import "@/styles/sidebar.module.css";

import { HelpSupportCard } from "../global/help-support-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MenuLists } from "./sidebar/menus/menu-lists";
import { SidebarOverlay } from "./sidebar/sidebar-overlay";
import { SidebarWrapper } from "./sidebar/sidebar-wrapper";
import { UserDropdownMenu } from "./sidebar/user-dropdown-menu";

type Props = {};

export const Sidebar = async (props: Props) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const user = await currentUser();

  return (
    <>
      <SidebarOverlay />
      <SidebarWrapper>
        <div className="m-header flex h-[74px] items-center px-6 py-4">
          <Link href="/" className="flex items-center justify-center gap-4 text-[18px] font-semibold">
            <Image src={logo} alt="Logo" className="w-10 rounded-md font-serif" />
            Adscrush
          </Link>
        </div>
        <ScrollArea className="relative h-[calc(100vh_-_149px)] w-full border-none px-2.5">
          <div className="h-full">
            <MenuLists />
          </div>
          <HelpSupportCard />
        </ScrollArea>
        <div className="h-[75px] border-t border-secondary">
          <div className="p-[15px]">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Avatar>
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback>{getInitialFromName(user?.fullName ?? "")}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-grow-1 me-2 ml-3">
                <h5 className="truncate text-[14px] font-semibold leading-none">{user?.fullName}</h5>
                <small className="text-[12px] capitalize leading-none">{user?.publicMetadata.role}</small>
              </div>
              <div className="ml-auto">
                <UserDropdownMenu />
              </div>
            </div>
          </div>
        </div>
      </SidebarWrapper>
    </>
  );
};

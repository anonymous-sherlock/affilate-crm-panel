"use client";
import { cn, getInitialFromName } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {};

export const ProfileMenuDropdown = (props: Props) => {
  const { isSignedIn, user, isLoaded } = useUser();
  return (
    <Popover>
      <PopoverTrigger className="hover:bg-btn-hover rounded-full size-10 flex items-center justify-center">
        <Avatar className="size-8">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>{getInitialFromName(user?.fullName ?? "")}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent side="top" align="end" className={cn("min-w-[352px] p-0","shadow-card-shadow")}>
        <div className="sticy top-0 border-b">
          <div className="p-4">Profile</div>
        </div>
        <ScrollArea className="h-[300px] relative">
          <div className="border-b">
            <div className="flex items-center p-4">
              <div className="flex-shrink-0">
                <Avatar>
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback>{getInitialFromName(user?.fullName ?? "")}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-grow-1 ml-3 me-2">
                <h5 className="text-[14px] font-semibold leading-none truncate">{user?.fullName}</h5>
                <small className="text-[12px] leading-none capitalize">{user?.primaryEmailAddress?.emailAddress}</small>
              </div>
              <div className="ml-auto bg-green-100 text-green-700 rounded-full text-xs px-2 py-1 capitalize">{user?.publicMetadata.role}</div>
            </div>
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

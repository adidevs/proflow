"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { EllipsisVertical } from "lucide-react";
import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

function UserSection() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "" as string | undefined,
    email: "" as string | undefined,
    image: "" as string | undefined | null,
  });
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status == "authenticated") {
      setUser({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      });
    }
  }, [status]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="p-2 flex w-64 items-center justify-between space-x-2">
          <div className="flex flex-row items-center gap-2 w-4/5">
            <Image
              width={40}
              height={40}
              src={user.image || "/user.svg"}
              alt="User"
              className="w-10 h-10 rounded-full bg-white"
            />
            <div>
              <h6 className="font-semibold text-wrap break-words">
                {user.name}
              </h6>
              <p className="text-xs break-words text-gray-600 text-wrap max-w-44">
                {user.email}
              </p>
            </div>
          </div>
          <EllipsisVertical height={20} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem
        onClick={() => {
          signOut({
            callbackUrl: "/",
          });
        }}>
          <button
            className="flex flex-row items-center gap-2"
            
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserSection;

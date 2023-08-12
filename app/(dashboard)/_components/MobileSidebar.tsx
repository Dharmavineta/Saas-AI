"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AiOutlineMenu } from "react-icons/ai";
import Sidebar from "./Sidebar";
import { useState, useEffect, FC } from "react";

type MobileSidebarProps = {
  apiLimitCount: number;
  isPro: boolean;
};

const MobileSidebar: FC<MobileSidebarProps> = ({ apiLimitCount, isPro }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <AiOutlineMenu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

"use client";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { MdOutlineDashboard } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { BiConversation } from "react-icons/bi";
import { BsCardImage, BsMusicNote, BsCodeSlash } from "react-icons/bs";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { FC } from "react";
import FreeCounter from "./FreeCounter";

const monsterrat = Montserrat({ weight: "600", subsets: ["latin"] });

type sidebarProps = {
  apiLimitCount: number;
  isPro: boolean;
};
const routes = [
  {
    label: "Dashboard",
    icon: MdOutlineDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: BiConversation,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: BsCardImage,
    href: "/image",
    color: "text-pink-500",
  },
  {
    label: "Video Generation",
    icon: AiOutlineVideoCamera,
    href: "/video",
    color: "text-orange-500",
  },
  {
    label: "Music Generation",
    icon: BsMusicNote,
    href: "/music",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: BsCodeSlash,
    href: "/code",
    color: "text-green-500",
  },
  {
    label: "Settings",
    icon: CiSettings,
    href: "/settings",
    color: "text-sky-500",
  },
];

const Sidebar: FC<sidebarProps> = ({ apiLimitCount = 0, isPro = false }) => {
  const pathName = usePathname();
  return (
    <div className="space-y-4 flex flex-col h-screen pt-4 bg-[#111827] text-white">
      <div className=" px-3 py-2 flex-1">
        <Link href={"/dashboard"} className="flex items-center pl-3 mb-14">
          <div className="relative">
            <h1
              className={cn(
                "text-xl hover:text-sky-200 transition-all duration-300",
                monsterrat.className
              )}
            >
              Simba
            </h1>
          </div>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              className={cn(
                "text-sm group flex p-4 w-full  font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathName === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-300"
              )}
              href={route.href}
              key={route.href}
            >
              <div className=" flex items-center flex-1">
                <route.icon className={cn(" h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
    </div>
  );
};

export default Sidebar;

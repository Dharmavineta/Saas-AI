"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BiMessageAltDetail } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsCardImage, BsMusicNote, BsCodeSlash } from "react-icons/bs";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { useRouter } from "next/navigation";

export const tools = [
  {
    lable: "Conversation",
    icon: BiMessageAltDetail,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    lable: "Music Generation",
    icon: BsMusicNote,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music",
  },
  {
    lable: "Image Generation",
    icon: BsCardImage,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    href: "/image",
  },
  {
    lable: "Music Generation",
    icon: AiOutlineVideoCamera,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/video",
  },
  {
    lable: "Music Generation",
    icon: BsCodeSlash,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/code",
  },
];

const Dashboard = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI in the market
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.lable}</div>
            </div>
            <AiOutlineArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { GoZap } from "react-icons/go";
import { AiOutlineCheck } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { BiMessageAltDetail } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsCardImage, BsMusicNote, BsCodeSlash } from "react-icons/bs";
import { AiOutlineVideoCamera } from "react-icons/ai";

const tools = [
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

const ProModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const onSubscribe = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something Went wrong");

      console.log("STRIPE_CLIENT_ERROR", error);
    } finally {
      setIsLoading(false);
    }
  };
  const proModal = useProModal();

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-normal items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-3 font-bold py-1">
              Upgrade to Panda-Pro
              <Badge variant={"premium"} className="uppercase text-sm py-1">
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900  font-medium">
            {tools.map((tool, i, arr) => (
              <Card
                key={tool.href}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">{tool.lable}</div>
                </div>
                <AiOutlineCheck className="text-primary h-5 w-5" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isLoading}
            onClick={onSubscribe}
            variant={"premium"}
            size={"lg"}
            className="w-full"
          >
            Upgrade <GoZap className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;

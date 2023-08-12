"use client";

import ProModal from "@/components/misc/ProModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MAX_FREE_COUNTS } from "@/constants";
import { useProModal } from "@/hooks/use-pro-modal";
import { FC, useEffect, useState } from "react";
import { FiZap } from "react-icons/fi";

type counterProps = {
  apiLimitCount: number;
  isPro: boolean;
};

const FreeCounter: FC<counterProps> = ({ apiLimitCount, isPro = false }) => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  if (isPro) {
    return null;
  }
  return (
    <div className="">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white space-y-2 mb-4">
            <p className="text-lg">
              {apiLimitCount}/{MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
              className="h-3"
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button
            onClick={proModal.opOpen}
            variant={"premium"}
            className="w-full"
          >
            <FiZap className="mr-3" /> Upgrade
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;

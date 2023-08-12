import { checkSubscription } from "@/lib/subscription";
import Heading from "../../_components/Heading";
import { AiOutlineSetting } from "react-icons/ai";
import SubscriptionButton from "@/components/misc/SubscriptionButton";

const Setting = async () => {
  const isPro = await checkSubscription();
  return (
    <div>
      <Heading
        title="Settings"
        description="Manage your account"
        Icon={AiOutlineSetting}
        iconColor="text-slate-900"
        bgColor="bg-rose-500/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className=" text-muted-foreground text-sm">
          {isPro
            ? "You are currently on a Pro Plan"
            : "You are currently on a free plan"}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default Setting;

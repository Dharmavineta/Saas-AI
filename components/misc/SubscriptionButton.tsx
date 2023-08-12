"use client";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { FiZap } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";

type subscriptionButtonProps = {
  isPro: boolean;
};

const SubscriptionButton: FC<subscriptionButtonProps> = ({ isPro }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log("BILLING_ERROR", error);
      toast.error("Something Went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button disabled={isLoading} onClick={handleClick}>
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <FiZap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};

export default SubscriptionButton;

"use client";

import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <nav className=" p-4 bg-transparent flex items-center justify-between text-white">
      <Link href="/" className="flex items-center">
        <h1>Simba</h1>
      </Link>
      <div className="flex items-center gap-x-2 ">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button className=" rounded-full text-black" variant={"outline"}>
            {" "}
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;

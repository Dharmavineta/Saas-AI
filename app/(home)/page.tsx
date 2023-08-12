import LandingContent from "@/components/misc/LandingContent";
import LandingHero from "@/components/misc/LandingHero";
import LandingNavbar from "@/components/misc/LandingNavbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
}

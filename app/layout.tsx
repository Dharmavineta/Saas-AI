import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/lib/modals-provider";
import { Toast } from "@/components/misc/toaster-provider";
import CrispProvider from "@/components/misc/crisp-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simba",
  description: "Smart AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body className={inter.className}>
          <ModalProvider />
          <Toast />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

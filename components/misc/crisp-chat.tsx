"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("d17e2132-0e0c-49cc-9624-03c87f957ca0");
  }, []);

  return null;
};

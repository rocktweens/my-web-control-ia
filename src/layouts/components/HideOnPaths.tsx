"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface HideOnPathsProps {
  children: React.ReactNode;
}

export default function HideOnPaths({ children }: HideOnPathsProps) {
  const pathname = usePathname();

  // Si alguna ruta del array coincide (o es prefijo), no renderiza nada
  const shouldHide = ["/chat","/chat"].some((p) => pathname.startsWith(p));
  if (shouldHide) return null;

  return <>{children}</>;
}

"use client";

import config from "@/config/config.json";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LogoFooter = ({ src }: { src?: string }) => {

  const {
    logo,
    logo_darkmode,
    logofooter_width,
    logofooter_height,
    logo_text,
    title,
  }: {
    logo: string;
    logo_darkmode: string;
    logofooter_width: any;
    logofooter_height: any;
    logo_text: string;
    title: string;
  } = config.site;

  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const resolvedLogo =
    mounted && (theme === "dark" || resolvedTheme === "dark")
      ? logo_darkmode
      : logo;
  const logoPath = src ? src : resolvedLogo;

  return (
    <Link href="/" className="navbar-brand inline-block">
      {logoPath ? (
        <Image
          width={logofooter_width.replace("px", "") * 2}
          height={logofooter_height.replace("px", "") * 2}
          src={logoPath}
          alt={title}
          priority
          style={{
            height: logofooter_height.replace("px", "") + "px",
            width: logofooter_width.replace("px", "") + "px",
          }}
        />
      ) : logo_text ? (
        logo_text
      ) : (
        title
      )}
    </Link>
  );
};

export default LogoFooter;

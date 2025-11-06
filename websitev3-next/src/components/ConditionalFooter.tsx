"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Hide footer on documentation pages to avoid layout interference
  if (pathname?.startsWith("/docs")) {
    return null;
  }

  return <Footer />;
}

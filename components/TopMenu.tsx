"use client";

import Image from "next/image";
import { Button } from "@/shadcn/ui/button";
import ThemeToggle from "./ThemeToggle";

export default function TopMenu() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex w-full items-center justify-between bg-transparent px-6 py-4">
      <Image src="/ldt.svg" alt="Line Drive Tax" width={153} height={48} priority />
      <div className="flex gap-4">
        <ThemeToggle />
        <Button
          onClick={() => scrollToSection("contact")}
          type="button"
          className="flex items-center border border-transparent transition-colors bg-secondary text-white hover:text-secondary rounded-md hover:bg-accent dark:hover:bg-secondary-300 sm:w-auto cursor-pointer"
          // className="px-4 py-2 bg-secondary dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/10 cursor-pointer"
        >
          Contact
        </Button>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/shadcn/ui/button";
import ThemeToggle from "./ThemeToggle";

export default function TopMenu() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 bg-transparent backdrop-blur-md">
      <span className="text-xl font-bold">🧮 YourSite</span>
      <div className="flex gap-4">
        <ThemeToggle/>
        <Button
          onClick={() => scrollToSection("contact")}
          className="rounded-full border px-4 py-2 hover:bg-black/10 dark:hover:bg-white/10"
        >
          Contact
        </Button>
      </div>
    </div>
  );
}

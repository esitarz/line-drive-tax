"use client";

import { Button } from "@/shadcn/ui/button";
import React from "react";

const sections = ["home", "services", "about", "contact"] as const;

interface SideNavProps {
  activeSection: "home" | "services" | "about" | "contact";
}

const SideNav: React.FC<SideNavProps> = ({ activeSection }) => {
  return (
    <div className="fixed right-4 sm:right-6 md:right-[26.5px] top-16 sm:top-20 md:top-24 h-screen z-50 flex items-start">
      <div className="fixed right-[1.25rem] sm:right-[1.5rem] md:right-[2rem] top-0 h-screen w-px bg-primary/40" />

      <div className="flex flex-col gap-6 relative z-10 ml-2 sm:ml-4 md:ml-6">
        {sections.map((id) => (
          <Button
            key={id}
            variant="ghost"
            className="flex items-center gap-2 w-full p-0 hover:bg-transparent justify-start cursor-pointer"
            onClick={() => {
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            aria-label={`Scroll to ${id}`}
          >
            <span
              className={`text-xs sm:text-base capitalize transition-opacity duration-300 text-right min-w-[60px] sm:min-w-[80px] ${
                activeSection === id
                  ? "opacity-100 text-primary"
                  : "opacity-50 text-primary"
              }`}
            >
              {id}
            </span>
            <span
              className={`block w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === id
                  ? "bg-primary"
                  : "bg-primary-200 dark:bg-primary-600"
              }`}
            />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SideNav;

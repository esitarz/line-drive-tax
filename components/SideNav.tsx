"use client";

import { Button } from "@/shadcn/ui/button";

const sections = ["home", "services", "about", "contact"] as const;

interface SideNavProps {
  activeSection: "home" | "services" | "about" | "contact";
}

const sectionColors = {
  home: "bg-blue-500",
  services: "bg-green-500",
  about: "bg-orange-500",
  contact: "bg-purple-500",
};

const SideNav: React.FC<SideNavProps> = ({ activeSection }) => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center">
      <div className="absolute top-0 bottom-0 w-px bg-muted opacity-40" />
      <div className="flex flex-col gap-6 relative z-10">
        {sections.map((id) => (
          <Button
            key={id}
            variant="ghost"
            size="icon"
            className="w-4 h-4 p-0 hover:bg-transparent"
            onClick={() => {
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            <span
              className={`block w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeSection === id
                  ? sectionColors[id]
                  : "bg-gray-400 dark:bg-gray-600"
              }`}
            />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SideNav;

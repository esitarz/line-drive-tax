"use client";

import { useState, useCallback } from "react";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { HomeSection } from "@/components/HomeSection";
import { ServicesSection } from "@/components/ServicesSection";
import SideNav from "@/components/SideNav";
import TopMenu from "@/components/TopMenu";
import { aboutContent } from "@/content/aboutContent";
import { contactContent } from "@/content/contactContent";
import { homeContent } from "@/content/homeContent";
import { servicesContent } from "@/content/servicesContent";

export default function Page() {
  const [activeSection, setActiveSection] = useState<
    "home" | "services" | "about" | "contact"
  >("home");

  const makeVisibleHandler = useCallback(
    (section: typeof activeSection) => () => setActiveSection(section),
    []
  );

  return (
    <div className="relative">
      <TopMenu />
      <main className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
        <section id="home" className="snap-start h-screen">
          <HomeSection
            frontmatter={homeContent}
            {...homeContent}
            onVisible={makeVisibleHandler("home")}
          />
        </section>
        <section id="services" className="snap-start h-screen">
          <ServicesSection
            {...servicesContent}
            onVisible={makeVisibleHandler("services")}
          />
        </section>
        <section id="about" className="snap-start h-screen">
          <AboutSection
            {...aboutContent}
            onVisible={makeVisibleHandler("about")}
          />
        </section>
        <section id="contact" className="snap-start h-screen">
          <ContactSection
            {...contactContent}
            onVisible={makeVisibleHandler("contact")}
          />
        </section>
      </main>
      <SideNav activeSection={activeSection} />
    </div>
  );
}

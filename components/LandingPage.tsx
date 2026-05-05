"use client";

import { useState } from "react";
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

type SectionId = "home" | "services" | "about" | "contact";

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const makeVisibleHandler = (section: SectionId) => () => {
    setActiveSection(section);
  };

  return (
    <div className="relative">
      <TopMenu />
      <main className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
        <section id="home" className="h-fit min-h-screen snap-start">
          <HomeSection
            frontmatter={homeContent}
            onVisible={makeVisibleHandler("home")}
          />
        </section>
        <section id="services" className="h-fit min-h-screen snap-start">
          <ServicesSection
            {...servicesContent}
            onVisible={makeVisibleHandler("services")}
          />
        </section>
        <section id="about" className="h-fit min-h-screen snap-start">
          <AboutSection
            {...aboutContent}
            onVisible={makeVisibleHandler("about")}
          />
        </section>
        <section id="contact" className="h-fit min-h-screen snap-start">
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
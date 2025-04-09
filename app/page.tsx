import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { HomeSection } from "@/components/HomeSection";
import { ServicesSection } from "@/components/ServicesSection";
import ThemeToggle from "@/components/ThemeToggle";
import { aboutContent } from "@/content/aboutContent";
import { contactContent } from "@/content/contactContent";
import { homeContent } from "@/content/homeContent";
import { servicesContent } from "@/content/servicesContent";

export default function Page() {
  return (
    <main>
      <ThemeToggle/>
      <HomeSection {...homeContent} />
      <ServicesSection {...servicesContent} />
      <AboutSection {...aboutContent} />
      <ContactSection {...contactContent} />
    </main>
  );
}

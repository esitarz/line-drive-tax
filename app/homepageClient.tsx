"use client";

import {
  AboutSection,
  AboutSectionFrontmatter,
} from "@/components/AboutSection";
import {
  ContactSection,
  ContactSectionFrontmatter,
} from "@/components/ContactSection";
import { HomeSection, HomeSectionFrontmatter } from "@/components/HomeSection";
import {
  ServicesSection,
  ServicesSectionFrontmatter,
} from "@/components/ServicesSection";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface SerializedContent<T> {
  frontmatter: T;
  content: string;
  mdxSource: MDXRemoteSerializeResult;
  slug?: string;
}

export type ScrollToSection = (id: string) => void;

export default function HomePageClient({
  home,
  services,
  about,
  contact,
}: {
  home: SerializedContent<HomeSectionFrontmatter> | null;
  services: SerializedContent<ServicesSectionFrontmatter> | null;
  about: SerializedContent<AboutSectionFrontmatter> | null;
  contact: SerializedContent<ContactSectionFrontmatter> | null;
}) {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.6,
      }
    );

    const sections = ["home", "services", "about", "contact"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      const sections = ["home", "services", "about", "contact"];
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const scrollToSection: ScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={containerRef}>
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center">
        <div className="h-64 w-px bg-gray-300 relative">
          {["home", "services", "about", "contact"].map((id, index) => (
            <div
              key={id}
              className="absolute transform -translate-x-1/2"
              style={{ top: `${(index / 3) * 100}%` }}
            >
              <button
                onClick={() => scrollToSection(id)}
                className="relative group flex items-center"
                aria-label={`Maps to ${
                  id.charAt(0).toUpperCase() + id.slice(1)
                }`}
              >
                <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm">
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </span>
                <motion.div
                  className={`w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center ${
                    activeSection === id ? "border-primary" : ""
                  }`}
                >
                  <motion.div
                    className={`w-2 h-2 rounded-full ${
                      activeSection === id ? "bg-primary" : "bg-gray-400"
                    }`}
                    animate={{ scale: activeSection === id ? 1 : 0.5 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </button>
            </div>
          ))}
          <motion.div
            className="absolute left-0 w-px bg-primary"
            style={{
              top: `${
                (["home", "services", "about", "contact"].findIndex(
                  (s) => s === activeSection
                ) /
                  3) *
                100
              }%`,
              height: `${100 / 4}%`,
            }}
            animate={{
              top: `${
                (["home", "services", "about", "contact"].findIndex(
                  (s) => s === activeSection
                ) /
                  3) *
                100
              }%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {home && (
        <HomeSection
          frontmatter={home.frontmatter}
          MDXContent={({ components }) => (
            <MDXRemote {...home.mdxSource} components={components} />
          )}
        />
      )}
      {services && <ServicesSection services={services} />}
      {about && <AboutSection about={about} />}
      {contact && <ContactSection contact={contact} />}
    </div>
  );
}

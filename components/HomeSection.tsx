"use client";

import abb from "@/lib/animatedBlob";
import { useSectionInView } from "@/lib/useSectionInView";
import { motion } from "framer-motion";
import { useEffect } from "react";

export interface HomeSectionFrontmatter {
  title: string;
  tagline: string;
  description: string;
  buttonText: string;
  secondaryButtonText?: string;
}

interface HomeSectionProps {
  frontmatter: HomeSectionFrontmatter;
  onVisible?: () => void;
}

export const HomeSection = ({ frontmatter, onVisible }: HomeSectionProps) => {
  const sectionRef = useSectionInView(onVisible);

  useEffect(() => {
    const getCSSVar = (name: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    const isDark = document.documentElement.classList.contains("dark");

    const colors = isDark
      ? [
          getCSSVar("--primary-900"),
          getCSSVar("--gray-900"),
          getCSSVar("--accent"),
          getCSSVar("--accent"),
          getCSSVar("--gray-900"),
        ]
      : [
          getCSSVar("--primary"),
          getCSSVar("--gray-50"),
          getCSSVar("--accent"),
          getCSSVar("--primary-400"),
          getCSSVar("--gray-100"),
        ];

    abb({
      element: "#home-background-blobs",
      background: getCSSVar("--background"), // optional: dynamic bg too
      colors,
      speed: 0.75,
      opacity: 0.2,
      blur: 3,
      grain: {
        strength: 1.5,
        opacity: 0.15,
        blur: 3,
      },
    });
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen snap-start flex-col items-center justify-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="flex max-w-6xl flex-col items-center gap-[32px] sm:items-start"
      >
        <h1 className="text-7xl font-semibold">{frontmatter.title}</h1>
        <h2 className="tagline-gradient max-w-2xl text-center text-4xl font-thin sm:text-left">
          {frontmatter.tagline}
        </h2>
        <p className="max-w-xl text-center sm:text-left">
          {frontmatter.description}
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            className="text-primary border-primary-500 hover:bg-primary dark:hover:bg-secondary-300 flex h-10 items-center rounded-sm border-1 px-4 text-lg font-medium transition-colors hover:text-white sm:h-12 sm:w-auto sm:px-8 dark:hover:text-white"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            {frontmatter.buttonText}
          </a>
          {frontmatter.secondaryButtonText && (
            <a
              className="flex h-10 w-full items-center border border-black/[.08] px-4 text-sm font-medium transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("services")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              {frontmatter.secondaryButtonText}
            </a>
          )}
        </div>
      </motion.div>

      <div
        id="home-background-blobs"
        className="absolute inset-0 -z-10 opacity-70 before:absolute before:inset-0 before:content-[''] after:absolute after:inset-0 after:content-['']"
      />
    </section>
  );
};

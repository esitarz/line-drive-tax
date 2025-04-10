"use client";

import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/useSectionInView";

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

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen h-[100vh] snap-start flex flex-col items-center justify-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="flex flex-col gap-[32px] items-center sm:items-start max-w-6xl"
      >
        <h1 className="text-5xl font-bold">{frontmatter.title}</h1>
        <h2 className="text-4xl font-thin text-center sm:text-left max-w-xl tagline-gradient">
          {frontmatter.tagline}
        </h2>
        <p className="text-center sm:text-left max-w-xl">
          {frontmatter.description}
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="flex items-center border border-transparent transition-colors bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
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
              className="flex items-center border border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
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
    </section>
  );
};

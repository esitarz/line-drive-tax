"use client";


import { MDXProvider } from "@mdx-js/react";
import { motion } from "framer-motion";
import { components } from "./MDXComponents";

export interface HomeSectionFrontmatter {
  title: string;
  description: string;
  buttonText: string;
  secondaryButtonText?: string;
}

interface HomeSectionProps {
  frontmatter: HomeSectionFrontmatter;
  children: React.ReactNode;
}

export const HomeSection = ({ frontmatter, children }: HomeSectionProps) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="flex flex-col gap-[32px] items-center sm:items-start max-w-4xl"
      >
        <h1 className="text-5xl font-bold">{frontmatter.title}</h1>
        <p className="text-xl text-center sm:text-left max-w-xl">
          {frontmatter.description}
        </p>
        <div className="prose dark:prose-invert max-w-none">
          <MDXProvider components={components}>{children}</MDXProvider>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
          >
            {frontmatter.buttonText}
          </a>
          {frontmatter.secondaryButtonText && (
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("services");
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

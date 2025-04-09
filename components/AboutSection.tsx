"use client";

import { motion } from "framer-motion";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { components } from "./MDXComponents";

export interface AboutSectionFrontmatter {
  title: string;
  experienceTitle: string;
  [key: string]:
    | string
    | number
    | boolean
    | string[]
    | number[]
    | boolean[]
    | object
    | null
    | undefined; // Add this line
}

export interface AboutSectionProps {
  about: {
    frontmatter: AboutSectionFrontmatter;
    mdxSource: MDXRemoteSerializeResult;
  };
}

export const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="max-w-4xl"
      >
        <h2 className="text-4xl font-bold mb-8 text-center">
          {about.frontmatter.title}
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4">
              {about.frontmatter.experienceTitle}
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              <MDXRemote {...about.mdxSource} components={components} />
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-64 h-64 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xl">Logo</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

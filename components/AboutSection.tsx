"use client";

import { motion } from "framer-motion";

export interface AboutSectionProps {
  title: string;
  heading1: string;
  paragraph1: string;
  heading2: string;
  paragraph2: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  title,
  heading1,
  paragraph1,
  heading2,
  paragraph2,
}) => {
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
        <h2 className="text-4xl font-bold mb-8 text-center">{title}</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4">{heading1}</h3>
            <div className="prose dark:prose-invert max-w-none">
              {paragraph1}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-4">{heading2}</h3>
              <div className="prose dark:prose-invert max-w-none">
                {paragraph2}
              </div>
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

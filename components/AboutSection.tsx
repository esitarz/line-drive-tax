"use client";

import { useSectionInView } from "@/lib/useSectionInView";
import { motion } from "framer-motion";

export interface AboutSectionProps {
  title: string;
  heading1: string;
  paragraph1: string;
  heading2: string;
  paragraph2: string;
  onVisible?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  title,
  heading1,
  paragraph1,
  heading2,
  paragraph2,
  onVisible,
}) => {
  const ref = useSectionInView(onVisible);
  return (
    <section
      ref={ref}
      id="about"
      className="flex flex-col items-center justify-center p-8 min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="max-w-4xl mt-25 sm:mt-0"
      >
        {title !== "" ? null : (
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
        )}
        <div className="flex flex-col md:flex-row gap-8 items-center justify-start">
          <div className="flex flex-col gap-8 max-w-2xl flex-1">
            <div>
              <h3 className="text-3xl font-semibold mb-4">{heading1}</h3>
              <p className="prose dark:prose-invert max-w-none">{paragraph1}</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">{heading2}</h3>
              <p className="prose dark:prose-invert max-w-none">{paragraph2}</p>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            {/* <div className="w-64 h-64 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center"> */}
            <img src="/kdahl@2x.png" alt={"alt"} />
            {/* </div> */}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

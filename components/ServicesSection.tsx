"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { components } from "./MDXComponents";

export interface ServicesSectionFrontmatter {
  title: string;
  description: string;
  services: {
    service: string; // You've correctly changed this to 'service'
    description: string;
  }[];
}

interface ServicesSectionProps {
  frontmatter: ServicesSectionFrontmatter;
  mdxSource: MDXRemoteSerializeResult;
}

export const ServicesSection = ({
  frontmatter,
  mdxSource,
}: ServicesSectionProps) => {
  return (
    <section id="services" className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">{frontmatter.title}</h2>
        <p className="text-lg text-gray-700 mb-8">{frontmatter.description}</p>
        <MDXRemote {...mdxSource} components={components} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {frontmatter.services &&
            frontmatter.services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-md shadow-md text-left"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {service.service}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

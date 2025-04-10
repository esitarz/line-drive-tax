"use client";

import { useSectionInView } from "@/lib/useSectionInView";

export interface Service {
  title: string;
  description: string;
}

interface ServicesSectionProps {
  title: string;
  description: string;
  paragraph1: string;
  paragraph2: string;
  services: Service[];
  onVisible?: () => void;
}

export const ServicesSection = ({
  title,
  description,
  paragraph1,
  paragraph2,
  services,
  onVisible,
}: ServicesSectionProps) => {
  const ref = useSectionInView(onVisible);

  return (
    <section
      ref={ref}
      id="services"
      className="flex flex-col items-center justify-center py-20 h-[100vh]"
    >
      <div className="container mx-auto">
        <h2 className="text-5xl font-thin mb-4">{title}</h2>
        <p className="text-xl text-muted-foreground mb-4">{description}</p>
        <p className="text-md mb-2">{paragraph1}</p>
        <p className="text-md mb-8">{paragraph2}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-card text-card-foreground p-6 rounded-md shadow-md"
            >
              <h3 className="text-gray text-xl font-semibold mb-2">{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

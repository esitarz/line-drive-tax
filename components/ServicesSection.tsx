"use client";

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
}

export const ServicesSection = ({
  title,
  description,
  paragraph1,
  paragraph2,
  services,
}: ServicesSectionProps) => {
  return (
    <section id="services" className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-gray-700 mb-4">{description}</p>
        <p className="text-md text-gray-600 mb-2">{paragraph1}</p>
        <p className="text-md text-gray-600 mb-8">{paragraph2}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-md shadow-md text-left"
            >
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

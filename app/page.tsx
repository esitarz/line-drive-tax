import { Content, getContentBySlug } from "@/lib/mdx";
import { serialize } from "next-mdx-remote/serialize";
import HomePageClient from "./homepageClient";
import {
  HomeSectionFrontmatter,
  ServicesSectionFrontmatter,
  AboutSectionFrontmatter,
  ContactSectionFrontmatter,
} from "@/components/index"; // Assuming your section components and frontmatter types are exported here
import { MDXRemoteSerializeResult } from "next-mdx-remote";

interface SerializedContent<T> {
  frontmatter: T;
  content: string;
  mdxSource: MDXRemoteSerializeResult;
  slug?: string;
}

export default async function Home() {
  async function serializeContent<T>(
    content: Content | null
  ): Promise<SerializedContent<T> | null> {
    if (content?.content) {
      const mdxSource = await serialize(content.content);
      return {
        ...content,
        mdxSource,
        frontmatter: content.frontmatter as T,
      };
    }
    return null;
  }

  const homeContent = await getContentBySlug("home");
  const servicesContent = await getContentBySlug("services");
  const aboutContent = await getContentBySlug("about");
  const contactContent = await getContentBySlug("contact");

  const home = await serializeContent<HomeSectionFrontmatter>(homeContent);
  const services = await serializeContent<ServicesSectionFrontmatter>(
    servicesContent
  );
  const about = await serializeContent<AboutSectionFrontmatter>(aboutContent);
  const contact = await serializeContent<ContactSectionFrontmatter>(
    contactContent
  );

  if (!home || !services || !about || !contact) {
    return <div>Error: Could not load content.</div>;
  }

  return (
    <div className="relative min-h-screen">
      <HomePageClient
        home={home}
        services={services}
        about={about}
        contact={contact}
      />
      <footer className="py-8 px-4 border-t">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
            © {new Date().getFullYear()} Line Drive Tax. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

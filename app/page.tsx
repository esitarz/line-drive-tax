// app/page.tsx
import { HomeSection } from "@/components/HomeSection";
import { homeFrontmatter } from "@/content/homeContent";

export default function Page() {
  return (
    <main>
      <HomeSection frontmatter={homeFrontmatter}>
        <p>
          Full service tax for professional athletes and business professionals
        </p>
      </HomeSection>
    </main>
  );
}

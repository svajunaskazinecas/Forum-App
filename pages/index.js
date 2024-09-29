import WelcomeSection from "@/components/atoms/welcomeSection/welcomeSection";
import TagsWrapper from "@/components/organisms/tagsWrapper/tagsWrapper";
import PageTemplate from "@/components/templates/template/template";

export default function Home() {
  return (
    <>
      <PageTemplate>
        <WelcomeSection />
        <TagsWrapper />
      </PageTemplate>
    </>
  );
}

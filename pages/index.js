import Header from "@/components/organisms/Header/Header.jsx";
import WelcomeSection from "@/components/atoms/welcomeSection/welcomeSection";
import TagsWrapper from "@/components/organisms/tagsWrapper/tagsWrapper";

export default function Home() {
  return (
    <>
      <Header />
      <WelcomeSection />
      <TagsWrapper />
    </>
  );
}

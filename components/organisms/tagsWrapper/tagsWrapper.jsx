import styles from "./styles.module.css";
import TagsHeader from "@/components/atoms/tagsHeader/tagsHeader";
import Tags from "@/components/molecules/tags/tags";
import TagsCount from "@/components/atoms/tagsCount/tagsCount";
import { useRouter } from "next/router";

const TagsWrapper = () => {
  const router = useRouter();

  const handleTagClick = (tag) => {
    const encodedTag = encodeURIComponent(tag);
    router.push(`/questions?tag=${encodedTag}`);
  };

  return (
    <div className={styles.main}>
      <TagsHeader />
      <Tags
        title="Technology & Innovation"
        description="Discuss the latest advancements in tech, including AI, blockchain, software development, and gadgets. Share insights on emerging trends and innovations shaping the future."
        onClick={() => handleTagClick("Technology & Innovation")}
      />
      <TagsCount count="1" />
      <Tags
        title="Health & Wellness"
        description="A place to talk about physical and mental well-being. Topics include fitness, nutrition, mental health, and tips for living a balanced, healthy lifestyle."
        onClick={() => handleTagClick("Health & Wellness")}
      />
      <TagsCount count="1" />
      <Tags
        title="Personal Finance & Investing"
        description="Share advice on managing money, budgeting, and investing. Topics include stock market trends, cryptocurrency, real estate, and strategies for long-term financial success."
        onClick={() => handleTagClick("Personal Finance & Investing")}
      />
      <TagsCount count="1" />
      <Tags
        title="Travel & Adventure"
        description="Exchange travel stories, tips, and recommendations for must-see destinations. Get advice on budget travel, luxury experiences, or outdoor adventures."
        onClick={() => handleTagClick("Travel & Adventure")}
      />
      <TagsCount count="1" />
      <Tags
        title="Pop Culture & Entertainment"
        description="Dive into conversations about movies, TV shows, books, music, and gaming. Discuss the latest releases, fandoms, and the cultural impact of entertainment media."
        onClick={() => handleTagClick("Pop Culture & Entertainment")}
      />
      <TagsCount count="1" />
    </div>
  );
};

export default TagsWrapper;

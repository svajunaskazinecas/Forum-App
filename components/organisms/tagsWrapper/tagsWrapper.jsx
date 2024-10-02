import styles from "./styles.module.css";
import TagsHeader from "@/components/atoms/tagsHeader/tagsHeader";
import Tags from "@/components/molecules/tags/tags";
import TagsCount from "@/components/atoms/tagsCount/tagsCount";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const TagsWrapper = () => {
  const router = useRouter();
  const [tagCounts, setTagCounts] = useState({});

  useEffect(() => {
    const fetchTagCounts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/tags/count`
        );
        const counts = response.data.reduce((acc, tag) => {
          acc[tag._id] = tag.count;
          return acc;
        }, {});
        setTagCounts(counts);
      } catch (err) {
        console.log("Error fetching tag counts:", err);
      }
    };

    fetchTagCounts();
  }, []);

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
      <TagsCount count={tagCounts["Technology & Innovation"] || 0} />
      <Tags
        title="Health & Wellness"
        description="A place to talk about physical and mental well-being. Topics include fitness, nutrition, mental health, and tips for living a balanced, healthy lifestyle."
        onClick={() => handleTagClick("Health & Wellness")}
      />
      <TagsCount count={tagCounts["Health & Wellness"] || 0} />
      <Tags
        title="Personal Finance & Investing"
        description="Share advice on managing money, budgeting, and investing. Topics include stock market trends, cryptocurrency, real estate, and strategies for long-term financial success."
        onClick={() => handleTagClick("Personal Finance & Investing")}
      />
      <TagsCount count={tagCounts["Personal Finance & Investing"] || 0} />
      <Tags
        title="Travel & Adventure"
        description="Exchange travel stories, tips, and recommendations for must-see destinations. Get advice on budget travel, luxury experiences, or outdoor adventures."
        onClick={() => handleTagClick("Travel & Adventure")}
      />
      <TagsCount count={tagCounts["Travel & Adventure"] || 0} />
      <Tags
        title="Pop Culture & Entertainment"
        description="Dive into conversations about movies, TV shows, books, music, and gaming. Discuss the latest releases, fandoms, and the cultural impact of entertainment media."
        onClick={() => handleTagClick("Pop Culture & Entertainment")}
      />
      <TagsCount count={tagCounts["Pop Culture & Entertainment"] || 0} />
    </div>
  );
};

export default TagsWrapper;

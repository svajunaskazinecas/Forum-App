import PageTemplate from "@/components/templates/template/template";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const QuestionDetailsPage = () => {
  const router = useRouter();
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { uuid } = router.query;

    console.log("Router Query:", router.query);

    if (uuid) {
      const fetchQuestion = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/questions/${uuid}`
          );
          console.log("API Response:", response.data);

          if (response.data) {
            setQuestion(response.data);
          } else {
            setError("No question found.");
          }
        } catch (err) {
          console.error("Error fetching question:", err);
          setError("Error loading question details.");
        } finally {
          setLoading(false);
        }
      };

      fetchQuestion();
    }
  }, [router.query.uuid]);

  if (loading) {
    return <p>Loading question details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!question) {
    return <p>No question details found.</p>;
  }

  return (
    <PageTemplate>
      <div className={styles.main}>
        <h1>{question.question_title}</h1>
        <p>{question.question_text}</p>
        <p>
          <strong>Tags:</strong> {question.tags.join(", ")}
        </p>
        <p>
          <strong>Posted on:</strong>{" "}
          {new Date(question.date).toLocaleDateString()}
        </p>
      </div>
    </PageTemplate>
  );
};

export default QuestionDetailsPage;

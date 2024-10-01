import PageTemplate from "@/components/templates/template/template";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import AnswerForm from "@/components/molecules/AnswerForm/AnswerForm";

const QuestionDetailsPage = () => {
  const router = useRouter();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const { uuid } = router.query;

    if (uuid) {
      const fetchQuestion = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/questions/${uuid}`
          );

          if (response.data) {
            setQuestion(response.data);
          } else {
            console.log("No question found.");
          }
        } catch (err) {
          console.log("Error fetching question:", err);
        }
      };

      fetchQuestion();
    }
  }, [router.query.uuid]);

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
      <AnswerForm />
    </PageTemplate>
  );
};

export default QuestionDetailsPage;

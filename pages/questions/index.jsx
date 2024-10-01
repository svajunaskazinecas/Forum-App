import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import PageTemplate from "@/components/templates/template/template";
import Button from "@/components/atoms/button/button";
import DeleteQuestionButton from "@/components/deleteQuestionButton/deleteQuestionButton";

const QuestionsPage = () => {
  const router = useRouter();
  const { tag } = router.query;
  const [questions, setQuestions] = useState([]);

  const handleViewMore = (question) => {
    if (question.uuid) {
      router.push(`/question/${question.uuid}`);
    } else {
      console.error("UUID is missing from the question object");
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      if (tag) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/questions`,
            {
              params: { tag },
            }
          );

          if (response.data.questions) {
            setQuestions(response.data.questions);
          } else {
            setQuestions([]);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchQuestions();
  }, [tag]);

  return (
    <PageTemplate>
      <div className={styles.main}>
        <h1>Topics about {tag}</h1>

        {questions.length > 0 ? (
          questions.map((question) => (
            <div key={question.uuid} className={styles.questionCard}>
              <div className={styles.leftHandSection}>
                <h2>{question.question_title}</h2>
                <p>{question.question_text}</p>
              </div>
              <Button
                title="View More"
                onClick={() => handleViewMore(question)}
              ></Button>
              <DeleteQuestionButton
                questionId={question.uuid}
                questionUserId={question.user_id}
              />
            </div>
          ))
        ) : (
          <p>No topics found for this tag.</p>
        )}
      </div>
    </PageTemplate>
  );
};

export default QuestionsPage;

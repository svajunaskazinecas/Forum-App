import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import Button from "@/components/atoms/button/button";
import VoteButton from "@/components/atoms/voteButton/voteButton";
import DeleteAnswerButton from "@/components/atoms/deleteAnswerButton/deleteAnswerButton";

const AnswerForm = () => {
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const jwt = cookie.get("jwt");

  useEffect(() => {
    const { uuid } = router.query;

    if (uuid) {
      const fetchAnswers = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/question/${uuid}/answers`
          );

          if (response.data && response.data.answers) {
            setAnswers(response.data.answers);
          } else {
            setAnswers([]);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchAnswers();
    }
  }, [router.query.uuid]);

  const handleSubmitAnswer = async () => {
    if (!newAnswer) {
      setError("Answer cannot be empty");
      return;
    }
    if (!jwt) {
      setError("Please login first");
      return;
    }

    try {
      const headers = {
        authorization: jwt,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/question/${router.query.uuid}/answers`,
        { answer_text: newAnswer },
        { headers }
      );

      if (response.status === 201) {
        setAnswers([...answers, response.data.answer]);
        setError("");
      }
    } catch (err) {
      console.log("Error submitting answer:", err);
    }
  };

  return (
    <div className={styles.main}>
      <h2>Answers:</h2>
      {answers.length > 0 ? (
        answers.map((answer) => (
          <div key={answer.uuid} className={styles.answerCard}>
            <p>{answer.answer_text}</p>
            <h6>Posted on: {new Date(answer.date).toLocaleDateString()}</h6>
            <VoteButton
              uuid={answer.uuid}
              currentLikes={answer.gained_likes_number}
            />
            <DeleteAnswerButton
              answerId={answer.uuid}
              answerUserId={answer.user_id}
            />
          </div>
        ))
      ) : (
        <p>No answers yet. Be the first to answer!</p>
      )}

      <div className={styles.answerForm}>
        <h3>Your Answer</h3>
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Type your answer here..."
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button
          title="Submit Answer"
          onClick={() => {
            handleSubmitAnswer();
            setNewAnswer("");
          }}
        />
      </div>
    </div>
  );
};

export default AnswerForm;

import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

const DeleteQuestionButton = ({ questionId, questionUserId }) => {
  const [userUuid, setUserUuid] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userCookieUuid = cookie.get("userId");
    setUserUuid(userCookieUuid);
  }, []);

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (!isConfirmed) return;

    try {
      const jwt = cookie.get("jwt");
      const headers = { authorization: jwt };

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/question/${questionId}`,
        { headers }
      );

      if (response.status === 200) {
        alert("Question deleted successfully!");
        router.reload();
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <>
      {userUuid === questionUserId && (
        <button className={styles.main} onClick={handleDelete}>
          Delete Question
        </button>
      )}
    </>
  );
};

export default DeleteQuestionButton;

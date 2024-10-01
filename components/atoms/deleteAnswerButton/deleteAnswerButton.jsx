import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

const DeleteAnswerButton = ({ answerId, answerUserId }) => {
  const [userUuid, setUserUuid] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userCookieUuid = cookie.get("userId");
    setUserUuid(userCookieUuid);
  }, []);

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this answer?"
    );

    if (!isConfirmed) return;

    try {
      const jwt = cookie.get("jwt");
      const headers = { authorization: jwt };

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/answer/${answerId}`,
        { headers }
      );

      if (response.status === 200) {
        alert("Answer deleted successfully!");
        router.reload();
      }
    } catch (error) {
      console.error("Error deleting answer:", error);
    }
  };

  return (
    <>
      {userUuid === answerUserId && (
        <button className={styles.main} onClick={handleDelete}>
          Delete Answer
        </button>
      )}
    </>
  );
};

export default DeleteAnswerButton;

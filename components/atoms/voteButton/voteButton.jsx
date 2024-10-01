import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import styles from "./styles.module.css";

const VoteButton = ({ uuid, currentLikes }) => {
  const [likes, setLikes] = useState(currentLikes);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteType, setVoteType] = useState(null);
  const jwt = cookie.get("jwt");

  useEffect(() => {
    const votedAnswers = JSON.parse(localStorage.getItem("votedAnswers")) || {};
    if (votedAnswers[uuid]) {
      setHasVoted(true);
      setVoteType(votedAnswers[uuid]);
    }
  }, [uuid]);

  const handleVote = async (type) => {
    if (!jwt) {
      alert("Please log in to vote.");
      return;
    }

    if (hasVoted && voteType === type) {
      alert(`You have already ${type}d this answer.`);
      return;
    }

    try {
      const headers = { authorization: jwt };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/answers/${uuid}/vote`,
        { voteType: type },
        { headers }
      );

      if (response.status === 200) {
        setLikes(response.data.answer.gained_likes_number);

        const votedAnswers =
          JSON.parse(localStorage.getItem("votedAnswers")) || {};
        votedAnswers[uuid] = type;
        localStorage.setItem("votedAnswers", JSON.stringify(votedAnswers));

        setHasVoted(true);
        setVoteType(type);
      }
    } catch (err) {
      console.error("Error voting answer:", err);
    }
  };

  return (
    <div className={styles.main}>
      <span>Likes: {likes}</span>
      <div className={styles.wrapper}>
        <button
          className={styles.up}
          onClick={() => handleVote("upvote")}
          disabled={hasVoted && voteType === "upvote"}
        >
          Upvote
        </button>
        <button
          className={styles.down}
          onClick={() => handleVote("downvote")}
          disabled={hasVoted && voteType === "downvote"}
        >
          Downvote
        </button>
      </div>
    </div>
  );
};

export default VoteButton;

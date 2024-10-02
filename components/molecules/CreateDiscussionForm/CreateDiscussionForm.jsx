import Button from "@/components/atoms/button/button";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import { useState } from "react";

const CreateDiscussionForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const options = [
    "Technology & Innovation",
    "Health & Wellness",
    "Personal Finance & Investing",
    "Travel & Adventure",
    "Pop Culture & Entertainment",
  ];
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };
  const router = useRouter();
  const jwt = cookie.get("jwt");

  const addDiscussion = async () => {
    if (
      selectedOptions.length === 0 ||
      title.length === 0 ||
      text.length === 0
    ) {
      setError(
        "Please select at least one topic, title and description cannot be empty."
      );
      return;
    }

    try {
      const body = {
        question_title: title,
        question_text: text,
        tags: selectedOptions,
      };

      const headers = {
        authorization: jwt,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/question`,
        body,
        {
          headers,
        }
      );

      if (response.status === 201) {
        setSuccess("Discussion posted, redireccting to main page..");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.main}>
      <h2>Share your thoughts</h2>
      <input
        value={title}
        placeholder="Title"
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        style={{ marginTop: "0.5rem" }}
        value={text}
        placeholder="Description"
        type="text"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <h3>Choose topic:</h3>
      {options.map((option, index) => (
        <div className={styles.checkboxWrapper} key={index}>
          <input
            type="checkbox"
            value={option}
            onChange={handleCheckboxChange}
            checked={selectedOptions.includes(option)}
          />
          <label>{option}</label>
        </div>
      ))}
      {success && <p className={styles.success}>{success}</p>}
      {error && <p className={styles.error}>{error}</p>}
      <Button title="Start Discussion" onClick={addDiscussion} />
    </div>
  );
};

export default CreateDiscussionForm;

import { useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import Button from "@/components/atoms/button/button";
import { register } from "@/apiCalls/user";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await register({ email, password, name });

      if (response.status === 201) {
        setSuccess("Registration successful! Redirecting to login...");
        setError("");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      console.error("Error registering user:", err);
      setError(
        "Registration failed. Ensure your email is correct, password must contain atleast 6 characters with one number included."
      );
    }
  };

  return (
    <div className={styles.main}>
      <input
        type="text"
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <Button title="Register" onClick={handleRegister} />
    </div>
  );
};

export default RegisterForm;

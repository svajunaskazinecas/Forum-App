import { useState } from "react";
import cookie from "js-cookie";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import Button from "@/components/atoms/button/button";
import { login } from "@/apiCalls/user";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowError, setShowError] = useState(false);

  const LoginUser = async () => {
    try {
      const response = await login({ email, password });

      if (response.status === 200) {
        cookie.set("jwt", response.data.jwt_token);
        cookie.set("userId", response.data.uuid);
        cookie.set("name", response.data.name);
        router.push("/");
      }
    } catch (err) {
      console.log("error", err);
      setShowError(true);
    }
  };

  return (
    <div className={styles.main}>
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        placeholder="email"
        type="text"
      />
      <input
        onChange={(p) => {
          setPassword(p.target.value);
        }}
        value={password}
        placeholder="password"
        type="password"
      />

      {isShowError && <h5 className={styles.error}>Bad email or password</h5>}

      <Button onClick={LoginUser} title="Login" />
    </div>
  );
};

export default LoginForm;

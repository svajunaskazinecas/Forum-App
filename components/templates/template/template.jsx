import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/organisms/Header/Header";
import Footer from "@/components/organisms/Footer/footer";
import cookie from "js-cookie";

const PageTemplate = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = cookie.get("jwt");
    if (token) {
      setIsUserLoggedIn(true);
    }
  }, []);

  const signOut = () => {
    const isConfirmed = window.confirm("Are you sure you want to Sign Out?");

    if (!isConfirmed) return;

    cookie.remove("jwt");
    cookie.remove("userId");
    cookie.remove("name");
    // localStorage.removeItem("votedAnswers");
    router.push("/");

    setIsUserLoggedIn(false);
  };

  return (
    <div className={styles.wrapper}>
      <Header isUserLoggedIn={isUserLoggedIn} onSignOut={signOut} />
      <div className={styles.main}>{children} </div>
      <Footer />
    </div>
  );
};

export default PageTemplate;

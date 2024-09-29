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
    cookie.remove("jwt");
    cookie.remove("user_id");
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

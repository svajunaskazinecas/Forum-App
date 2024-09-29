import styles from "./styles.module.css";
import Link from "next/link";
import Button from "../../atoms/button/button";
import { useRouter } from "next/router";

const Header = ({ isUserLoggedIn, onSignOut }) => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <Link href="/" className={styles.logo}>
          Forum <span>App</span>
        </Link>
        <ul>
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="#">NEW QUESTION</Link>
          </li>
          <li>
            <Link href="#">CATEGORIES</Link>
          </li>
        </ul>
        <div className={styles.btnWrapper}>
          {isUserLoggedIn ? (
            <>
              <Button onClick={onSignOut} title="Sign Out" />
            </>
          ) : (
            <>
              <button
                className={styles.signInBtn}
                onClick={() => {
                  router.push("/login");
                }}
              >
                Login
              </button>
              <Button title="Sign Up" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

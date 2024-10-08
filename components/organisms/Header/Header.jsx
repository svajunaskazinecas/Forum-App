import styles from "./styles.module.css";
import Link from "next/link";
import Button from "../../atoms/button/button";
import { useRouter } from "next/router";
import cookie from "js-cookie";

const Header = ({ isUserLoggedIn, onSignOut }) => {
  const router = useRouter();
  const jwt = cookie.get("jwt");

  const handeClick = (e) => {
    if (!jwt) {
      e.preventDefault();
      alert("You need to log in first");
    }
  };

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
            <Link onClick={handeClick} href="/createDiscussion">
              NEW DISCUSSION
            </Link>
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
              <Button
                onClick={() => {
                  router.push("/register");
                }}
                title="Sign Up"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

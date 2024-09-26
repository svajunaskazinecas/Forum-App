import styles from "./styles.module.css";
import Link from "next/link";
import Button from "../../atoms/button/button";

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <Link href="#" className={styles.logo}>
          Forum <span>App</span>
        </Link>
        <ul>
          <li>
            <Link href="#">HOME</Link>
          </li>
          <li>
            <Link href="#">NEW QUESTION</Link>
          </li>
          <li>
            <Link href="#">CATEGORIES</Link>
          </li>
        </ul>
        <div className={styles.btnWrapper}>
          <button className={styles.signInBtn}>Login</button>
          <Button title="Sign Up" />
        </div>
      </div>
    </div>
  );
};

export default Header;

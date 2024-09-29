import styles from "./styles.module.css";

const Button = ({ onClick, title }) => {
  return (
    <button onClick={onClick} className={styles.main}>
      {title}
    </button>
  );
};

export default Button;

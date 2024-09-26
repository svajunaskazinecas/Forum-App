import styles from "./styles.module.css";

const Button = ({ title }) => {
  return <button className={styles.main}>{title}</button>;
};

export default Button;

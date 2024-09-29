import styles from "./styles.module.css";

const Tags = ({ title, description }) => {
  return (
    <div className={`${styles.main} && ${styles.left}`}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Tags;

import styles from "./styles.module.css";

const Tags = ({ title, description, onClick }) => {
  return (
    <div className={styles.main} onClick={onClick}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Tags;

import styles from "./style.module.css";

const TagsCount = ({ count }) => {
  return <h3 className={styles.main}>{count}</h3>;
};

export default TagsCount;

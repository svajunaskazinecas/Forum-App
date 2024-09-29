import styles from "./styles.module.css";

const TagsHeader = () => {
  return (
    <>
      <h3 className={styles.main}>FORUM</h3>
      <h3 className={`${styles.main} && ${styles.left}`}>POSTS</h3>
    </>
  );
};

export default TagsHeader;

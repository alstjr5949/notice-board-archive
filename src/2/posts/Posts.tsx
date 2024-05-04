import Post from "./post/Post";

import styles from "./Posts.module.css";

interface IProps {
  onAddPostButtonClick: () => void;
}

const Posts = (props: IProps) => {
  const { onAddPostButtonClick } = props;

  return (
    <main className={styles["post-main"]}>
      <table className={styles["post-table"]}>
        <thead>
          <tr>
            <th>No</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>작성시간</th>
            <th>좋아요</th>
          </tr>
        </thead>
        <tbody>
          <Post />
        </tbody>
      </table>
      <div className={styles["add-post-button-wrapper"]}>
        <button
          className={styles["add-post-button"]}
          onClick={onAddPostButtonClick}
        >
          글쓰기
        </button>
      </div>
    </main>
  );
};

export default Posts;

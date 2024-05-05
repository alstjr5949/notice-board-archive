import { IPost } from "../types";
import Post from "./post/Post";

import styles from "./Posts.module.css";

interface IProps {
  posts: IPost[];
  onAddPostButtonClick: () => void;
  onPostItemClick: (post: IPost) => void;
}

const Posts = (props: IProps) => {
  const { posts, onAddPostButtonClick, onPostItemClick } = props;

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
          {posts.map((post, index) => (
            <Post
              key={post.id}
              post={post}
              index={index}
              onPostItemClick={onPostItemClick}
            />
          ))}
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

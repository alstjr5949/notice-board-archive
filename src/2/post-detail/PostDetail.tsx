import { IPost } from "../types";

import styles from "./PostDetail.module.css";

interface IProps {
  selectedPost: IPost;
  onPostDetailModalCancelButtonClick: () => void;
  onPostDetailModalEditButtonClick: () => void;
  onPostDetailModalDeleteButtonClick: () => void;
}

const PostDetail = (props: IProps) => {
  const {
    selectedPost: { title, category, createdTime, content },
    onPostDetailModalCancelButtonClick,
    onPostDetailModalEditButtonClick,
    onPostDetailModalDeleteButtonClick,
  } = props;

  return (
    <div className={styles["post-detail-modal"]}>
      <header>
        <h2 className={styles["title"]}>{title}</h2>
      </header>
      <main>
        <dl>
          <dt>카테고리</dt>
          <dd>{category}</dd>
          <dt>생성시간</dt>
          <dd>{`${new Date(createdTime.seconds * 1000).toLocaleDateString(
            "ko"
          )}`}</dd>
        </dl>
        <p className={styles["content"]}>{content}</p>
      </main>
      <footer className={styles["--footer"]}>
        <button
          onClick={onPostDetailModalCancelButtonClick}
          className={styles["cancel-button"]}
        >
          취소
        </button>
        <button
          onClick={onPostDetailModalDeleteButtonClick}
          className={styles["delete-button"]}
        >
          삭제
        </button>
        <button
          onClick={onPostDetailModalEditButtonClick}
          className={styles["edit-button"]}
        >
          수정
        </button>
      </footer>
    </div>
  );
};

export default PostDetail;

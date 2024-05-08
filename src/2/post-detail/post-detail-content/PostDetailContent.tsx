import styles from "./PostDetailConetent.module.css";

interface IProps {
  title: string;
  category: string;
  createdTime: string;
  content: string;
  onPostDetailModalCancelButtonClick: () => void;
  onPostDetailModalEditButtonClick: () => void;
  onPostDetailModalDeleteButtonClick: () => void;
}

const PostDetailContent = (props: IProps) => {
  const {
    title,
    category,
    createdTime,
    content,
    onPostDetailModalCancelButtonClick,
    onPostDetailModalDeleteButtonClick,
    onPostDetailModalEditButtonClick,
  } = props;

  return (
    <>
      <header className={styles["header"]}>
        <h2 className={styles["title"]}>{title}</h2>
      </header>
      <main className={styles["main"]}>
        <dl>
          <dt>카테고리</dt>
          <dd>{category}</dd>
          <dt>생성시간</dt>
          <dd>{createdTime}</dd>
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
    </>
  );
};

export default PostDetailContent;

import styles from "./CreatePostModal.module.css";

interface IProps {
  onCreateModalCancelButtonClick: () => void;
  onCreateModalFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CreatePostModal = (props: IProps) => {
  const { onCreateModalCancelButtonClick, onCreateModalFormSubmit } = props;

  return (
    <div className={styles["create-modal"]}>
      <header>
        <h2>글 작성하기</h2>
      </header>
      <main>
        <form
          onSubmit={onCreateModalFormSubmit}
          className={styles["create-post-form"]}
        >
          <input
            type="text"
            className={styles["title-input"]}
            placeholder="제목을 입력하세요"
          />
          <label htmlFor="category">카테고리</label>
          <select id="category" className={styles["category-select"]}>
            <option value="test">test</option>
          </select>
          <textarea
            placeholder="내용을 입력하세요..."
            rows={19}
            className={styles["content-textarea"]}
          />
        </form>
      </main>
      <footer className={styles["--footer"]}>
        <button
          onClick={onCreateModalCancelButtonClick}
          className={styles["cancle-button"]}
        >
          취소
        </button>
        <button type="submit" className={styles["create-button"]}>
          완료
        </button>
      </footer>
    </div>
  );
};

export default CreatePostModal;

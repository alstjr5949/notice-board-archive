import { ChangeEvent } from "react";
import styles from "./CreatePostModal.module.css";

interface IProps {
  categories: string[];
  onCreateModalCancelButtonClick: () => void;
  onCreateModalFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onFormInfoChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

const CreatePostModal = (props: IProps) => {
  const {
    categories,
    onCreateModalCancelButtonClick,
    onCreateModalFormSubmit,
    onFormInfoChange,
  } = props;

  const categoriesFilteredAll = categories.slice(1);

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
            name="title"
            type="text"
            className={styles["title-input"]}
            placeholder="제목을 입력하세요"
            onChange={onFormInfoChange}
            maxLength={20}
            required
          />
          <label htmlFor="category">카테고리</label>
          <select
            name="category"
            id="category"
            className={styles["category-select"]}
            onChange={onFormInfoChange}
          >
            {categoriesFilteredAll.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <textarea
            name="content"
            placeholder="내용을 입력하세요..."
            rows={19}
            className={styles["content-textarea"]}
            onChange={onFormInfoChange}
            maxLength={150}
            required
          />
          <div className={styles["--footer"]}>
            <button
              onClick={onCreateModalCancelButtonClick}
              className={styles["cancle-button"]}
            >
              취소
            </button>
            <button type="submit" className={styles["create-button"]}>
              완료
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreatePostModal;

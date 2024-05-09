import { ChangeEvent } from "react";
import styles from "./EditPost.module.css";

interface IProps {
  title: string;
  category: string;
  content: string;
  createdTime: string;
  categoriesFilteredAll: string[];
  onFormInfoChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

const EditPost = (props: IProps) => {
  const {
    title,
    category,
    content,
    createdTime,
    categoriesFilteredAll,
    onFormInfoChange,
  } = props;

  return (
    <form className={styles["edit-post-form"]}>
      <header>
        <h2 className={styles["--title"]}>수정하기</h2>
      </header>
      <main>
        <label htmlFor="title">제목</label>
        <input
          name="title"
          id="title"
          type="text"
          defaultValue={title}
          className={styles["title-input"]}
          onChange={onFormInfoChange}
        />
        <label htmlFor="category">카테고리</label>
        <select
          name="category"
          id="category"
          defaultValue={category}
          className={styles["category-select"]}
          onChange={onFormInfoChange}
        >
          {categoriesFilteredAll.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <dl>
          <dt>생성시간</dt>
          <dd>{createdTime}</dd>
        </dl>
        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          defaultValue={content}
          className={styles["content-textarea"]}
          rows={16}
          onChange={onFormInfoChange}
        />
      </main>
      <footer>
        <button className={styles["edit-cancel-button"]}>취소</button>
        <button className={styles["edit-submit-button"]} type="submit">
          완료
        </button>
      </footer>
    </form>
  );
};

export default EditPost;

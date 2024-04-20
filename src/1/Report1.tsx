import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import PageTemplate from "../temp/PageTemplate";

import styles from "./Report1.module.css";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const categories = [
  "전체",
  "문학",
  "경제경영",
  "자기계발",
  "경영혁신",
  "컴퓨터",
  "소설",
  "예술",
  "건강",
];

interface IPosts {
  id: string;
  category: string;
  title: string;
  createdTime: Timestamp;
  like: number;
}

const Report1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [isCreatePostModalVisible, setIsCreatePostModalVisible] =
    useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [category, setCategory] = useState("문학");

  const handleCreatePostButtonClick = () => {
    setIsCreatePostModalVisible((prev) => !prev);
  };

  const handleCancelCreateButtonClick = () => {
    setIsCreatePostModalVisible(false);
  };

  const handlePostTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value);
  };

  const handlePostCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(e.target.value);
  };

  const handlePostContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPostContent(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || !postTitle || !postContent) return;

    try {
      setIsLoading(true);

      await addDoc(collection(db, "posts"), {
        title: postTitle,
        content: postContent,
        category,
        createdTime: new Date(),
        like: 0,
      });

      setIsCreatePostModalVisible(false);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      const boardQuery = query(collection(db, "posts"), orderBy("createdTime"));
      const snapshot = await getDocs(boardQuery);

      const posts = snapshot.docs.map((doc) => {
        const { category, title, createdTime, like } = doc.data();

        return {
          id: doc.id,
          category,
          title,
          createdTime,
          like,
        };
      });

      setPosts(posts);
    };

    getPosts();
  }, []);

  const categoriesFilteredAll = categories.slice(1);

  return (
    <PageTemplate>
      <div className={styles["report-wrapper"]}>
        <header className={styles["report-header"]}>
          <h1 className={styles["report-title"]}>Report 1</h1>
          <nav className={styles["report-nav"]}>
            <ul className={styles["report-list-wrapper"]}>
              {categories.map((category) => (
                <li key={category} className={styles["report-list"]}>
                  {category}
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main>
          <table>
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
              {posts.map(
                ({ id, category, title, createdTime, like }, index) => (
                  <tr key={id} className={styles["table-row"]}>
                    <td>{index + 1}</td>
                    <td>{category}</td>
                    <td>{title}</td>
                    <td>{`${new Date(
                      createdTime.seconds * 1000
                    ).toLocaleDateString("ko")}`}</td>
                    <td>{like}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </main>
        <footer className={styles["report-footer"]}>
          <button
            onClick={handleCreatePostButtonClick}
            className={styles["post-create-button"]}
          >
            글쓰기
          </button>
        </footer>
        {isCreatePostModalVisible && (
          <div className={styles["post-create-modal"]}>
            <form
              className={styles["post-create-form"]}
              onSubmit={handleFormSubmit}
            >
              <header>
                <h1 className={styles["modal-title"]}>글쓰기</h1>
              </header>
              <main>
                <label htmlFor="title-input">제목</label>
                <input
                  id="title-input"
                  className={styles["title-input"]}
                  type="text"
                  placeholder="제목을 입력하세요"
                  onChange={handlePostTitleChange}
                  required
                />
                <label htmlFor="category">카테고리</label>
                <select id="category" onChange={handlePostCategoryChange}>
                  {categoriesFilteredAll.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <label htmlFor="contents">내용</label>
                <textarea
                  name="contents"
                  id="contents"
                  placeholder="게시글을 입력하세요"
                  maxLength={150}
                  cols={30}
                  rows={10}
                  onChange={handlePostContentChange}
                  required
                />
              </main>
              <footer>
                <div className={styles["button-wrapper"]}>
                  <button onClick={handleCancelCreateButtonClick}>취소</button>
                  <button className={styles["submit-button"]} type="submit">
                    완료
                  </button>
                </div>
              </footer>
            </form>
          </div>
        )}
      </div>
    </PageTemplate>
  );
};

export default Report1;

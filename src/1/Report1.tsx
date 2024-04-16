import { collection, getDocs, orderBy, query } from "firebase/firestore";
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
  createdTime: Date;
  like: number;
}

const Report1 = () => {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [isCreatePostModalVisible, setIsCreatePostModalVisible] =
    useState(false);

  const handleCreatePostButtonClick = () => {
    setIsCreatePostModalVisible((prev) => !prev);
  };

  const handleCancelCreateButtonClick = () => {
    setIsCreatePostModalVisible(false);
  };

  useEffect(() => {
    const getPosts = async () => {
      const boardQuery = query(collection(db, "board"), orderBy("createdTime"));
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
                    <td>{`${createdTime}`}</td>
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
            <form className={styles["post-create-form"]}>
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
                />
                <label htmlFor="category">카테고리</label>
                <select id="category">
                  {categories.map((category) => (
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

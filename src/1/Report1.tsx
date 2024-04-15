import { collection, getDocs, orderBy, query } from "firebase/firestore";
import PageTemplate from "../temp/PageTemplate";

import styles from "./Report1.module.css";
import { reportListDummy } from "./data";
import { db } from "../firebase";

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

const Report1 = () => {
  const handleWritingButtonClick = async () => {
    const boardQuery = query(collection(db, "board"), orderBy("createdTime"));
    const snapshot = await getDocs(boardQuery);

    console.log(snapshot.docs.map((doc) => doc.data()));
  };

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
              {reportListDummy.map(
                ({ id, index, category, title, createdTime, like }) => (
                  <tr key={id} className={styles["table-row"]}>
                    <td>{index}</td>
                    <td>{category}</td>
                    <td>{title}</td>
                    <td>{createdTime}</td>
                    <td>{like}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </main>
        <footer className={styles["report-footer"]}>
          <button
            onClick={handleWritingButtonClick}
            className={styles["report-create-button"]}
          >
            글쓰기
          </button>
        </footer>
      </div>
    </PageTemplate>
  );
};

export default Report1;

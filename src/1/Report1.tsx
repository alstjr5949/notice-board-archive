import PageTemplate from "../temp/PageTemplate";

import styles from "./Report1.module.css";
import { reportListDummy } from "./data";

const Report1 = () => {
  return (
    <PageTemplate>
      <div className={styles["report-wrapper"]}>
        <header>
          <h1>Report 1</h1>
          <nav>
            <ul>
              <li>전체</li>
              <li>문학</li>
              <li>경제경영</li>
              <li>자기계발</li>
              <li>경영혁신</li>
              <li>컴퓨터</li>
              <li>소설</li>
              <li>예술</li>
              <li>건강</li>
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
        <footer>
          <button>글쓰기</button>
        </footer>
      </div>
    </PageTemplate>
  );
};

export default Report1;

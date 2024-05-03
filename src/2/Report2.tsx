import PageTemplate from "../temp/PageTemplate";

import styles from "./Report2.module.css";
import Header from "./header/Header";
import Posts from "./posts/Posts";

const Report2 = () => {
  return (
    <PageTemplate>
      <div className={styles["report-wrapper"]}>
        <Header />
        <Posts />
      </div>
    </PageTemplate>
  );
};

export default Report2;

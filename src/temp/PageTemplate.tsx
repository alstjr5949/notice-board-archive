import React from "react";

import styles from "./PageTemplate.module.css";

interface Props {
  children: React.ReactNode;
}

const PageTemplate = (props: Props) => {
  const { children } = props;

  return <div className={styles["report-container"]}>{children}</div>;
};

export default PageTemplate;

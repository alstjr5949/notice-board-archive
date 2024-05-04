import { useState } from "react";
import PageTemplate from "../temp/PageTemplate";

import styles from "./Report2.module.css";
import Header from "./header/Header";
import Posts from "./posts/Posts";
import CreatePostModal from "./create-post-modal/CreatePostModal";

const Report2 = () => {
  const [isCreatePost, setIsCreatePost] = useState(false);

  const handleAddPostButtonClick = () => {
    setIsCreatePost(true);
  };

  const handleCreateModalCancelButtonClick = () => {
    setIsCreatePost(false);
  };

  const handleCreateModalFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsCreatePost(false);
  };

  return (
    <PageTemplate>
      <div className={styles["report-wrapper"]}>
        <Header />
        <Posts onAddPostButtonClick={handleAddPostButtonClick} />
      </div>
      {isCreatePost && (
        <CreatePostModal
          onCreateModalCancelButtonClick={handleCreateModalCancelButtonClick}
          onCreateModalFormSubmit={handleCreateModalFormSubmit}
        />
      )}
    </PageTemplate>
  );
};

export default Report2;

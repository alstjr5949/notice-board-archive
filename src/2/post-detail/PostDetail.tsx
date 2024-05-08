import { ChangeEvent } from "react";
import { IPost } from "../types";

import styles from "./PostDetail.module.css";
import EditPost from "./edit-post/EditPost";
import PostDetailContent from "./post-detail-content/PostDetailContent";

interface IProps {
  categoriesFilteredAll: string[];
  isEditMode: boolean;
  selectedPost: IPost;
  onPostDetailModalCancelButtonClick: () => void;
  onPostDetailModalEditButtonClick: () => void;
  onPostDetailModalDeleteButtonClick: () => void;
  onFormInfoChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

const PostDetail = (props: IProps) => {
  const {
    categoriesFilteredAll,
    isEditMode,
    selectedPost: { title, category, createdTime, content },
    onPostDetailModalCancelButtonClick,
    onPostDetailModalEditButtonClick,
    onPostDetailModalDeleteButtonClick,
    onFormInfoChange,
  } = props;

  return (
    <div className={styles["post-detail-modal"]}>
      {isEditMode ? (
        <EditPost
          title={title}
          category={category}
          createdTime={`${new Date(
            createdTime.seconds * 1000
          ).toLocaleDateString("ko")}`}
          content={content}
          categoriesFilteredAll={categoriesFilteredAll}
          onFormInfoChange={onFormInfoChange}
        />
      ) : (
        <PostDetailContent
          title={title}
          category={category}
          createdTime={`${new Date(
            createdTime.seconds * 1000
          ).toLocaleDateString("ko")}`}
          content={content}
          onPostDetailModalCancelButtonClick={
            onPostDetailModalCancelButtonClick
          }
          onPostDetailModalDeleteButtonClick={
            onPostDetailModalDeleteButtonClick
          }
          onPostDetailModalEditButtonClick={onPostDetailModalEditButtonClick}
        />
      )}
    </div>
  );
};

export default PostDetail;

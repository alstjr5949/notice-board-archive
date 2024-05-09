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
  onEditFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onFormInfoChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onEditFormCancelButtonClick: () => void;
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
    onEditFormSubmit,
    onEditFormCancelButtonClick,
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
          onEditFormSubmit={onEditFormSubmit}
          onEditFormCancelButtonClick={onEditFormCancelButtonClick}
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

import { ChangeEvent, useEffect, useState } from "react";
import PageTemplate from "../temp/PageTemplate";

import styles from "./Report2.module.css";
import Header from "./header/Header";
import Posts from "./posts/Posts";
import CreatePostModal from "./create-post-modal/CreatePostModal";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Unsubscribe } from "firebase/database";
import { IForm, IPost } from "./types";
import PostDetail from "./post-detail/PostDetail";

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

const Report2 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [postFormInfo, setPostFromInfo] = useState<IForm>({
    title: "",
    category: "문학",
    content: "",
  });
  const [posts, setPosts] = useState<IPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleAddPostButtonClick = () => {
    setIsCreatePost(true);
  };

  const handleCreateModalCancelButtonClick = () => {
    setIsCreatePost(false);
  };

  const handleFormInfoChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setPostFromInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateModalFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isLoading || !postFormInfo.title || !postFormInfo.content) return;

    try {
      setIsLoading(true);

      await addDoc(collection(db, "secondPost"), {
        title: postFormInfo.title,
        content: postFormInfo.content,
        category: postFormInfo.category,
        createdTime: new Date(),
        like: 0,
      });

      setIsCreatePost(false);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostItemClick = (post: IPost) => {
    setSelectedPost(post);
  };

  const handlePostDetailModalCancelButtonClick = () => {
    setSelectedPost(null);
  };

  const handlePostDetailModalEditButtonClick = () => {
    setIsEditMode(true);
  };

  const handlePostDetailModalDeleteButtonClick = () => {
    if (!selectedPost) return;

    deleteDoc(doc(db, "secondPost", selectedPost.id));
    setSelectedPost(null);
  };

  const handleEditFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading || !selectedPost) return;

    try {
      setIsLoading(true);

      await updateDoc(doc(db, "secondPost", selectedPost.id), {
        title: postFormInfo.title ? postFormInfo.title : selectedPost.title,
        category: postFormInfo.category
          ? postFormInfo.category
          : selectedPost.category,
        content: postFormInfo.content
          ? postFormInfo.content
          : selectedPost.content,
      });

      setSelectedPost(null);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditFormCancelButtonClick = () => {
    setIsEditMode(false);
  };

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const getPosts = async () => {
      const postQuery = query(
        collection(db, "secondPost"),
        orderBy("createdTime", "desc"),
        limit(50)
      );

      unsubscribe = await onSnapshot(postQuery, (snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          const { category, title, createdTime, like, content } = doc.data();

          return {
            id: doc.id,
            category,
            title,
            createdTime,
            like,
            content,
          };
        });

        setPosts(posts);
      });
    };

    getPosts();

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  const categoriesFilteredAll = categories.slice(1);

  return (
    <PageTemplate>
      <div className={styles["report-wrapper"]}>
        <Header />
        <Posts
          posts={posts}
          onAddPostButtonClick={handleAddPostButtonClick}
          onPostItemClick={handlePostItemClick}
        />
      </div>
      {isCreatePost && (
        <CreatePostModal
          categoriesFilteredAll={categoriesFilteredAll}
          onCreateModalCancelButtonClick={handleCreateModalCancelButtonClick}
          onCreateModalFormSubmit={handleCreateModalFormSubmit}
          onFormInfoChange={handleFormInfoChange}
        />
      )}
      {selectedPost && !isCreatePost && (
        <PostDetail
          categoriesFilteredAll={categoriesFilteredAll}
          isEditMode={isEditMode}
          selectedPost={selectedPost}
          onPostDetailModalCancelButtonClick={
            handlePostDetailModalCancelButtonClick
          }
          onPostDetailModalEditButtonClick={
            handlePostDetailModalEditButtonClick
          }
          onPostDetailModalDeleteButtonClick={
            handlePostDetailModalDeleteButtonClick
          }
          onFormInfoChange={handleFormInfoChange}
          onEditFormSubmit={handleEditFormSubmit}
          onEditFormCancelButtonClick={handleEditFormCancelButtonClick}
        />
      )}
    </PageTemplate>
  );
};

export default Report2;

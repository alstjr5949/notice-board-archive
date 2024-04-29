import {
  Timestamp,
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
import PageTemplate from "../temp/PageTemplate";

import styles from "./Report1.module.css";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { Unsubscribe } from "firebase/database";

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

interface IPost {
  id: string;
  category: string;
  title: string;
  createdTime: Timestamp;
  like: number;
  content: string;
}

const Report1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isCreatePostModalVisible, setIsCreatePostModalVisible] =
    useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [category, setCategory] = useState("문학");
  const [selectedPost, setSelectedPost] = useState<IPost>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editContent, setEditContent] = useState("");

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

  const handlePostItemClick = (selectedPost: IPost) => {
    setSelectedPost(selectedPost);
  };

  const handlePostDetailCancelButtonClick = () => {
    setSelectedPost(undefined);
  };

  const handlePostDetailEditButtonClick = () => {
    setIsEditMode(true);
  };

  const handlePostDetailDeleteButtonClick = () => {
    if (!selectedPost) return;

    deleteDoc(doc(db, "posts", selectedPost.id));
    setSelectedPost(undefined);
  };

  const handleEditModeCancelButtonClick = () => {
    setIsEditMode(false);
  };

  const handleEditModeTitleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditTitle(e.target.value);
  };

  const handleEditModeCategorySelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEditCategory(e.target.value);
  };

  const handleEditModeContentTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditContent(e.target.value);
  };

  const handleEditFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    selectedPost: IPost
  ) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "posts", selectedPost.id), {
        title: !editTitle ? selectedPost.title : editTitle,
        category: !editCategory ? selectedPost.category : editCategory,
        content: !editContent ? selectedPost.content : editContent,
      });

      setSelectedPost(undefined);
      setIsEditMode(false);
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  };

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const getPosts = async () => {
      const postQuery = query(
        collection(db, "posts"),
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
              {posts.map((post, index) => (
                <tr
                  key={post.id}
                  className={styles["table-row"]}
                  onClick={() => handlePostItemClick(post)}
                >
                  <td>{index + 1}</td>
                  <td>{post.category}</td>
                  <td>{post.title}</td>
                  <td>{`${new Date(
                    post.createdTime.seconds * 1000
                  ).toLocaleDateString("ko")}`}</td>
                  <td>{post.like}</td>
                </tr>
              ))}
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
        {selectedPost && (
          <div className={styles["post-detail-modal"]}>
            {isEditMode ? (
              <form
                className={styles["edit-form"]}
                onSubmit={(e) => handleEditFormSubmit(e, selectedPost)}
              >
                <header>
                  <h1>수정하기</h1>
                </header>
                <main>
                  <input
                    defaultValue={selectedPost.title}
                    className={styles["title-input"]}
                    onChange={handleEditModeTitleInputChange}
                  />
                  <select
                    defaultValue={selectedPost.category}
                    className={styles["category-select"]}
                    onChange={handleEditModeCategorySelectChange}
                  >
                    {categoriesFilteredAll.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <p
                    className={styles["selected-post-created-time"]}
                  >{`${new Date(
                    selectedPost.createdTime.seconds * 1000
                  ).toLocaleDateString("ko")}`}</p>
                  <textarea
                    defaultValue={selectedPost.content}
                    rows={15}
                    className={styles["content-textarea"]}
                    onChange={handleEditModeContentTextareaChange}
                  />
                </main>
                <footer>
                  <button onClick={handleEditModeCancelButtonClick}>
                    취소
                  </button>
                  <button type="submit">완료</button>
                </footer>
              </form>
            ) : (
              <>
                <header>
                  <h1 className={styles["selected-post-title"]}>
                    {selectedPost.title}
                  </h1>
                  <p className={styles["selected-post-category"]}>
                    {selectedPost.category}
                  </p>
                  <p
                    className={styles["selected-post-created-time"]}
                  >{`${new Date(
                    selectedPost.createdTime.seconds * 1000
                  ).toLocaleDateString("ko")}`}</p>
                </header>
                <main>
                  <div className={styles["selected-post-content"]}>
                    {selectedPost.content}
                  </div>
                </main>
                <footer>
                  <button
                    className={styles["cancel-button"]}
                    onClick={handlePostDetailCancelButtonClick}
                  >
                    취소
                  </button>
                  <button
                    className={styles["edit-button"]}
                    onClick={handlePostDetailEditButtonClick}
                  >
                    수정
                  </button>
                  <button
                    className={styles["delete-button"]}
                    onClick={handlePostDetailDeleteButtonClick}
                  >
                    삭제
                  </button>
                </footer>
              </>
            )}
          </div>
        )}
      </div>
    </PageTemplate>
  );
};

export default Report1;

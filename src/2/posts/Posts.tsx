import Post from "./post/Post";

const Posts = () => {
  return (
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
          <Post />
        </tbody>
      </table>
      <div>
        <button>글쓰기</button>
      </div>
    </main>
  );
};

export default Posts;

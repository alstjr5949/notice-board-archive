import { IPost } from "../../types";

interface IProps {
  post: IPost;
  index: number;
  onPostItemClick: (post: IPost) => void;
}

const Post = (props: IProps) => {
  const { post, index, onPostItemClick } = props;

  const { title, category, createdTime, like } = post;

  return (
    <tr onClick={() => onPostItemClick(post)}>
      <td>{index + 1}</td>
      <td>{category}</td>
      <td>{title}</td>
      <td>{`${new Date(createdTime.seconds * 1000).toLocaleDateString(
        "ko"
      )}`}</td>
      <td>{like}</td>
    </tr>
  );
};

export default Post;

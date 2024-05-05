import { Timestamp } from "firebase/firestore";

interface IProps {
  title: string;
  category: string;
  createdTime: Timestamp;
  like: number;
  index: number;
}

const Post = (props: IProps) => {
  const { title, category, createdTime, like, index } = props;

  return (
    <tr>
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

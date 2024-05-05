import { Timestamp } from "firebase/firestore";

export interface IForm {
  title: string;
  category: string;
  content: string;
}

export interface IPost {
  id: string;
  category: string;
  title: string;
  createdTime: Timestamp;
  like: number;
  content: string;
}

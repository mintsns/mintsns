import { Comment } from "./comment.ts";

// class は javascriptの機能
// export をつけると他のファイルから呼び出せる
export class Post {
  id: number;
  user_name: string;
  message: string;
  comments: Comment[];
}

export var mockPosts: Post[] = [
  { "id": 11, "user_name": "Mr. Nice", message: "test", comments: [] },
  { "id": 12, "user_name": "Narco", message: "test", comments: [] },
  { "id": 13, "user_name": "Bombasto", message: "test", comments: [] },
  { "id": 14, "user_name": "Celeritas", message: "test", comments: [] },
  { "id": 15, "user_name": "Magneta", message: "test", comments: [] },
  { "id": 16, "user_name": "RubberMan", message: "test", comments: [] },
  { "id": 17, "user_name": "Dynama", message: "test", comments: [] },
  { "id": 18, "user_name": "Dr IQ", message: "test", comments: [] },
  { "id": 19, "user_name": "Magma", message: "test", comments: [] },
  { "id": 20, "user_name": "Tornado", message: "test", comments: [] }
];
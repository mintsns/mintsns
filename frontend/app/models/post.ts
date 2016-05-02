import { Comment } from "./comment.ts";
import { User } from "./user.ts";

// class は javascriptの機能
// export をつけると他のファイルから呼び出せる
export class Post {
  id: number;           // ポストID
  user: User;           // 投稿者
  message: string;      // 投稿メッセージ
  pointUsers: User[]    // ポイントをつけたユーザー
  shareUsers: User[];   // シェアをしたユーザー
  comments: Comment[];  // コメントリスト

  constructor() {}


  // 投稿者を書き換えてPostを生成する
  copyWithUser(user: User): Post {
    return _(new Post())
      .tap((post: Post) => {
        post.user = user;
        post.message = this.message;
        post.pointUsers = [];
        post.shareUsers = [];
        post.comments = [];
      }).value();
  }


}
import {User} from "./user.ts";
export class Comment {
  id: number;
  user: User;
  message: string;
  imageThumbnailUrl: string; // 投稿された画像のサムネイルURL
  imageUrl: string; // 投稿された画像のサムネイルURL
  addTime: Date; // 投稿時間
  updateTime: Date; // 更新時間(nullではない場合は編集済み)

  // 投稿者を書き換えてPostを生成する
  copyWithUser(user: User): Comment {
    return _(new Comment())
      .tap((post: Comment) => {
        post.user = user;
        post.message = this.message;
        post.imageThumbnailUrl = "";
        post.imageUrl = "";
        post.addTime = new Date();
      }).value();
  }

}
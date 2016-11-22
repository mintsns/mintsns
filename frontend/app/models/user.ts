"use strict";
// ユーザーモデル
// パスワードカラム
//     パスワード欄はログイン時のみ使用すること
// アイコンサイズについて
//     default --> original
//     small   --> 16x16
//     medium  --> 32x32
//     large   --> 128x128
// TODO: タグを加える
export class User {
  id: number;
  name: string;
  iconUrl: string;
  iconUrlSmall: string;
  iconUrlMedium: string;
  iconUrlLarge: string;
  email: string;
  password: string;
  // 自分の場合 true になる
  isMe: boolean;
}
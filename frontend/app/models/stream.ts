"use strict";
import {StreamZone} from "./stream_zone";
// ストリームモデル
export class Stream {
  id: number;
  name: string;
  zone: StreamZone;
  isHome: boolean;
  isYourZone: boolean;
  isPublic: boolean;
  postScope: Stream[]; // 投稿範囲
  useHomePostScope: boolean; // ホームの投稿範囲を使用する
  isIncludedPostScope: boolean; // ポスト公開範囲に含まれているか(ストリーム別)


}
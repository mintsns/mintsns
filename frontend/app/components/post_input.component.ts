"use strict";
// 投稿画面のコンポーネント
import { Component, OnInit, Output, EventEmitter } from 'angular2/core';
import { Router } from 'angular2/router';
import { Post } from '../models/post';
import { CommentComponent } from "../components/comment.component";
import { StreamService } from '../services/stream.service';
import { AuthSharedService } from "../shared_services/auth.shared_service";
import { AppSharedService } from "../shared_services/app.shared_service";
import { User } from '../models/user';
import { Stream } from '../models/stream';


// 投稿入力欄のコンポーネント
@Component({
  selector: "post-input",
  templateUrl: "views/post_input.html"
})
export class PostInputComponent implements OnInit {

  // 新規ポスト
  post: Post;

  // 投稿主
  user: User;

  // 現在のストリーム
  stream: Stream;

  // ポストスコープ
  postScope: Stream[];


  // 新規ポストが押されたイベント
  @Output() newPost = new EventEmitter();

  constructor(
    private router: Router,
    private authSharedService: AuthSharedService,
    private appSharedService: AppSharedService
  ) {}

  // 初期化
  // TODO: ここでログインユーザーの情報を与えてしまってもいいかも（リスク --> 情報が古くなる）
  ngOnInit() {

    console.log("--> initialize --> post input component");

    this.post = new Post;

    if ( this.authSharedService.isLogin() ) {
      const user: User = this.authSharedService.getLoginUser();
      this.user = user;
    }

    // このストリームで使用する
    this.stream = this.appSharedService.homeStream;

    // ホームスコープを使用する場合
    if ( this.stream.useHomePostScope ) {
      this.postScope = this.appSharedService.homeStream.postScope;
    }
    else {
      this.postScope = this.stream.postScope;
    }

  }

  // 投稿
  sendPost() {

    // メッセージが入力されていない
    if ( !this.post.message ) {
      return;
    }

    // 親にイベントを伝達する
    this.newPost.emit({
      post: this.post
    });

    // 投稿フォームを消す
    setTimeout(() => {
      this.post = new Post;
    }, 1);


  }

  // 新規投稿が押されたボタンのイベント
  onSendPost() {
    this.sendPost();
  }

  // テキストエリアでキーダウン
  onInputAreaKeydown($event) {

    const isActKey = $event.ctrlKey || $event.shiftKey || $event.metaKey;
    const isEnter = $event.keyCode === 13;
    if ( isActKey && isEnter ) {
      this.sendPost();
    }

  }

}
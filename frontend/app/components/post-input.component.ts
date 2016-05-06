"use strict";
// 投稿画面のコンポーネント
import {Component, OnInit, Output, EventEmitter} from "angular2/core";
import {Router} from "angular2/router";
import {Post} from "../models/post";
import {AuthSharedService} from "../shared_services/auth.shared_service";
import {AppSharedService} from "../shared_services/app.shared_service";
import {User} from "../models/user";
import {Stream} from "../models/stream";


// 投稿入力欄のコンポーネント
@Component({
  selector: "post-input",
  templateUrl: "views/post-input.html"
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

  // ゾーンエディタを開くイベント
  @Output() onOpenZoneEditor = new EventEmitter();

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
    this.stream = this.appSharedService.stream;

    // ポストスコープの取得
    this.postScope = this.appSharedService.getPostScopeWithStream(this.stream);


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
    this.post = new Post;
    setTimeout(() => {
      this.post = new Post;
    }, 0);
    setTimeout(() => {
      this.post = new Post;
    }, 1);
    setTimeout(() => {
      this.post = new Post;
    }, 2);
    setTimeout(() => {
      this.post = new Post;
    }, 3);
    setTimeout(() => {
      this.post = new Post;
    }, 4);
    setTimeout(() => {
      this.post = new Post;
    }, 5);


  }

  // 新規投稿が押されたボタンのイベント
  onSendPost() {
    this.sendPost();
  }

  // テキストエリアでキーダウン
  // TODO: Service
  onInputAreaKeydown($event) {
    const isActKey = $event.ctrlKey || $event.shiftKey || $event.metaKey || $event.altKey;
    const isEnter = $event.keyCode === 13;
    if ( isActKey && isEnter ) {
      this.sendPost();
    }

  }

  // ゾーンエディタを開く
  openZoneEditor() {
    this.onOpenZoneEditor.emit({});
    console.log("--> event --> open zone editor");
  }

  // ゾーンエディタの再描画
  renderPostInputZone() {
    this.stream = this.appSharedService.stream;
    this.postScope = this.appSharedService.getPostScopeWithStream(this.stream);
  }

}
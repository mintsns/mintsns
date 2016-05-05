"use strict";
// タイムライン全体のコンポーネント
import {Component, OnInit, Injector, ViewChild, ElementRef} from "angular2/core";
import {Router, RouteParams, RouteData} from "angular2/router";
import {Post} from "../models/post";
import {User} from "../models/user";
import {Stream} from "../models/stream";
import {PostComponent} from "../components/post.component";
import {PostInputComponent} from "../components/post-input.component";
import {ZoneEditorComponent} from "../components/zone-editor.component";
import {StreamService} from "../services/stream.service";
import {UserService} from "../services/user.service";
import {AppSharedService} from "../shared_services/app.shared_service";
import {AuthSharedService} from "../shared_services/auth.shared_service";

@Component({
  selector: "my-stream",
  templateUrl: "views/stream.html",
  directives: [
    PostInputComponent,
    PostComponent,
    ZoneEditorComponent
  ],
  providers: [
    UserService
  ]
})
export class StreamComponent implements OnInit {

  // タイムラインの投稿を保持
  // TODO: 複数のタイムラインになった場合のことを検討する
  posts: Post[] = [];

  // 投稿スコープ
  postScope: Stream[];

  // このストリームコンポーネントのストリームモデル
  stream: Stream;

  //
  @ViewChild("zoneEditor") zoneEditor: ElementRef;
  @ViewChild("postInput") postInput: ElementRef;

  constructor(
    private data: RouteData,
    private params: RouteParams,
    private router: Router,
    private userService: UserService,
    private injector: Injector,
    private streamService: StreamService,
    private appSharedService: AppSharedService,
    private authSharedService: AuthSharedService
  ) {}


  ngOnInit() {
    // TODO: 既存のタイムラインの読み込み

    console.log("--> initialize --> stream component");

    // このストリームで使用する
    this.stream = this.appSharedService.stream;

  }

  // 新しいポストが追加された
  // TODO: onNewPost にメソッド名を変更する
  newPost($event) {

    // ログインチェック
    if ( this.authSharedService.isLogin() ) {

      // 誰が投稿したか
      const user: User = this.authSharedService.getLoginUser();

      // 新しいpost
      const post: Post = $event.post;

      // 投稿の投稿者を変更しコピー
      const mixedPost: Post = post.copyWithUser(user);

      console.log("--> 新しいポストが投稿された", mixedPost);

      // タイムラインに追加
      this.posts.unshift(mixedPost);
    }

    // ログインしていない
    else {
      // TODO: エラーメッセージをServiceにまとめる
      alert("投稿するにはログインしてください");
    }
  }

  // ゾーンエディタを開く
  openZoneEditor () {
    console.log("--> event emit -> open zone editor");
    this.zoneEditor["openModal"]();
  }

  // PostInputのゾーンの再描画
  renderPostInputZone() {
    this.postInput["renderPostInputZone"]();
  }

}
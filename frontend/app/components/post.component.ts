"use strict";
import {Component, OnInit, Input, ViewChild, ElementRef, Renderer, Output, EventEmitter} from "angular2/core";
import {Router} from "angular2/router";
import {AnimationBuilder} from "angular2/src/animate/animation_builder";
import {Animation} from "angular2/src/animate/animation";
import {Post} from "../models/post";
import {Comment} from "../models/comment";
import {CommentComponent} from "../components/comment.component";
import {AppSharedService} from "../shared_services/app.shared_service";
import {AuthSharedService} from "../shared_services/auth.shared_service";
import {MessagePipe} from "../pipes/message.pipe.ts";
import {TimeAgoPipe} from "../pipes/time_ago.pipe.ts";
import {User} from "../models/user";

// 投稿ポストのコンポーネント
@Component({
  selector: "post",
  templateUrl: "views/post.html",
  directives: [ CommentComponent ],
  pipes: [
    MessagePipe,
    TimeAgoPipe
  ]
})

export class PostComponent implements OnInit {

  // 表示する投稿
  post: Post;
  @Input() post: Post;
  private animation: Animation;

  // ViewChild
  @ViewChild("target") target: ElementRef;
  @ViewChild("commentTextarea") commentTextarea: ElementRef;

  // @Output() onSendComment = new EventEmitter();

  // コメント投稿が閉じられている状態か
  isOpenComment: boolean;

  // 新規コメント
  comment: Comment;

  constructor(
    private animate: AnimationBuilder,
    private renderer: Renderer,
    private router: Router,
    private appSharedService: AppSharedService,
    private authSharedService: AuthSharedService
  ) {
    this.isOpenComment = false;
  }


  ngOnInit() {

    // 新規投稿するコメント
    this.comment = new Comment;
    if ( this.authSharedService.isLogin() ) {
      const user: User = this.authSharedService.getLoginUser();
      this.comment.user = user;
    }

  }

  // 投稿が表示された
  ngAfterViewInit() {
    this.animationInitialize();
    setTimeout(() => {  this.animationStart();  } , 0);
  }

  // アニメーションの初期化
  animationInitialize() {
    const height = this.target.nativeElement.clientHeight;
    this.renderer.setElementStyle(this.target.nativeElement, "margin-top", "-"+height+"px");
    this.renderer.setElementStyle(this.target.nativeElement, "opacity", "0");
    this.renderer.setElementStyle(this.target.nativeElement, "transition-duration", null);
  }

  // アニメーションのリセット
  animationReset() {
    this.animation = null;
    this.renderer.setElementStyle(this.target.nativeElement, "transition-duration", null);
    this.renderer.setElementStyle(this.target.nativeElement, "opacity", "1");
    this.renderer.setElementStyle(this.target.nativeElement, "margin-top", "0");
  }

  // アニメーションの開始
  animationStart() {
    if (this.animation) {
      return;
    }
    this.animation = this.animate.css()
      .setToStyles({
        "opacity": "0.3",
        "margin-top": "5"
      })
      .setDuration(300)
      .start(this.target.nativeElement)
      .onComplete(() => {

        this.animate.css()
          .setToStyles({
            "opacity": "1",
            "margin-top": "0"
          })
          .setDuration(300)
          .start(this.target.nativeElement)
          .onComplete(() => {
            this.animationReset();
          });
      });
  }

  // コメントの投稿
  sendComment() {

    // メッセージが入力されていない
    if ( !this.post.message ) {
      return;
    }

    // ログインチェック
    if ( this.authSharedService.isLogin() ) {

      // 誰が投稿したか
      const user: User = this.authSharedService.getLoginUser();

      // 新しいコメント
      const comment: Comment = _(this.comment).clone();

      // 投稿の投稿者を変更しコピー
      const mixedComment: Comment = comment.copyWithUser(user);

      // タイムラインに追加
      this.post.comments.push(mixedComment);
    }


    // 親にイベントを伝達する
    // this.onSendComment.emit({
    //   comment: this.comment
    // });

    // 投稿フォームを消す
    this.comment = new Comment;
    setTimeout(() => {
      this.comment = new Comment;
    }, 0);
    setTimeout(() => {
      this.comment = new Comment;
    }, 1);
    setTimeout(() => {
      this.comment = new Comment;
    }, 2);
    setTimeout(() => {
      this.comment = new Comment;
    }, 3);
    setTimeout(() => {
      this.comment = new Comment;
    }, 4);
    setTimeout(() => {
      this.comment = new Comment;
    }, 5);


  }

  // コメントが開いた
  openComment () {
    this.isOpenComment = true;
    _.defer(() => this.commentTextarea.nativeElement.focus() );
  }

  // テキストエリアでキーダウン
  // TODO: Service
  onInputAreaKeydown($event) {
    const isActKey = $event.ctrlKey || $event.shiftKey || $event.metaKey || $event.altKey;
    const isEnter = $event.keyCode === 13;
    if ( isActKey && isEnter ) {
      this.sendComment();
    }
  }

  // 新規コメントが押されたボタンのイベント
  onSendComment() {
    this.sendComment();
  }

}
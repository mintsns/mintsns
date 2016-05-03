import {Component, OnInit, Input, Output, ElementRef, ViewChild, Renderer} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observable} from "rxjs/Observable";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { StreamComponent } from './components/stream.component';
import {StreamService} from "./services/stream.service";
import { User } from "./models/user";
import { Stream } from "./models/stream";
import { UserService } from "./services/user.service";

import { AppSharedService } from "./shared_services/app.shared_service";
import { AuthSharedService } from "./shared_services/auth.shared_service";

import { AnimationBuilder } from 'angular2/src/animate/animation_builder';
import { Animation } from 'angular2/src/animate/animation';

@Component({
    selector: 'my-app',
    templateUrl: "views/layout.html",

    // 他から引っ張ってきたときはここで宣言をする
    directives: [
        ROUTER_DIRECTIVES
    ],
    
    providers: [
        StreamService,
        UserService,
        ROUTER_PROVIDERS
    ]
})

@RouteConfig([
  {
    path: '/stream',
    name: 'Stream',
    component: StreamComponent,
    data: {
      "counter": false
    },
    useAsDefault: true
  }
])



export class AppComponent implements OnInit {



  // サービス名
  title: String;

  // ログインユーザー
  user: User;

  // 現在のストリーム
  stream: Stream;

  // ストリームリスト
  streams: Stream[];

  // 表示領域のストリームリスト
  viewStreams: Stream[];

  private animation: Animation;
  @ViewChild("target") target: ElementRef;

  constructor(
    private userService: UserService,
    private streamService: StreamService,
    private appSharedService: AppSharedService,
    private authSharedService: AuthSharedService,
    private animate: AnimationBuilder,
    private renderer: Renderer,
  ) { }

  // 初期化
  ngOnInit() {

    this.title = "Mint SNS";

    // ログインチェック
    if ( this.authSharedService.isLogin() ) {

      // ログインユーザーの取得
      const user: User = this.authSharedService.getLoginUser();
      this.user = user;

      // ストリームリストの取得
      this.streams = [
        { id: 0, name: "ホーム" },
        { id: 1, name: "お気に入り" },
        { id: 2, name: "車" },
        { id: 3, name: "ゲーム" },
        { id: 4, name: "マンガ" },
        { id: 5, name: "ゴルフ" },
        { id: 6, name: "パソコン" },
        { id: 7, name: "プログラミング" }
      ];

      // 現在のストリーム
      this.stream = this.streams[0];

      // ホームに設定
      this.viewStreams = this.streamService.getHeaderViewStreams(this.streams, this.stream);

    }
  }

  ngAfterViewInit() {
    // this.animationInitialize();
    // setTimeout(() => {  this.animationStart();  } , 0);
  }
  
  onClickPrevStream() {
    this.stream = this.streamService.getPrevViewStream(this.streams, this.stream);
    this.headerAnimationPrevStart().then( () => {
      this.viewStreams = this.streamService.getHeaderViewStreams(this.streams, this.stream);
    } );
  }
  
  onClickNextStream() {
    this.stream = this.streamService.getNextViewStream(this.streams, this.stream);
    this.headerAnimationNextStart().then( () => {
      this.viewStreams = this.streamService.getHeaderViewStreams(this.streams, this.stream);
    } );
  }

  headerAnimationInitialize() {
    const height = this.target.nativeElement.clientHeight;
    this.renderer.setElementStyle(this.target.nativeElement, "margin-top", "-"+height+"px");
    this.renderer.setElementStyle(this.target.nativeElement, "opacity", "0");
    this.renderer.setElementStyle(this.target.nativeElement, "transition-duration", null);
  }


  headerAnimationReset() {
    this.animation = null;
    this.renderer.setElementStyle(this.target.nativeElement, "transition-duration", null);
    this.renderer.setElementStyle(this.target.nativeElement, "margin-left", "0");
  }

  headerAnimationPrevStart(): Promise<void> {
    return new Promise<void>(
      resolve => {

        if (this.animation) {
          resolve();
          return;
        }
        this.animation = this.animate.css()
          .setToStyles({
            "margin-left": "100px"
          })
          .setDuration(300)
          .start(this.target.nativeElement)
          .onComplete(() => {
            resolve();
            this.animation = null;
            this.headerAnimationReset();
          });

      }
    );
  }

  headerAnimationNextStart(): Promise<void> {
    return new Promise<void>(
      resolve => {

        if (this.animation) {
          resolve();
          return;
        }
        this.animation = this.animate.css()
          .setToStyles({
            "margin-left": "-100px"
          })
          .setDuration(300)
          .start(this.target.nativeElement)
          .onComplete(() => {
            resolve();
            this.animation = null;
            this.headerAnimationReset();
          });

      }
    );
  }
  
}
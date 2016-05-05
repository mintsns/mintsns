import {Component, OnInit, ElementRef, ViewChild, Renderer} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router, RouteParams} from "angular2/router";
import {StreamComponent} from "./components/stream.component";
import {StreamService} from "./services/stream.service";
import {User} from "./models/user";
import {Stream} from "./models/stream";
import {UserService} from "./services/user.service";
import {AppSharedService} from "./shared_services/app.shared_service";
import {AuthSharedService} from "./shared_services/auth.shared_service";
import {AnimationBuilder} from "angular2/src/animate/animation_builder";
import {Animation} from "angular2/src/animate/animation";

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
    useAsDefault: true
  },
  {
    path: '/stream/:id',
    name: 'CustomStream',
    component: StreamComponent,
    useAsDefault: false
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
    private router: Router
  ) {

    // ページ遷移時のイベント
    this.listenRouter();

  }

  // 初期化
  ngOnInit() {

    this.title = "Mint SNS";

    // ログインチェック
    if ( this.authSharedService.isLogin() ) {

      // ログインユーザーの取得
      const user: User = this.authSharedService.getLoginUser();
      this.user = user;

      // URLから現在のストリームを取得
      this.appSharedService.stream = this.appSharedService.getCurrentStreamWithUrl();

      // ストリームリストの取得
      this.streams = this.appSharedService.streams;

      // 現在のストリーム
      this.stream = this.appSharedService.stream;

      // ビューストリームの取得
      this.viewStreams = this.streamService.getHeaderViewStreams(this.streams, this.stream);

    }
  }
  
  ngOnChange () {
    console.log("--> change page");
  }

  // ルーターの変更を監視
  listenRouter() {
    this.router.subscribe( url => {
      this.renderStreamChanger( this.getStreamIdWithUrl(url) );
    });
  }

  // URLからIDを取得
  getStreamIdWithUrl (url): number {
    const match = url.match(/^stream\/(.+)$/);
    const id = match ? url.match(/^stream\/(.+)$/)[1] : null;
    return Number(id);
  }

  // ストリームチェンジャーの描画
  renderStreamChanger(id: number) {

    const prevStream = this.streamService.getPrevViewStream(this.streams, this.stream);
    const nextStream = this.streamService.getNextViewStream(this.streams, this.stream);

    if ( id ) {
      this.stream = this.appSharedService.stream = _(this.appSharedService.streams).find({ id: Number(id) });
    }
    else {
      this.stream = this.appSharedService.stream = this.appSharedService.homeStream;
    }

    if ( prevStream === this.stream ) {
      this.headerAnimationPrevStart().then( () => {
        this.viewStreams = this.streamService.getHeaderViewStreams(this.streams, this.stream);
      });

    }
    else if (nextStream === this.stream) {
      this.headerAnimationNextStart().then(() => {
        this.viewStreams = this.streamService.getHeaderViewStreams(this.streams, this.stream);
      });
    } else {
      this.viewStreams = this.streamService.getHeaderViewStreams(this.streams, this.stream);
    }
  }

  // ストリームチェンジャーで前のボタンを押した
  onClickPrevStream() {
    this.stream = this.streamService.getPrevViewStream(this.streams, this.stream);
    this.headerAnimationPrevStart().then( () => {
      this.viewStreams = this.streamService.getHeaderViewStreams(this.streams, this.stream);
      
      // 現在表示されているストリームの変更
      this.appSharedService.stream = this.stream;

      // ルーティングの変更
      this.streamService.navigateStream(this.router, this.stream);

      
    } );
  }

  // ストリームチェンジャーで次のボタンを押した
  onClickNextStream() {
    this.stream = this.streamService.getNextViewStream(this.streams, this.stream);
    this.headerAnimationNextStart().then( () => {
      this.viewStreams = this.streamService.getHeaderViewStreams(this.streams, this.stream);

      // 現在表示されているストリームの変更
      this.appSharedService.stream = this.stream;

      // ルーティングの変更
      this.streamService.navigateStream(this.router, this.stream);

    } );
  }

  // ストリームチェンジャーのアニメーションをリセット
  headerAnimationReset() {
    this.animation = null;
    this.renderer.setElementStyle(this.target.nativeElement, "transition-duration", null);
    this.renderer.setElementStyle(this.target.nativeElement, "margin-left", "0");
  }

  // ストリームチェンジャーが前へ移動時のアニメーション
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

  // ストリームチェンジャーが次へ移動時のアニメーション
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
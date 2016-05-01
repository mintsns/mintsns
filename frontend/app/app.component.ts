import {Component, OnInit, Input, Output} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {Hero} from "./hero";
import {HeroDetailComponent} from "./hero-detail.component";
import {HeroService} from "./hero.service";
import { TimelineComponent } from './components/timeline.component';
import { HeroesComponent } from './heroes.component';
import {TimelineService} from "./services/timeline.service";
import { User } from "./models/user";
import { UserService } from "./services/user.service";

import { AppSharedService } from "./shared_services/app.shared_service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'my-app',
    templateUrl: "views/layout.html",

    // 他から引っ張ってきたときはここで宣言をする
    directives: [
        HeroDetailComponent,
        ROUTER_DIRECTIVES
    ],
    
    providers: [
        TimelineService,
        HeroService,
        UserService,
        ROUTER_PROVIDERS
    ]
})

@RouteConfig([
  {
    path: '/timeline',
    name: 'Timeline',
    component: TimelineComponent,
    data: {
      "counter": false
    },
    useAsDefault: true
  },
  {
    path: '/detail/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  }
])
export class AppComponent implements OnInit {

  // サービス名
  title = "mintsns";

  // 使ってない
  hero: Hero = {
      id: 1,
      name: "Windstorm",
  };

  // ログインユーザー
  loginUser: User;

  @Input() loginUser: User;
  @Output() loginUser: User;

  // ユーザーキャッシュ
  users: User[] = [];

  public hoge: string;

  // 実験中
  hige: Observable<number>;

  constructor(
    private userService: UserService,
    private appSharedService: AppSharedService
  ) { }

  // 初期化
  ngOnInit() {

    // 実験中
    this.hige = this.appSharedService.counter;

    // ログインユーザー
    this.loginUser = {
      id: 1,
      name: "mintsns",
      iconUrl: "../images/samples/icons/niconico_seiga_im3861359.jpeg",
      iconUrlLarge: "../images/samples/icons/niconico_seiga_im3861359.jpeg",
      iconUrlMedium: "../images/samples/icons/niconico_seiga_im3861359.jpeg",
      iconUrlSmall: "../images/samples/icons/niconico_seiga_im3861359.jpeg",
      isMe: true,
      email: "",
      password: ""
    };

    // ログインしていることにする
    this.userService.setLogin(true);


    this.hoge = "hoge";


  }

  // カウンターテスト
  @Input() counter: Observable<number>;
  private counter = new Observable<number>((observer) => {
    let i = 0;
    observer.next(i);
    setInterval(()=>{
      observer.next(++i);
    }, 1000);
  });

}
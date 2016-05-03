import {Component, OnInit, Input, Output} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observable} from "rxjs/Observable";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { StreamComponent } from './components/stream.component';
import {StreamService} from "./services/stream.service";
import { User } from "./models/user";
import { UserService } from "./services/user.service";

import { AppSharedService } from "./shared_services/app.shared_service";
import { AuthSharedService } from "./shared_services/auth.shared_service";

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
  user: User;

  constructor(
    private userService: UserService,
    private appSharedService: AppSharedService,
    private authSharedService: AuthSharedService
  ) { }

  // 初期化
  ngOnInit() {

    this.title = "Mint SNS";

    // ログインチェック
    if ( this.authSharedService.isLogin() ) {
      const user: User = this.authSharedService.getLoginUser();
      this.user = user;
    }
  }
}
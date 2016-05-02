import {Component, OnInit, Input, Output} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observable} from "rxjs/Observable";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { TimelineComponent } from './components/timeline.component';
import {TimelineService} from "./services/timeline.service";
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
        TimelineService,
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
  }
])
export class AppComponent implements OnInit {

  // サービス名
  title = "mintsns";

  constructor(
    private userService: UserService,
    private appSharedService: AppSharedService,
    private authSharedService: AuthSharedService
  ) { }

  // 初期化
  ngOnInit() {
  }
}
import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {AppSharedService} from "./shared_services/app.shared_service";
import {AuthSharedService} from "./shared_services/auth.shared_service";

// 配列には 共有サービスを書く
bootstrap(AppComponent, [
  AppSharedService,
  AuthSharedService
]);
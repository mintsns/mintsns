import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {AppSharedService} from "./shared_services/app.shared_service";

bootstrap(AppComponent, [AppSharedService]);
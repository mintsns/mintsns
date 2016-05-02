import { Component, OnInit, Input, Injector } from 'angular2/core';
import { Router, RouteParams, RouteData} from 'angular2/router';
import { Post } from '../models/post';
import { User } from '../models/user';

import { TimelineService } from '../services/timeline.service';
import { PostComponent } from "../components/post.component";
import { PostInputComponent } from "../components/post_input.component";
import { UserService } from "../services/user.service";

import { AppSharedService } from "../shared_services/app.shared_service";
import { AuthSharedService } from "../shared_services/auth.shared_service";

import {Observable} from "rxjs/Observable";

@Component({
  selector: "my-timeline",
  templateUrl: "views/timeline.html",
  directives: [
    PostInputComponent,
    PostComponent
  ],
  providers: [
    UserService
  ],
})
export class TimelineComponent implements OnInit {

  posts: Post[] = [];
  loginUser: User;

  constructor(
    private data: RouteData,
    private params: RouteParams,
    private router: Router,
    private timelineService: TimelineService,
    private userService: UserService,
    private injector: Injector,
    private appSharedService: AppSharedService,
    private authSharedService: AuthSharedService
  ) {}

  @Input() loginUser: User;

  ngOnInit() {

    // 既存のタイムラインの読み込み
    this.timelineService.getPosts()
      .then(posts => {
        this.posts = [];
      });

  }

  // 新しいポストが追加された
  newPost($event) {

    // 誰が投稿したか
    //const user: User =
    debugger;

    // 新しいpost
    const post: Post = $event.post;
    console.log("--> 新しいポストが投稿された");

    // タイムラインに追加
    this.posts.push(post);

  }
}
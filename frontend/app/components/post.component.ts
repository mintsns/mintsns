import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Post } from '../models/post';
import { TimelineService } from '../services/timeline.service';

@Component({
  selector: "post",
  templateUrl: "views/post.html",
})
export class PostComponent implements OnInit {

  posts: Post[] = [];

  constructor(
    private _router: Router,
    private _timelineService: TimelineService) {
  }

  ngOnInit() {
    this._timelineService.getPosts()
      .then(posts => this.posts = posts.slice(1,5));
  }

  gotoDetail(post: Post) {
    let link = ['HeroDetail', { id: post.id }];
    this._router.navigate(link);
  }
}
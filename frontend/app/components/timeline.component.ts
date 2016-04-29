import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Post } from '../models/post';
import { TimelineService } from '../services/timeline.service';

@Component({
  selector: "my-timeline",
  templateUrl: "views/timeline.html",
  // template: `
  //   <h3>Top Heroes</h3>
  //   <div>
  //       <div *ngFor="let post of posts" (click)="gotoDetail(post)">
  //           <div>
  //               <h4>{{post.name}}</h4>
  //           </div>
  //       </div>
  //   </div>
  // `
})
export class TimelineComponent implements OnInit {

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
import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Post } from '../models/post';
import { TimelineService } from '../services/timeline.service';
import { CommentComponent } from "../components/comment.component";

// 投稿ポストのコンポーネント
@Component({
  selector: "post",
  templateUrl: "views/post.html",
  directives: [ CommentComponent ]
})
export class PostComponent implements OnInit {

  post: Post = new Post;

  constructor(
    private router: Router,
    private timelineService: TimelineService
  ) {}

  ngOnInit() {
    this.post.message = "test";
  }

}
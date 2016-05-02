import {Component, OnInit, Input} from 'angular2/core';
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

  // 表示する投稿
  post: Post;
  @Input() post: Post;

  constructor(
    private router: Router
  ) {}


  ngOnInit() {
  }

}
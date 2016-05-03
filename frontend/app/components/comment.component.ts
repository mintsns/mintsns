"use strict";
// コメントコンポーネント
import { Component, OnInit, Input } from 'angular2/core';
import { Router } from 'angular2/router';

import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { StreamService } from '../services/stream.service';

@Component({
  selector: "comment",
  templateUrl: "views/comment.html",
})

export class CommentComponent implements OnInit {

  comment: Comment;
  @Input() comment: Comment;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
  }

}
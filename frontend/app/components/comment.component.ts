"use strict";
// コメントコンポーネント
import {Component, OnInit, Input} from "angular2/core";
import {Router} from "angular2/router";
import {Comment} from "../models/comment";
import {MessagePipe} from "../pipes/message.pipe.ts";
import {TimeAgoPipe} from "../pipes/time_ago.pipe.ts";

@Component({
  selector: "comment",
  templateUrl: "views/comment.html",
  pipes: [
    MessagePipe,
    TimeAgoPipe
  ]
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
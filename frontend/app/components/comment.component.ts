import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Post } from '../models/post';
import { TimelineService } from '../services/timeline.service';

@Component({
  selector: "comment",
  templateUrl: "views/comment.html",
})
export class CommentComponent implements OnInit {

  constructor(
    private _router: Router
  )

  ngOnInit() {
  }

}
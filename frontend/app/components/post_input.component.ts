import { Component, OnInit, Output, EventEmitter } from 'angular2/core';
import { Router } from 'angular2/router';
import { Post } from '../models/post';
import { CommentComponent } from "../components/comment.component";
import { TimelineService } from '../services/timeline.service';


// 投稿入力欄のコンポーネント
@Component({
  selector: "post-input",
  templateUrl: "views/post_input.html"
})
export class PostInputComponent implements OnInit {

  // 新規ポスト
  post: Post = new Post;

  // 新規ポストが押されたイベント
  @Output() newPost = new EventEmitter();

  constructor(
    private router: Router
  ) {}

  // 初期化
  ngOnInit() {
  }

  // 新規投稿が押されたボタンのイベント
  onSendPost($event) {
    this.newPost.emit(this.post);
  }

}
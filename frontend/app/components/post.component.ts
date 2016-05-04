"use strict";
import {Component, OnInit, Input, ViewChild, ElementRef, Renderer} from "angular2/core";
import {Router} from "angular2/router";
import {AnimationBuilder} from "angular2/src/animate/animation_builder";
import {Animation} from "angular2/src/animate/animation";
import {Post} from "../models/post";
import {CommentComponent} from "../components/comment.component";
import {MessagePipe} from "../pipes/message.pipe.ts";

// 投稿ポストのコンポーネント
@Component({
  selector: "post",
  templateUrl: "views/post.html",
  directives: [ CommentComponent ],
  pipes: [
    MessagePipe
  ]
})

export class PostComponent implements OnInit {

  // 表示する投稿
  post: Post;
  @Input() post: Post;
  private animation: Animation;
  @ViewChild("target") target: ElementRef;


  constructor(
    private animate: AnimationBuilder,
    private renderer: Renderer,
    private router: Router
  ) {}


  ngOnInit() {
  }

  ngAfterViewInit() {
    this.animationInitialize();
    setTimeout(() => {  this.animationStart();  } , 0);
  }

  animationInitialize() {
    const height = this.target.nativeElement.clientHeight;
    this.renderer.setElementStyle(this.target.nativeElement, "margin-top", "-"+height+"px");
    this.renderer.setElementStyle(this.target.nativeElement, "opacity", "0");
    this.renderer.setElementStyle(this.target.nativeElement, "transition-duration", null);
  }


  animationReset() {
    this.animation = null;
    this.renderer.setElementStyle(this.target.nativeElement, "transition-duration", null);
    this.renderer.setElementStyle(this.target.nativeElement, "opacity", "1");
    this.renderer.setElementStyle(this.target.nativeElement, "margin-top", "0");
  }

  animationStart() {
    if (this.animation) {
      return;
    }
    this.animation = this.animate.css()
      .setToStyles({
        "opacity": "0.3",
        "margin-top": "5"
      })
      .setDuration(300)
      .start(this.target.nativeElement)
      .onComplete(() => {

        this.animate.css()
          .setToStyles({
            "opacity": "1",
            "margin-top": "0"
          })
          .setDuration(300)
          .start(this.target.nativeElement)
          .onComplete(() => {
            this.animationReset();
          });
      });
  }
}
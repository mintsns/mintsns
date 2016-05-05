"use strict";
import {AnimationBuilder} from "angular2/src/animate/animation_builder";
import {Animation} from "angular2/src/animate/animation";
import { NgForm }    from 'angular2/common';

// ゾーンエディタコンポーネント
import {Component, OnInit, Input, ViewChild, ElementRef, Renderer} from "angular2/core";
import {AppSharedService} from "../shared_services/app.shared_service";
import {Stream} from "../models/stream";

@Component({
  selector: "zone-editor",
  templateUrl: "views/zone-editor.html",
})

export class ZoneEditorComponent implements OnInit {

  private animation: Animation;
  private stream: Stream;
  private streams: Stream[];
  @ViewChild("target") target: ElementRef;
  @ViewChild("form") form: ElementRef;

  constructor(
    private appSharedService: AppSharedService
  ) {}



  ngOnInit() {

    // コピーする
    this.streams = _(_.clone(this.appSharedService.streams))
      .tap((streams: Stream[]) => streams.unshift( _.clone(this.appSharedService.yourZoneStream) ) )
      .tap((streams: Stream[]) => streams.unshift( _.clone(this.appSharedService.publicStream) ) )
      .value();
    this.stream = Object.assign(this.appSharedService.stream);

    const homeIndex = _(this.streams).findIndex(this.appSharedService.homeStream);
    if (homeIndex) {
      this.streams.splice( homeIndex, 1 );
    }

    // 現在のストリームのポストスコープにストリームが含まれている場合、は true を代入
    _(this.streams).each((stream: Stream) => {
      stream.isIncludedPostScope = !!_(this.stream.postScope).find(stream);
    });

  }

  ngAfterViewInit(){
    this.openModal();
  }

  // モーダルを開く
  openModal () {
    this.ngOnInit();
    if (this.target) {
      const clientHeight = $(window).height();
      this.target.nativeElement.style.display = "block";
      const modalWindow = $(this.target.nativeElement).find(".modal-window");
      const modalHeight = modalWindow.height();
      modalWindow.css("top", ( (clientHeight - modalHeight)/2 )+"px");
    }
    else {
      throw new Error("not found target");
    }
  }

  // モーダルを閉じる
  onClickDisableModal () {
    this.target.nativeElement.style.display = "none";
  }

  // 保存
  onSubmit() {
    this.target.nativeElement.style.display = "none";
  }

  // ストリームの追加
  onClickAddStream() {
    alert("この機能は  v0.5 で実装予定です。");
  }

  // ストリ―ムの削除
  removeStream(stream: Stream) {
    alert("この機能は  v0.6 で実装予定です。");
  }

  //
  onChangeScopeStream(stream: Stream) {


    setTimeout(() => {

      const isCheck = _(this.streams).find(stream).isIncludedPostScope;

      if (stream.isPublic && isCheck) {

        _(this.streams)
          .filter((stream: Stream) => !stream.isPublic )
          .each((stream: Stream) => { stream.isIncludedPostScope = false;} );
      }

      else if (stream.isYourZone && isCheck) {
        _(this.streams)
          .filter((stream: Stream) => !stream.isYourZone )
          .each((stream: Stream) => { stream.isIncludedPostScope = false; } );
      }
      else if (isCheck) {
        _(this.streams)
          .filter((stream: Stream) => stream.isPublic || stream.isYourZone )
          .each((stream: Stream) => { stream.isIncludedPostScope = false; } );
      }

    }, 5);





  }

}
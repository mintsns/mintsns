"use strict";
import {AnimationBuilder} from "angular2/src/animate/animation_builder";
import {Animation} from "angular2/src/animate/animation";
import { NgForm }    from 'angular2/common';
import { OrCondition } from "../models/or_condition";
import { Condition } from "../models/condition";
import { StreamZone } from "../models/stream_zone";

// ゾーンエディタコンポーネント
import {Component, OnInit, Input, ViewChild, ElementRef, Renderer, EventEmitter, Output} from "angular2/core";
import {AppSharedService} from "../shared_services/app.shared_service";
import {Stream} from "../models/stream";

@Component({
  selector: "zone-detail-editor",
  templateUrl: "views/zone-detail-editor.html",
})

export class ZoneDetailEditorComponent {

  private isOpenModal: boolean;
  private animation: Animation;
  private stream: Stream;
  private streams: Stream[];
  @ViewChild("target") target: ElementRef;
  @ViewChild("form") form: ElementRef;
  @Output() onRenderZone = new EventEmitter();

  private orConditions: OrCondition[] = [];

  constructor(
    private appSharedService: AppSharedService
  ) {}

  ngOnInit(stream: Stream) {
    if (stream) {

      // 編集対象のストリームを選択
      this.stream = _.clone(_(this.appSharedService.streams).find((targetStream) => {
        return targetStream.id === stream.id;
      }));

      // 条件を読みだす
      const zone: StreamZone = this.stream.zone;
      this.orConditions = _(zone.conditions).clone();

    }

    // ダミー
    // TODO: あとでnullでもエラーにならないようにする
    else {
      this.stream = _.clone(this.appSharedService.stream);
    }
  }

  ngAfterViewInit(){
    // this.openModal();
  }

  // モーダルを開く
  openModal (stream: Stream) {

    this.isOpenModal = true;

    this.ngOnInit(stream);
    if (this.target) {

      $(this.target.nativeElement).find(".modal-window").css({
        "width": "500px",
        "height": "340px"
      });

      const clientWidth = $(window).width();
      const clientHeight = $(window).height();
      this.target.nativeElement.style.display = "block";
      const modalWindow = $(this.target.nativeElement).find(".modal-window");
      const modalWidth = modalWindow.width();
      const modalHeight = modalWindow.height();
      modalWindow.css("left", ( (clientWidth - modalWidth)/2 )+"px");
      modalWindow.css("top", ( (clientHeight - modalHeight)/2 )+"px");
      modalWindow.css("margin-left", "0");
      $(this.target.nativeElement).find(".modal-body").css("height", "194px");
    }
    else {
      throw new Error("not found target");
    }
  }

  // モーダルを閉じる
  onClickDisableModal () {
    this.isOpenModal = false;
    this.target.nativeElement.style.display = "none";
  }

  // 保存
  onSubmit() {
    this.target.nativeElement.style.display = "none";

    // 条件の保存
    this.stream.zone.conditions = this.orConditions;

  }

  // ストリームの追加
  onClickAddStream() {
    alert("この機能は  v0.5 で実装予定です。");
  }

  // ストリ―ムの削除
  removeStream(stream: Stream) {
    alert("この機能は  v0.6 で実装予定です。");
  }

  // スコープが変更された
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

  // OR条件の追加
  onClickAddOrCondition() {
    this.orConditions.push(
      _(new OrCondition())
        .tap( (orCondition: OrCondition) => {
          orCondition.conditions = [
            {
              id: 0,
              name: "",
              conditionType: 0,
              value: 1
            }
          ];
        } ).value()
    );
    _.defer(() => {
      const modalBody = $(this.target.nativeElement).find(".modal-body");
      modalBody.scrollTop( modalBody.get(0).scrollHeight );
    });

  }
  
  // AND条件の追加
  onClickAddConditionWithOrCondition(orCondition: OrCondition, index: number) {
    _(orCondition)
      .tap( (orCondition: OrCondition) => {
        orCondition.conditions.splice(
          index+1, 0, {
            id: 0,
            name: "",
            conditionType: 0,
            value: 1
          }
        );
      } ).value();

    _.defer(() => {
      const modalBody = $(this.target.nativeElement).find(".modal-body");
      modalBody.scrollTop( modalBody.scrollTop() + 27 );
    });

  }

  // 条件をOrConditionから削除
  onClickRemoveCondition(orCondition: OrCondition, conditionIndex: number, orConditionIndex: number) {
    orCondition.conditions.splice( conditionIndex, 1 );
    if ( orCondition.conditions.length === 0 ) {
      this.orConditions.splice(orConditionIndex, 1);
    }
  }

  // OR条件を削除
  onClickRemoveOrCondition ( index: number ) {
    this.orConditions.splice( index, 1 );
  }

}
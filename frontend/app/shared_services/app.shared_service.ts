import {Observable} from 'rxjs/Observable';
import {Injectable} from 'angular2/core';
import { Stream } from "../models/stream";
import { StreamZone } from "../models/stream_zone";
import { Condition } from "../models/condition";
import { OrCondition } from "../models/or_condition";

@Injectable()
export class AppSharedService {

  // 現在作成されているストリームの一覧
  streams: Stream[];

  // 現在表示されているストリーム
  stream: Stream;

  // ホームストリーム
  homeStream: Stream;

  // パブリックストリーム
  // 投稿範囲として使用
  publicStream: Stream;

  // あなたのゾーンストリーム
  // 投稿範囲として使用
  yourZoneStream: Stream;

  constructor() {
    console.log("--> initialize --> appSharedService");

    // ストリームの読み込み
    this.streams = [
      { id: 0, name: "ホーム", zone: null, isPublic: false, isHome: true, isYourZone: false, postScope: [], useHomePostScope: false },
      { id: 1, name: "お気に入り", zone: { id: 0, name: "Public", conditions: [] }, isPublic: false, isHome: false, isYourZone: false, postScope: [], useHomePostScope: false  },
      { id: 2, name: "車", zone: { id: 0, name: "Public", conditions: [] }, isPublic: false, isHome: false, isYourZone: false, postScope: [], useHomePostScope: false  },
      { id: 3, name: "ゲーム", zone: { id: 0, name: "Public", conditions: [] }, isPublic: false, isHome: false, isYourZone: false, postScope: [], useHomePostScope: false  },
      { id: 4, name: "マンガ", zone: { id: 0, name: "Public", conditions: [] }, isPublic: false, isHome: false, isYourZone: false, postScope: [], useHomePostScope: false  },
      { id: 5, name: "ゴルフ", zone: { id: 0, name: "Public", conditions: [] }, isPublic: false, isHome: false, isYourZone: false, postScope: [], useHomePostScope: false  },
      { id: 6, name: "パソコン", zone: { id: 0, name: "Public", conditions: [] }, isPublic: false, isHome: false, isYourZone: false, postScope: [], useHomePostScope: false  },
      { id: 7, name: "プログラミング", zone: { id: 0, name: "Public", conditions: [] }, isPublic: false, isHome: false, isYourZone: false, postScope: [], useHomePostScope: false  }
    ];


    this.homeStream = this.streams[0]; // ホーム
    this.publicStream = { id: 0, name: "Public", zone: null, isPublic: true, isHome: false, isYourZone: false, postScope: [], useHomePostScope: false }; // ホーム
    this.yourZoneStream = { id: 0, name: "Your Zone", zone: null, isPublic: false, isHome: false, isYourZone: true, postScope: [], useHomePostScope: false };
    this.stream = this.streams[0]; // ホーム

    // スコープ設定
    this.homeStream.postScope = [
      this.publicStream,
      this.yourZoneStream,
      this.streams[2],
      this.streams[7]
    ];

  }

}
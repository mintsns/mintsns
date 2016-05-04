import {Stream} from "../models/stream";
import {Injectable} from "angular2/core";
import {Router} from "angular2/router";

@Injectable()
export class StreamService {


  // ヘッダーのストリームリストを取得する
  getHeaderViewStreams(streams: Stream[], currentStream: Stream) {
    const currentPos = _(streams).findIndex({ id: currentStream.id });
    const current = streams[currentPos];
    const next = streams[currentPos+1];
    const prev = streams[currentPos-1];
    const next2 = streams[currentPos+2];
    const prev2 = streams[currentPos-2];
    const first = streams[0];
    const first2 = streams[1];
    const last = streams[streams.length-1];
    const last2 = streams[streams.length-2];


    if ( next && prev && next2 && prev2 ) {
      return [
        prev2,
        prev,
        current,
        next,
        next2
      ]
    }
    else if ( prev && prev2 && first && first2 && last && current === last ) {
      return [
        prev2,
        prev,
        current,
        first,
        first2
      ]
    }
    else if ( prev && prev2 && first && last ) {
      return [
        prev2,
        prev,
        current,
        last,
        first
      ]
    }
    else if ( prev && prev2 && first && first2 ) {
      return [
        prev2,
        prev,
        current,
        first,
        first2
      ]
    }
    else if ( next && prev && !prev2 && next2 ) {
      return [
        last,
        prev,
        current,
        next,
        next2
      ]
    }
    else if ( next && prev && !prev2 ) {
      return [
        last,
        prev,
        current,
        next,
        { id: 0, name: "ホーム" }
      ]
    }
    else if ( next && prev ) {
      return [
        { id: 0, name: "ホーム" },
        prev,
        current,
        next,
        { id: 0, name: "ホーム" }
      ]
    }
    else if ( next && last && next2 && last2 ) {
      return [
        last2,
        last,
        current,
        next,
        next2
      ]
    }
    else if ( next && last ) {
      return [
        { id: 0, name: "ホーム" },
        last,
        current,
        next,
        { id: 0, name: "ホーム" }
      ]
    }
    else if ( current === last && streams.length === 2 ) {
      return [
        current,
        { id: 0, name: "ホーム" },
        current,
        { id: 0, name: "ホーム" },
        current,
      ]
    }
    else if ( current === last ) {
      return [
        { id: 0, name: "ホーム" },
        { id: 0, name: "ホーム" },
        current,
        { id: 0, name: "ホーム" },
        { id: 0, name: "ホーム" },
      ]
    }
    else {
      debugger;
      throw new Error("can't not match stream list");
    }

  }

  // 前のビューストリームを取得
  getPrevViewStream(streams: Stream[], currentStream: Stream) {
    const currentPos = _(streams).findIndex({ id: currentStream.id });
    const prev = streams[currentPos-1];
    const last = streams[streams.length-1];
    if (prev) {
      return prev;
    }
    else {
      return last;
    }
  }

  // 次のビューストリームを取得
  getNextViewStream(streams: Stream[], currentStream: Stream) {
    const currentPos = _(streams).findIndex({ id: currentStream.id });
    const next = streams[currentPos+1];
    const first = streams[0];
    if (next) {
      return next;
    }
    else {
      return first;
    }
  }

  // ストリームのページ遷移を行う
  navigateStream(router: Router, stream: Stream) {
    if ( stream.isHome ) {
      router.navigate(["Stream"]);
    }
    else {
      router.navigate(["CustomStream", {id: stream.id} ]);
    }
  }


}


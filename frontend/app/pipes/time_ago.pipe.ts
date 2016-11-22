"use strict";
import {Pipe, PipeTransform} from "angular2/core";


@Pipe({
  name: 'timeAgo',
  pure: false
})
export class TimeAgoPipe implements PipeTransform {

  transform(time: Date) {

    // ミリ秒の時間差
    let timeRange = (new Date()) - time;

    // 1秒以内
    if ( timeRange < 30000 ) {
      return "たった今";
    }

    // 1分以内
    else if ( timeRange < 60000 ) {
      return  "1分以内";
    }
    // 1時間以内
    else if ( timeRange < 60000 * 60 ) {
      return Math.round( timeRange / 1000 / 60 )+"分";
    }
    // 24時間以内
    else if ( timeRange < 60000 * 60 * 24 ) {
      return Math.round( timeRange / 1000 / 60 / 60 )+"時間";
    }
    // 日
    else {
      return Math.round( timeRange / 1000 / 60 / 60 / 24 )+"日";
    }
  }

};


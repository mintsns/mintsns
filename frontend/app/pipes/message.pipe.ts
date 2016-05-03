"use strict";
import {Pipe, PipeTransform} from 'angular2/core';


@Pipe({
  name: 'message',
  pure: false
})
export class MessagePipe implements PipeTransform {
  transform(message: String) {
    return message

      // secure escape
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")

      // font effect
      .replace(/\*([^\*]+)\*/g, "<strong>$1</strong>")

      // start new line escape
      .replace(/\n/g, "<br>")
      ;
  }

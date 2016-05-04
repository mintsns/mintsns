"use strict";
// ゾーンエディタコンポーネント
import { Component, OnInit, Input } from 'angular2/core';
import { Router } from 'angular2/router';

import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { StreamService } from '../services/stream.service';

@Component({
  selector: "zone-editor",
  templateUrl: "views/zone-editor.html",
})

export class ZoneEditorComponent implements OnInit {

  constructor(
  ) {}

  ngOnInit() {
  }

}
"use strict";
import {OrCondition} from "./or_condition";

// ゾーンモデル
export class StreamZone {
  id: number;
  name: string;
  conditions: OrCondition[]; // 二重配列 (1段目=OR条件 二段目=AND条件)
}
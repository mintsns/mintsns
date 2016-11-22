"use strict";
// ゾーン条件モデル
export class Condition {
  id: number;
  name: string;
  conditionType: number; // 0=以上 1=以下 2=除外
  value: number; // 数値
}
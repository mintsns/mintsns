"use strict";
import { Condition } from "./condition";
// ゾーン条件モデル
export class OrCondition {
  id: number;
  conditions: Condition[];
}
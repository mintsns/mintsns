# mintsns 設計仕様書

このドキュメントは、みんなで作るSNS『mintsns』のfixされた設計仕様書です。
このドキュメントを元に開発を進めていきます。
開発環境の構築については、ルートディレクトリにあるREADME.mdをお読みください。

## fixされていないそれ以外の資料置き場

権限ない方は、ハングアウトでメッセージ下さい
https://drive.google.com/drive/folders/0B6ilEvfUxQRiWXRubUExdVphYWs

## 開発のすすめ方

* タスク管理
  * タスク管理は [Wunderlist](https://www.wunderlist.com/webapp#/lists/inbox)にて行っています。こちらも招待するので連絡ください。
  * 優先度 #1 〜 #10 までの優先度をつけます。
  * \#infra   -- インフラタスク
  * \#idea    -- アイデアタスク
  * \#feature -- 機能
* 2つの Google ハングアウトで行う
    * mint cafe -- mintsns の関わるメンバー全員がjoinしているハングアウト
    * mint develop -- mintsnsの開発者のみのハングアウト
    * mint design -- デザイン専用
    * mint active -- mintsnsで今いる人だけの部屋（一時部屋）
* github issue
    * 基本的にバグ報告用に使います。
    * ここにあげられたissueに着手する場合は、Wunderlistにタスクを登録する **必要はありません**


## ドキュメントのプレフィックス
このドキュメントには所々にプレフィックスが出てきます。このプレフィックスによって意味が変わってくることがあるので、各所つけること。

 prefix      | description      
-------------|---------------------------------------------------------------
EXPERIMENTAL | 実験的な仕様検討段階にあるという意味。やるかもしれないし、やらないかもしれない
NOFIX        | FIXしていないことを明示的に示す
IDEA         | 提案をするときに使用
DEPRECATED   | 非推奨であることを示す
FIXME        | ドキュメント直してほしい
TODO         | 後で書く
NOTE         | 注釈
WARNING      | セキュリティリスクあるので気をつけてほしい

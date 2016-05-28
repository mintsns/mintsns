# KVS設計

Post と Comment に対して使用する

## キー設計

* キーセパレータ: |@∃⊥∃@|
* 日付とバージョンのセパレータ: |
* 設計
  * タイムスタンプ(ISO 8601)  `2001-08-02T10:45:23.5Z` UTC
  * キーバージョン(1)
  * サーバーノード(40桁のhex)
  * モデル(post|comment)
  * ハッシュ(post_hash|comment_hash)(40桁)
  * googleId(投稿元のgoogleid)
  * (public or limited)
  * オプトアウトフラグ(0/1)
  * ゾーン情報(括弧はセパレータ文字列※この文字列はzone_nameには使用できない)
     * zone_name(|∃∠⊥|)
     * [u,b,n]1(|⊥∠∃∠⊥∃|)
       * u = 以上
       * b = 以下
       * n = 除外
* ポイント
  * `2001-08-02T10:45:23.5Z|1|XXX` (| を 2 つ分まで分割する)
  * キーセパレータを使い XXX の部分を分割する
* 例
  * `2001-08-02T10:45:23.5Z|1|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX|@∃⊥∃@|post|@∃⊥∃@|YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY|@∃⊥∃@|0000000000000000|@∃⊥∃@|public|@∃⊥∃@|0|@∃⊥∃@|zone_name|∃∠⊥|u5|⊥∠∃∠⊥∃|`

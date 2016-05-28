# InfluxDB設計

時系列データベースを使用して、タイムラインを制御します。

## 使い方

### database一覧を表示
```
show databases
```

### データベースの変更
```
use <database_name>
```

### measurements(table)の一覧を表示
```
SHOW measurements
```

### クエリ実行
```
SELECT * FROM h2o_feet LIMIT 5
SELECT COUNT(water_level) FROM h2o_feet
select * from h2o_feet where water_level=2.064
```


## 時間設計

InfluxDBの仕様に従います。

## measurements 設計

measurements | 説明
-------------|-----------------------------
post         | 投稿


## measurements 詳細設計

### post 設計

field        | 説明
-------------|-----------------------------
v            | バージョン
n            | サーバーノード(40桁のhex)
m            | モデル(post)
h            | モデルハッシュコード(ポストハッシュコード)
uid          | googleの投稿主ユーザーID
pt           | 投稿タイプ ( 1=post 2=limited )
of           | オプトアウトフラグ (0/1)
zn_(条件名)   | ゾーン情報 (以上)
zb_(条件名)   | ゾーン情報 (以下)
zn_(条件名)   | ゾーン情報 (除外)



## ゾーン条件について
* OR条件の場合クエリを複数に分けてあとでマージします。
* AND条件の場合はひとつのクエリで実行します。
* 一度投稿をしてから、大元のゾーン設定を変更しても、投稿されたポストは、投稿された時点でのゾーン設定が適用されます。
  * ポストのゾーンは変更することができません

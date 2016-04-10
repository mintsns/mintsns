# モデル設計

## Post
* EXPERIMENTAL: dynamiteで管理する。

## User
* postgresで管理する。

## Notification
* postgresで管理する。通知は100件以上の古いものは破棄する

## Zone
* 設定値自体はpostgesで管理する
* 実際にこの設定値を使ってどのようなタイムラインを配信するかは、 dynamitesが決定する
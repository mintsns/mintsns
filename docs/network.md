# ネットワーク

## リアルタイム通信の実現について

できるだけ少ないコネクション数を維持しつつリアルタイム通信を実現する。このためにHTTP1での通信を遮断し、HTTP2
のみと通信を行う。  

## h2oによる高速通信

```
H2Oは現在ディー・エヌ・エーに勤める奥一穂氏を中心に、2014年から開発されているWebサーバー。プロジェクトの目的として、「クラウド、HTTP/2、常時TLS時代に最適化されたHTTPサーバーを目指す」としている。H2OはMITライセンスを採用したオープンソースプロダクトで、ソースコードはGitHubで公開されている。
```
[出典: Nginxより高速、HTTP/2サーバー「H2O」](http://www.atmarkit.co.jp/ait/articles/1512/08/news037.html)

### EXPERIMENTAL: nghttp2 の使用について

https://github.com/tatsuhiro-t/nghttp2

通信処理が要求される箇所は、上記ライブラリの使用を検討する

## staticファイルの配信
* staticファイルの配信はすべてh2oから行う。

## 認証、ドメインモデル
* ユーザーのログイン認証や、ドメインモデル等の管理は、`h2o -> django-rest-framework` で行う

## 処理速度が求められる部分について
* EXPERIMENTAL: `grpc --> go` で行う    

## 認証基盤
* redisで行う


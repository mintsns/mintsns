# 開発系コマンド

## extension

* HTTP2対応しているか調べるChrome拡張
[HTTP/2 and SPDY indicator](https://chrome.google.com/webstore/detail/http2-and-spdy-indicator/mpbpobfflnpcgagjijhmgnchggcjblin)

## docker-compose

### 事前準備
```
bash pre_download.sh
```

### サーバー起動
```
docker-compose kill && docker-compose up
```

### h2o 調整
```
docker-compose kill h2o && docker-compose build h2o && docker-compose create h2o && docker-compose start h2o
```

### IPを調べる
```
docker-machine ls 
```

## デバッグ用コマンド

### HTTP通信用
```
echo -en "GET / HTTP/1.1\n\n" | nc localhost 80
```

### nginx に入る
```
docker exec -it mintsns_nginx_1 /bin/bash
```

## フロントエンド

## 開発用サーバー

### ウェブサーバー
```
cd frontend
npm start
```
サーバーが起動したら、 `localhost:3000` にアクセスしてください

### css サーバー

```
cd frontend
npm run webpack
```

## ビルド
リリースする前に必ず実行してください

```
npm frontend
npm build
```
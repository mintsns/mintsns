# 開発系コマンド

## extension

* HTTP2対応しているか調べるChrome拡張
[HTTP/2 and SPDY indicator](https://chrome.google.com/webstore/detail/http2-and-spdy-indicator/mpbpobfflnpcgagjijhmgnchggcjblin)

## docker-compose

### 事前準備
```
bash pre_download.sh
```

### サーバー強制再起動
```
docker-compose kill && docker-compose up --remove-orphans
```

### h2o 調整
```
docker-compose kill h2o && docker-compose build h2o && docker-compose create h2o && docker-compose start h2o
```

### ウェブサーバー再起動

ビルドあり
```
docker-compose kill web && docker-compose build web && docker-compose create web && docker-compose start web
```

ビルドなし
```
docker-compose kill web && docker-compose start web
```

### DBマイグレーション(webが起動している状態で)
```
docker-compose exec web /usr/local/bin/python manage.py migrate
docker-compose exec web /usr/local/bin/python manage.py makemigrations mintsns
docker-compose exec web /usr/local/bin/python manage.py migrate
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
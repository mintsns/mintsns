# mintsnsとは？

## はじめに
mintsnsは、Google+ の住人が 改悪されていくGoogle＋に不満を持ち、過ごしやすいSNSを作ろうと思い立って開発を開始したプロジェクトです。
プロジェクトは2012年から始まり、Yammerで開発を進めていました。しかし、なかなか仕様設計の時間ばかりに時間を裂いてしまい、ほとんど開発ができないまま数年の時が流れました。
そして、2016年、やっと動き出しました。

## コンセプト
みんなで作るSNSがコンセプトです。 『Minna de Tsukuru SNS』 を無理やり訳して 『mintsns』となりました。
このコンセプトは今でも変わっていません。

## 2012年の設計 --> 地図
当初の設計では、仮想空間（地図）をSNS上に構築し、その空間を移動することによって、自分がいる場所に応じて、近くにいる人の発言がタイムラインに
流れてくるような設計でした。現在では変わっています。

## 2016年の設計 --> Google+ のサークルの概念を取り入れ
現在では、Google+のようなサークルの概念を取り入れることになりました。長い議論(長期的なまったりとした議論)で、サークルのような概念で
ゾーニングをうまくできないかということが検討され、ゾーニングを行うにあたり、その振り分けをプログラミングできるようにできれば良いということになりました。

## タグ付け
SNS利用者は、他の人からタグがつけられます。そのタグがその人の属性を表します。また、タグは自分で自分につけることも可能です。
タグには投票することが可能で、はじめにつけられたタグは必ず1ポイントあります。同じタグに二人の人が投票すれば、2ポイントあるということになります。
ポイントが高いほど、そのユーザーはそのタグの属性値が高いということになります。

## ゾーン(仮)
mintsnsのGoogle+のようなサークルの名称をゾーン(仮)と呼びます。ゾーンは、投稿を行う際に設定することができます。ゾーンは組み合わせることが出来、論理和や論理積、排他的論理和などで自動的に計算され、誰が投稿を見ることができるかを決定することが出来ます。

## ストリーム
Twitterのタイムラインのことです。このストリームは、時系列表示され、決して間引かれることはありません。  
また、ゾーンが限定された投稿は見ることができない場合があります。

## フォロー
ユーザーをフォロー設定することが出来、ストリームに流す事が出来ます。

## スマートストリーム
mintsnsには通常のストリームの他に、スマートストリームというものがあります。これはゾーンによって自動的にストリームに流す人を決めることができる機能です。
これは、ユーザーのタグを元に誰の投稿を流すかを決定します。ゾーンが限定された投稿は見ません。しかし、ゾーンが限定された投稿を覧る権利が自身にある場合は、その
投稿が流れる時があります。

スマートストリームはいくつでも作成することが可能です。このストリームは、タブで管理され、切り替えることができます。
ちょうど、HootSuiteやTweetDeckのようなものです。タグはポイント数を指定することが出来ます。

### スマートストリームの例
* フォロー中 & デザイン(5point以上)
* ゲーム(5point以上) & マインクラフト(10point 以上)
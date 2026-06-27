# Pixel Art Editor

ブラウザで動くピクセルアートエディターです。ビルド不要で、GitHub Pages やローカルHTTPサーバーからそのまま使えます。

## 使い方

1. `index.html` または `pixel_art_editor.html` をブラウザで開きます。
2. ツールを選んで中央のキャンバスに描画します。
3. レイヤーやキャンバスサイズを必要に応じて調整します。
4. `PNG保存` から画像を書き出します。

## 主な機能

- ペン、消しゴム、塗りつぶし、スポイト、なげわ選択
- 四角、丸、横書き/縦書きテキスト描画
- レイヤー追加、複製、並べ替え、表示切替、削除、名前変更
- PNG/JPEG/WebP インポート
- PNG エクスポート
- 32x32、64x64、128x128、任意サイズキャンバス
- 美咲ゴシック、美咲明朝フォント同梱
- manifest と service worker によるホーム画面追加/オフライン起動対応

## ファイル構成

```text
.
├─ index.html
├─ pixel_art_editor.html
├─ manifest.webmanifest
├─ service-worker.js
├─ apple-touch-icon.png
├─ mushroom-icon-192.png
├─ mushroom-icon-512.png
├─ mushroom-icon-1024.png
├─ fonts/
└─ README.MD
```

## 公開

GitHub Pages では `Settings` > `Pages` から `main` ブランチの `/root` を公開元に設定します。トップURLへアクセスすると `index.html` からエディター本体へ移動します。

## 開発

依存パッケージやビルド手順はありません。主要なHTML、CSS、JavaScriptは `pixel_art_editor.html` に集約しています。

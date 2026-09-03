# 本扉（ほんとびら）

私専用の書庫サイト。買った本の表紙を並べ、タッチするとその本だけの特設ページに飛び、
価格・評価・感想を読めるようにした個人サイトです。React + Vite + GitHub Pages で動きます。

## 構成

```
src/
  data/books.js        ← 本のデータ（ここを編集して蔵書を増やします）
  components/
    BookCover.jsx       本棚に並ぶ表紙カード
    GeneratedCover.jsx  実写真がまだない本のための自動生成プレースホルダー表紙
    StarRating.jsx       ★評価の表示
  pages/
    Home.jsx             トップページ（書架）
    BookDetail.jsx        本ごとの特設ページ
public/
  covers/                実際の表紙写真を置く場所
.github/workflows/deploy.yml   GitHub Pages への自動デプロイ設定
```

## ローカルで確認する

```bash
npm install
npm run dev
```

表示された URL（例: http://localhost:5173）をブラウザで開くと確認できます。

## 本を追加・編集する

`src/data/books.js` を開き、配列に1冊分のオブジェクトを追加します。

```js
{
  id: "book-slug",        // URLの一部になります（英数字とハイフンのみ推奨）
  title: "本のタイトル",
  author: "著者名",
  year: 2024,
  publisher: "出版社",
  price: 1800,
  rating: 4.5,             // 0〜5、0.5刻みOK
  tags: ["タグ1", "タグ2"],
  accent: "#6b3a3a",        // プレースホルダー表紙の色味（自由に変更可）
  coverImage: null,         // 実写真を使うなら "/covers/ファイル名.jpg"
  summary: "本の紹介文（客観的な内容紹介）",
  review: "自分が読んで感じたこと（ここが一番大事な場所です）",
}
```

## 実際の表紙写真を使う

1. 自分が持っている本の表紙を撮影・スキャンする
2. 画像ファイルを `public/covers/` に置く（例: `public/covers/kokoro.jpg`）
3. `books.js` の該当する本の `coverImage` を `"/covers/kokoro.jpg"` に変更する

写真が無い本は、自動生成されたプレースホルダー表紙（タイトルと著者名を金の縦書きで
あしらったデザイン）がそのまま表示されます。

## 色を変える

`src/index.css` の `:root` の中にある `--bg-void` `--gold` `--ink` などの変数を
書き換えると、サイト全体の色合いを調整できます。

## GitHub Pages に公開する

1. GitHub の該当リポジトリの Settings → Pages → Source を「GitHub Actions」に設定する
2. このプロジェクト一式を `main` ブランチに push する
3. `.github/workflows/deploy.yml` が自動的にビルド・公開を行う
4. `https://<ユーザー名>.github.io/Hontobira/` で公開される

リポジトリ名を変える場合は `vite.config.js` の `base` の値も合わせて変更してください。

## 使用ライブラリ

- React / Vite
- react-router-dom（ページ遷移）
- framer-motion（表紙が特設ページへ広がる演出などのアニメーション）

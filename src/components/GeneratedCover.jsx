// 実物の表紙写真がまだ用意できていない本のための、自動生成プレースホルダー表紙。
// public/covers/ に実写真を置いて books.js の coverImage に指定すれば、
// 自動的にそちらが優先表示されます（BookCover.jsx 参照）。

function shade(hex, amount) {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x0000ff) + amount;
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export default function GeneratedCover({ title, author, accent = "#8f6b3d" }) {
  const dark = shade(accent, -34);
  const light = shade(accent, 18);

  return (
    <div
      className="generated-cover"
      style={{
        "--cover-dark": dark,
        "--cover-accent": accent,
        "--cover-light": light,
      }}
    >
      <div className="generated-cover__texture" />
      <div className="generated-cover__frame">
        <span className="generated-cover__mark" aria-hidden="true">
          ⁜
        </span>
        <p className="generated-cover__title">{title}</p>
        <p className="generated-cover__author">{author}</p>
      </div>
    </div>
  );
}

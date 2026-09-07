// 並び替え・絞り込み・検索のロジック。
// 著者やタグの選択肢は books.js から自動的に集計されるので、
// 本を追加してもこのファイルを触る必要はありません。

export const SORT_OPTIONS = [
  { value: "default", label: "追加順" },
  { value: "author-asc", label: "著者名(あ→ん)" },
  { value: "title-asc", label: "タイトル(あ→ん)" },
  { value: "rating-desc", label: "評価が高い順" },
  { value: "rating-asc", label: "評価が低い順" },
  { value: "price-desc", label: "価格が高い順" },
  { value: "price-asc", label: "価格が低い順" },
];

export function getFacets(books) {
  const authors = Array.from(new Set(books.map((b) => b.author))).sort((a, b) =>
    a.localeCompare(b, "ja")
  );
  const tags = Array.from(new Set(books.flatMap((b) => b.tags))).sort((a, b) =>
    a.localeCompare(b, "ja")
  );
  const prices = books.map((b) => b.price);
  return {
    authors,
    tags,
    minPrice: prices.length ? Math.min(...prices) : 0,
    maxPrice: prices.length ? Math.max(...prices) : 0,
  };
}

// 価格帯のプリセットを、実際の蔵書の価格レンジから自動生成(3分割)する。
export function getPriceBuckets({ minPrice, maxPrice }) {
  if (!Number.isFinite(minPrice) || !Number.isFinite(maxPrice) || minPrice >= maxPrice) {
    return [];
  }
  const step = Math.ceil((maxPrice - minPrice + 1) / 3);
  return [0, 1, 2].map((i) => {
    const low = minPrice + step * i;
    const high = i === 2 ? maxPrice : minPrice + step * (i + 1) - 1;
    return {
      key: `${low}-${high}`,
      low,
      high,
      label: `¥${low.toLocaleString()} 〜 ¥${high.toLocaleString()}`,
    };
  });
}

export function sortBooks(books, sortKey) {
  const list = [...books];
  switch (sortKey) {
    case "author-asc":
      return list.sort((a, b) => a.author.localeCompare(b.author, "ja"));
    case "title-asc":
      return list.sort((a, b) => a.title.localeCompare(b.title, "ja"));
    case "rating-desc":
      return list.sort((a, b) => b.rating - a.rating);
    case "rating-asc":
      return list.sort((a, b) => a.rating - b.rating);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    default:
      return list;
  }
}

export function filterBooks(books, filters) {
  const { authors, tags, minRating, priceRange } = filters;
  return books.filter((b) => {
    if (authors.size > 0 && !authors.has(b.author)) return false;
    if (tags.size > 0 && !b.tags.some((t) => tags.has(t))) return false;
    if (minRating > 0 && b.rating < minRating) return false;
    if (priceRange && (b.price < priceRange[0] || b.price > priceRange[1])) return false;
    return true;
  });
}

// 検索スコア: タイトル前方一致 > タイトル部分一致 > 著者一致 > タグ一致 > 紹介文一致
function scoreBook(book, query) {
  const q = query.trim().toLowerCase();
  if (!q) return 0;
  const title = book.title.toLowerCase();
  const author = book.author.toLowerCase();
  let score = 0;
  if (title.startsWith(q)) score = Math.max(score, 100);
  else if (title.includes(q)) score = Math.max(score, 70);
  if (author.startsWith(q)) score = Math.max(score, 60);
  else if (author.includes(q)) score = Math.max(score, 45);
  if (book.tags.some((t) => t.toLowerCase().includes(q))) score = Math.max(score, 30);
  if (book.summary && book.summary.toLowerCase().includes(q)) score = Math.max(score, 12);
  return score;
}

export function searchBooks(books, query) {
  return books
    .map((book) => ({ book, score: scoreBook(book, query) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.book);
}

export function toggleSetValue(set, value) {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

export function isFiltersActive(filters) {
  return (
    filters.authors.size > 0 ||
    filters.tags.size > 0 ||
    filters.minRating > 0 ||
    Boolean(filters.priceRange)
  );
}

export const EMPTY_FILTERS = {
  authors: new Set(),
  tags: new Set(),
  minRating: 0,
  priceRange: null,
};

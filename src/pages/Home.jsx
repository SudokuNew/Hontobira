import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BookCover from "../components/BookCover";
import ShelfControls from "../components/ShelfControls";
import { books } from "../data/books";
import {
  EMPTY_FILTERS,
  filterBooks,
  getFacets,
  getPriceBuckets,
  searchBooks,
  sortBooks,
} from "../utils/bookQuery";

export default function Home() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("default");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [filterOpen, setFilterOpen] = useState(false);

  const facets = useMemo(() => getFacets(books), []);
  const priceBuckets = useMemo(() => getPriceBuckets(facets), [facets]);

  const visibleBooks = useMemo(() => {
    const filtered = filterBooks(books, filters);
    return query.trim() ? searchBooks(filtered, query) : sortBooks(filtered, sortKey);
  }, [query, sortKey, filters]);

  const isSearching = query.trim().length > 0;

  const resultLabel = isSearching
    ? `「${query.trim()}」の検索結果 ${visibleBooks.length}件`
    : visibleBooks.length === books.length
    ? `蔵書 ${books.length}冊`
    : `${visibleBooks.length} / ${books.length}冊を表示中`;

  const handleReset = () => {
    setFilters(EMPTY_FILTERS);
    setQuery("");
  };

  return (
    <div className="home">
      <header className="home__hero">
        <motion.p
          className="home__eyebrow"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          私だけの書庫
        </motion.p>
        <motion.h1
          className="home__title"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          本扉
        </motion.h1>
        <motion.p
          className="home__lede"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16 }}
        >
          買った本を、開いた場所に置いておく。表紙をひらくと、値段もレビューも、
          自分が読んで感じたことも、すべてがそこにある。
        </motion.p>
      </header>

      <main>
        <ShelfControls
          query={query}
          onQueryChange={setQuery}
          sortKey={sortKey}
          onSortChange={setSortKey}
          filters={filters}
          onFiltersChange={setFilters}
          filterOpen={filterOpen}
          onToggleFilterOpen={() => setFilterOpen((v) => !v)}
          facets={facets}
          priceBuckets={priceBuckets}
          resultLabel={resultLabel}
          onReset={handleReset}
        />

        {visibleBooks.length > 0 ? (
          <motion.div className="shelf-grid" layout>
            <AnimatePresence mode="popLayout">
              {visibleBooks.map((book) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                >
                  <BookCover book={book} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="shelf-empty">
            <p>条件に合う本が見つかりませんでした。</p>
            <button type="button" className="shelf-empty__reset" onClick={handleReset}>
              条件をリセットする
            </button>
          </div>
        )}
      </main>

      <footer className="home__footer">
        <p>本扉 — a private library</p>
      </footer>
    </div>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { SORT_OPTIONS, toggleSetValue, isFiltersActive } from "../utils/bookQuery";

export default function ShelfControls({
  query,
  onQueryChange,
  sortKey,
  onSortChange,
  filters,
  onFiltersChange,
  filterOpen,
  onToggleFilterOpen,
  facets,
  priceBuckets,
  resultLabel,
  onReset,
}) {
  const filtersActive = isFiltersActive(filters);
  const activeCount =
    filters.authors.size + filters.tags.size + (filters.minRating > 0 ? 1 : 0) + (filters.priceRange ? 1 : 0);

  const isSearching = query.trim().length > 0;

  return (
    <div className="shelf-controls">
      <div className="shelf-controls__row">
        <div className="shelf-controls__label">
          <span>{resultLabel}</span>
        </div>

        <div className="shelf-controls__actions">
          <label className="search-field">
            <svg
              className="search-field__icon"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.4" />
              <line x1="13" y1="13" x2="18" y2="18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="タイトル・著者・タグで検索"
              className="search-field__input"
              aria-label="本を検索"
            />
            {query && (
              <button
                type="button"
                className="search-field__clear"
                onClick={() => onQueryChange("")}
                aria-label="検索をクリア"
              >
                ✕
              </button>
            )}
          </label>

          <div className={`sort-field ${isSearching ? "sort-field--disabled" : ""}`}>
            <select
              value={sortKey}
              onChange={(e) => onSortChange(e.target.value)}
              disabled={isSearching}
              aria-label="並び替え"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className={`filter-toggle ${filterOpen ? "filter-toggle--open" : ""}`}
            onClick={onToggleFilterOpen}
            aria-expanded={filterOpen}
          >
            絞り込み
            {activeCount > 0 && <span className="filter-toggle__badge">{activeCount}</span>}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {filterOpen && (
          <motion.div
            className="filter-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
          >
            <div className="filter-panel__inner">
              {facets.tags.length > 0 && (
                <div className="filter-group">
                  <p className="filter-group__title">タグ</p>
                  <div className="filter-group__chips">
                    {facets.tags.map((tag) => (
                      <button
                        type="button"
                        key={tag}
                        className={`chip ${filters.tags.has(tag) ? "chip--active" : ""}`}
                        onClick={() =>
                          onFiltersChange({ ...filters, tags: toggleSetValue(filters.tags, tag) })
                        }
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="filter-group">
                <p className="filter-group__title">著者</p>
                <div className="filter-group__chips">
                  {facets.authors.map((author) => (
                    <button
                      type="button"
                      key={author}
                      className={`chip ${filters.authors.has(author) ? "chip--active" : ""}`}
                      onClick={() =>
                        onFiltersChange({
                          ...filters,
                          authors: toggleSetValue(filters.authors, author),
                        })
                      }
                    >
                      {author}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <p className="filter-group__title">評価</p>
                <div className="filter-group__chips">
                  {[5, 4, 3, 2].map((n) => (
                    <button
                      type="button"
                      key={n}
                      className={`chip ${filters.minRating === n ? "chip--active" : ""}`}
                      onClick={() =>
                        onFiltersChange({
                          ...filters,
                          minRating: filters.minRating === n ? 0 : n,
                        })
                      }
                    >
                      ★{n}以上
                    </button>
                  ))}
                </div>
              </div>

              {priceBuckets.length > 0 && (
                <div className="filter-group">
                  <p className="filter-group__title">価格帯</p>
                  <div className="filter-group__chips">
                    {priceBuckets.map((bucket) => {
                      const active =
                        filters.priceRange &&
                        filters.priceRange[0] === bucket.low &&
                        filters.priceRange[1] === bucket.high;
                      return (
                        <button
                          type="button"
                          key={bucket.key}
                          className={`chip ${active ? "chip--active" : ""}`}
                          onClick={() =>
                            onFiltersChange({
                              ...filters,
                              priceRange: active ? null : [bucket.low, bucket.high],
                            })
                          }
                        >
                          {bucket.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {filtersActive && (
                <button type="button" className="filter-panel__reset" onClick={onReset}>
                  条件をリセット
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

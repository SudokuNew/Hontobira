import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GeneratedCover from "../components/GeneratedCover";
import StarRating from "../components/StarRating";
import { getBookById, coverUrl } from "../data/books";

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function BookDetail() {
  const { id } = useParams();
  const book = getBookById(id);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Esc キーで閉じる／開いている間は背景のスクロールを止める。
  // 本の追加・削除に関わらず常に有効なので、新しく本を足しても自動的にこの挙動を継承します。
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxOpen]);

  if (!book) return <Navigate to="/" replace />;

  const renderCoverArt = (className) =>
    book.coverImage ? (
      <img
        src={coverUrl(book.coverImage)}
        alt={`${book.title} の表紙`}
        className={className}
      />
    ) : (
      <GeneratedCover title={book.title} author={book.author} accent={book.accent} />
    );

  return (
    <div className="detail" style={{ "--book-accent": book.accent }}>
      <div className="detail__top">
        <Link to="/" className="detail__back">
          ← 書架にもどる
        </Link>
      </div>

      <div className="detail__layout">
        <div className="detail__cover-col">
          <motion.div className="detail__cover-frame" layoutId={`cover-${book.id}`}>
            <motion.button
              type="button"
              className="detail__cover-trigger"
              layoutId={`cover-image-${book.id}`}
              onClick={() => setLightboxOpen(true)}
              aria-label={`${book.title} の表紙を拡大表示`}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              {renderCoverArt("detail__cover-image")}
            </motion.button>
            <div className="detail__cover-glow" aria-hidden="true" />
          </motion.div>
        </div>

        <motion.div
          className="detail__body"
          initial={pageTransition.initial}
          animate={pageTransition.animate}
          transition={{ ...pageTransition.transition, delay: 0.1 }}
        >
          <p className="detail__eyebrow">{book.tags[0]}</p>
          <h1 className="detail__title">{book.title}</h1>
          <p className="detail__meta">
            {book.author} ・ {book.year}年 ・ {book.publisher}
          </p>

          <div className="detail__hairline" />

          <div className="detail__stats">
            <div className="detail__stat">
              <span className="detail__stat-label">価格</span>
              <span className="detail__stat-value">¥{book.price.toLocaleString()}</span>
            </div>
            <div className="detail__stat">
              <span className="detail__stat-label">評価</span>
              <span className="detail__stat-value detail__stat-value--rating">
                <StarRating value={book.rating} size="1.1rem" />
                <span className="detail__rating-number">{book.rating.toFixed(1)}</span>
              </span>
            </div>
          </div>

          <div className="detail__tags">
            {book.tags.map((tag) => (
              <span className="detail__tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <section className="detail__section">
            <h2 className="detail__section-title">この本について</h2>
            <p className="detail__summary">{book.summary}</p>
          </section>

          <section className="detail__section detail__section--review">
            <h2 className="detail__section-title">読んだ感想</h2>
            <p className="detail__review">{book.review}</p>
          </section>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={() => setLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${book.title} の表紙 拡大表示`}
          >
            <motion.button
              type="button"
              className="lightbox__close"
              onClick={() => setLightboxOpen(false)}
              aria-label="閉じる"
            >
              ✕ 閉じる
            </motion.button>

            <motion.div
              className="lightbox__frame"
              layoutId={`cover-image-${book.id}`}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              {renderCoverArt("lightbox__image")}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

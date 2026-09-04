import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
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

  if (!book) return <Navigate to="/" replace />;

  return (
    <div className="detail">
      <div className="detail__top">
        <Link to="/" className="detail__back">
          ← 書架にもどる
        </Link>
      </div>

      <div className="detail__layout">
        <div className="detail__cover-col">
          <motion.div className="detail__cover-frame" layoutId={`cover-${book.id}`}>
            {book.coverImage ? (
              <img
                src={coverUrl(book.coverImage)}
                alt={`${book.title} の表紙`}
                className="detail__cover-image"
              />
            ) : (
              <GeneratedCover title={book.title} author={book.author} accent={book.accent} />
            )}
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
    </div>
  );
}

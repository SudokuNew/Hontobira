import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GeneratedCover from "./GeneratedCover";
import { coverUrl } from "../data/books";

export default function BookCover({ book }) {
  return (
    <Link to={`/book/${book.id}`} className="book-cover" aria-label={`${book.title} — 詳細を見る`}>
      <div className="book-cover__stand">
        <motion.div
          className="book-cover__frame"
          layoutId={`cover-${book.id}`}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={`${book.title} の表紙`}
              className="book-cover__image"
            />
          ) : (
            <GeneratedCover title={book.title} author={book.author} accent={book.accent} />
          )}
        </motion.div>
        <div className="book-cover__shadow" aria-hidden="true" />
      </div>
      <p className="book-cover__title">{book.title}</p>
      <p className="book-cover__author">{book.author}</p>
    </Link>
  );
}

import { motion } from "framer-motion";
import BookCover from "../components/BookCover";
import { books } from "../data/books";

export default function Home() {
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
        <div className="home__shelf-label">
          <span>蔵書 {books.length} 冊</span>
        </div>
        <div className="shelf-grid">
          {books.map((book) => (
            <BookCover key={book.id} book={book} />
          ))}
        </div>
      </main>

      <footer className="home__footer">
        <p>本扉 — a private library</p>
      </footer>
    </div>
  );
}

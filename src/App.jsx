import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import "./pages/Home.css";
import "./pages/BookDetail.css";
import "./components/BookCover.css";
import "./components/GeneratedCover.css";
import "./components/StarRating.css";
import "./components/ShelfControls.css";

// ページ遷移のたびに一番上までスクロールを戻す。
// これがないと、詳細ページの途中で「書架にもどる」を押しても
// スクロール位置がそのまま引き継がれ、戻ったように見えない/反応していないように感じてしまう。
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

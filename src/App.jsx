import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import "./pages/Home.css";
import "./pages/BookDetail.css";
import "./components/BookCover.css";
import "./components/GeneratedCover.css";
import "./components/StarRating.css";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </AnimatePresence>
  );
}

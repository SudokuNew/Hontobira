const STAR = "\u2605";

export default function StarRating({ value = 0, size = "1rem" }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div
      className="star-rating"
      style={{ fontSize: size }}
      role="img"
      aria-label={`5段階中${value}の評価`}
    >
      {stars.map((n) => {
        const fill = Math.max(0, Math.min(1, value - (n - 1)));
        return (
          <span className="star-rating__slot" key={n}>
            <span className="star-rating__base">{STAR}</span>
            <span
              className="star-rating__fill"
              style={{ width: `${fill * 100}%` }}
            >
              {STAR}
            </span>
          </span>
        );
      })}
    </div>
  );
}

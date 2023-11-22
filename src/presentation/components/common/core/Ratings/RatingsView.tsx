import { useCallback, useEffect, useState } from "react";

interface IRatingsViewProps {
  countRatings: number;
  totalRatings: number;
  size?: string;
  showText?: boolean;
}

export default function RatingsView({
  countRatings,
  totalRatings,
  size = "20px",
  showText = true,
}: IRatingsViewProps) {
  const ratings = [1, 2, 3, 4, 5];
  const [finishRating, setFinishRating] = useState<number>(0);

  const getRating = useCallback(() => {
    if (countRatings === 0 || totalRatings === 0) {
      setFinishRating(0);
      return;
    }

    setFinishRating(totalRatings / countRatings);
  }, [countRatings, totalRatings]);

  useEffect(() => {
    getRating();
  }, [getRating]);

  return (
    <div className="d-flex align-items-center py-2">
      {ratings.map((rating: number) => (
        <div key={rating} className="me-2">
          {finishRating >= rating ? (
            <i
              className="fa-solid fa-star icon-star-rate"
              style={{ fontSize: size }}
            />
          ) : (
            <i
              className="fa-regular fa-star"
              style={{ fontSize: size, color: "rgba(0, 0, 0, .4)" }}
            />
          )}
        </div>
      ))}

      {showText && (
        <div className="ms-2 mt-3">
          <p>{finishRating} calificaciones</p>
        </div>
      )}
    </div>
  );
}

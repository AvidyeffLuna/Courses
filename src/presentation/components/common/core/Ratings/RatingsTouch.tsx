import * as Styles from "./RatingsTouchStyles";

interface IRatingsTouchProps {
  setRatings: (rating: number) => void;
  ratingSelected: number;
  size?: string;
}

export default function RatingsTouch({
  setRatings,
  ratingSelected,
  size = "20px",
}: IRatingsTouchProps) {
  const ratings = [1, 2, 3, 4, 5];

  return (
    <div className="d-flex align-items-center">
      {ratings.map((rating: number) => (
        <div key={rating} className="me-3">
          {ratingSelected >= rating ? (
            <Styles.RatingsTouchStarSolidIcon
              onClick={() => setRatings(rating)}
              variant=""
              className="py-0 px-0"
            >
              <i
                className="fa-solid fa-star icon-star-rate"
                style={{ fontSize: size }}
              />
            </Styles.RatingsTouchStarSolidIcon>
          ) : (
            <Styles.RatingsTouchStarRegularIcon
              variant=""
              className="py-0 px-0"
              onClick={() => setRatings(rating)}
            >
              <i
                className="fa-regular fa-star"
                style={{ fontSize: size, color: "rgba(0, 0, 0, .4)" }}
              />
            </Styles.RatingsTouchStarRegularIcon>
          )}
        </div>
      ))}
    </div>
  );
}

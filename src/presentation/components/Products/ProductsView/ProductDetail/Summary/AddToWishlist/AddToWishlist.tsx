import { Button } from "react-bootstrap";

export default function AddToWishlist() {
  return (
    <Button variant="" className="px-0 py-0">
      <div className="d-flex align-items-center">
        <div className="me-3">
          <i className="fa-regular fa-heart icon-gray" />
        </div>

        <div className="mt-2">
          <p>Agregar a mi lista de deseos</p>
        </div>
      </div>
    </Button>
  );
}

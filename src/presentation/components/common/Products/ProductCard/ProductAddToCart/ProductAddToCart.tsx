import { Button } from "react-bootstrap";

export default function ProductAddToCart() {
  return (
    <Button
      type="button"
      variant="outline-primary"
      className="py-0 px-3 w-100"
      style={{ height: "40px" }}
    >
      <div className="d-flex">
        <div className="me-2">
          <i className="fa-solid fa-cart-shopping font-size-md" />
        </div>

        <div className="mt-1 font-size-md">Agregar al carrito</div>
      </div>
    </Button>
  );
}

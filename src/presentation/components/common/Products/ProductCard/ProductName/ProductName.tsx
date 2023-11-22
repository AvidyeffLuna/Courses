import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { ProductsRoutesEnum } from "presentation/routes/productsRoutes";

interface IProductNameProps {
  name: string;
  productId: string;
  price: string;
  discount: string;
}

export default function ProductName({
  name,
  productId,
  price,
  discount,
}: IProductNameProps) {
  const [ratings] = useState([1, 2, 3, 4, 5]);

  return (
    <Row>
      <Col lg={12}>
        <Link
          href={{
            pathname: ProductsRoutesEnum.ProductsView,
            query: {
              productName: encodeURIComponent(name.toLowerCase()).replace(
                /%20/g,
                "-"
              ),
              productId: productId,
            },
          }}
        >
          <a>
            <h5 className="a-primary">{name}</h5>
          </a>
        </Link>
      </Col>

      <Col lg={12}>
        <div className="d-flex align-items-center">
          <div className="me-3">
            <h4
              className="text-primary"
              style={{ textDecoration: discount && "line-through" }}
            >
              {price}
            </h4>
          </div>

          <div>
            <h3 className="text-primary">{discount}</h3>
          </div>
        </div>
      </Col>

      <Col lg={12}>
        <div className="d-flex">
          {ratings.map((rating) => (
            <div key={rating} className="me-1">
              <i className="fa-regular fa-star" />
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
}

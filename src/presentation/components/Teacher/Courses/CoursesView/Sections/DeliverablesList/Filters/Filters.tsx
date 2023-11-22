import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import OffcanvasFilters from "./OffcanvasFilters/OffcanvasFilters";

export default function Filters() {
  const [showFilters, setShowFilters] = useState(false);

  const handleShow = () => setShowFilters(true);
  const handleClose = () => setShowFilters(false);

  return (
    <Row>
      <Col lg={12}>
        <Button
          type="button"
          onClick={() => handleShow()}
          variant="icon"
          className="px-0 py-0"
        >
          <div className="d-flex">
            <div className="me-2">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <g>
                  <path d="M0,0h24 M24,24H0" fill="none" />
                  <path d="M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z" />
                  <path d="M0,0h24v24H0V0z" fill="none" />
                </g>
              </svg>
            </div>

            <div className="mt-1">
              <p>Filtrar entregables</p>
            </div>
          </div>
        </Button>

        <OffcanvasFilters show={showFilters} handleClose={handleClose} />
      </Col>
    </Row>
  );
}

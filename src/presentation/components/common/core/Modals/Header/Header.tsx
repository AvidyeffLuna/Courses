import { Button, Col, Row } from "react-bootstrap";

interface IHeaderProps {
  onHide: () => void;
}

export default function Header({ onHide }: IHeaderProps) {
  return (
    <Row className="py-2 px-4">
      <Col lg={12} className="d-flex justify-content-end">
        <Button onClick={onHide} variant="icon" style={{ padding: "5px 15px" }}>
          <div className="mt-1">
            <i
              className="fa-solid fa-xmark icon-white"
              style={{ fontSize: "30px" }}
            />
          </div>
        </Button>
      </Col>
    </Row>
  );
}

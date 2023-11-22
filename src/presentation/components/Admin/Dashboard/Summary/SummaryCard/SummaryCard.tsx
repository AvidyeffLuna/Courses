import { Card, Row } from "react-bootstrap";

interface ISummaryCardProps {
  icon: string;
  title: string;
  value: number | string;
}

export default function SummaryCard({ icon, title, value }: ISummaryCardProps) {
  return (
    <Card>
      <Card.Body className="py-4 px-4">
        <Row>
          <div className="d-flex align-items-center">
            <div className="me-5">
              <i className={icon} style={{ fontSize: "30px" }} />
            </div>

            <div>
              <div className="mb-4">
                <h4>{title}</h4>
              </div>

              <div>
                <h3 className="text-primary">{value}</h3>
              </div>
            </div>
          </div>
        </Row>
      </Card.Body>
    </Card>
  );
}

import { Badge, Col, Row } from "react-bootstrap";

interface ICourseTagsProps {
  tags: string[];
}

export default function CourseTags({ tags }: ICourseTagsProps) {
  return (
    <Row>
      <Col lg={12}>
        <div className="d-flex align-items-center">
          {tags.map((tag) => (
            <Badge key={tag} bg="primary" className="me-3">
              {tag}
            </Badge>
          ))}
        </div>
      </Col>
    </Row>
  );
}

import { Col, Row } from "react-bootstrap";
import AddComment from "./AddComment/AddComment";
import CommentsList from "./CommentsList/CommentsList";

export default function Comments() {
  return (
    <Row>
      <Col lg={12} className="mb-4">
        <h3>Preguntas y respuestas</h3>
      </Col>

      <Col lg={12} className="mb-4">
        <AddComment />
      </Col>

      <Col lg={12}>
        <CommentsList />
      </Col>
    </Row>
  );
}

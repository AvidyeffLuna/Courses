import { useId, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Comment from "./Comment/Comment";

export default function CommentsList() {
  const [comments, setComments] = useState([
    {
      commentId: useId(),
      firstName: "Richard",
      lastName: "Linares",
      message: "¿Siguen disponibles?",
      createdAt: "11 de octubre del 2022",
    },
    {
      commentId: useId(),
      firstName: "Alejandro",
      lastName: "Gutierrez",
      message: "¿No quedan en color rosado?",
      createdAt: "11 de octubre del 2022",
    },
  ]);

  return (
    <Row>
      {comments.map((comment) => (
        <Col
          key={comment.commentId}
          lg={12}
          className="mb-3 py-2"
          style={{ borderBottom: "1px solid rgba(0, 0, 0, .1)" }}
        >
          <Comment comment={comment} />
        </Col>
      ))}
    </Row>
  );
}

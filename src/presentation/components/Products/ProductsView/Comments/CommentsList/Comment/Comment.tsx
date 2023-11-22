import { Col, Row } from "react-bootstrap";

interface ICommentProps {
  comment: any;
}

export default function Comment({ comment }: ICommentProps) {
  return (
    <Row>
      <Col lg={12}>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h5>
              {comment.firstName} {comment.lastName}
            </h5>
          </div>

          <div>
            <p>{comment.createdAt}</p>
          </div>
        </div>
      </Col>

      <Col lg={12}>
        <p>{comment.message}</p>
      </Col>
    </Row>
  );
}

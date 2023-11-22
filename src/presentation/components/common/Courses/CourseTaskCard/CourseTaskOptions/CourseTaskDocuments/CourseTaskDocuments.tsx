import { IMedia } from "domain/core/entities/mediaEntity";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

interface ICourseTaskDocumentsProps {
  documents: IMedia[];
  showDocuments: boolean;
  setShowDocuments: Dispatch<SetStateAction<boolean>>;
}

export default function CourseTaskDocuments({
  documents,
  showDocuments,
  setShowDocuments,
}: ICourseTaskDocumentsProps) {
  return (
    <Row>
      <Col lg={12}>
        <Button
          variant="link"
          className="py-0 px-0"
          onClick={() => setShowDocuments(!showDocuments)}
        >
          <div className="d-flex">
            <div className="me-2">
              <i
                className="fa-solid fa-file icon-primary"
                style={{ fontSize: "20px" }}
              />
            </div>

            <div>
              <p className="text-primary">
                {showDocuments ? "Ocultar documentos" : "Ver documentos"}
              </p>
            </div>
          </div>
        </Button>
      </Col>
    </Row>
  );
}

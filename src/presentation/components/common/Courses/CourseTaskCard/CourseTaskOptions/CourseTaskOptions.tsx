import { IMedia } from "domain/core/entities/mediaEntity";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Url } from "url";
import CourseTaskDocuments from "./CourseTaskDocuments/CourseTaskDocuments";
import CourseTaskPictures from "./CourseTaskPictures/CourseTaskPictures";
import CourseTaskView from "./CourseTaskView/CourseTaskView";
import CourseTaskViewContent from "./CourseTaskViewContent/CourseTaskViewContent";

interface ICourseTaskOptionsProps {
  mediaList: IMedia[];
  href?: Url | null;
  doTask: boolean;
}

export default function CourseTaskOptions({
  mediaList,
  href,
  doTask,
}: ICourseTaskOptionsProps) {
  const [showDocuments, setShowDocuments] = useState(false);

  return (
    <Row>
      <Col lg={12} className="mb-3">
        <div className="d-flex align-items-center">
          {href && doTask && (
            <div className="me-3">
              <CourseTaskView href={href} />
            </div>
          )}

          {mediaList.filter((media) => media.type === "document").length >
            0 && (
            <div className="me-3">
              <CourseTaskDocuments
                documents={mediaList.filter(
                  (media) => media.type === "document"
                )}
                showDocuments={showDocuments}
                setShowDocuments={setShowDocuments}
              />
            </div>
          )}

          {mediaList.filter((media) => media.type === "image").length > 0 && (
            <div className="me-3">
              <CourseTaskPictures
                pictures={mediaList.filter((media) => media.type === "image")}
              />
            </div>
          )}
        </div>
      </Col>

      <Col lg={12}>
        <CourseTaskViewContent
          show={showDocuments ? "document" : ""}
          documents={
            mediaList.filter((media) => media.type === "document").length > 0
              ? mediaList.filter((media) => media.type === "document")
              : []
          }
        />
      </Col>
    </Row>
  );
}

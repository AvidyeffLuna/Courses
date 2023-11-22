import { IGetCourseUserByIdResponse } from "domain/core/response/course/courseResponsesEntities";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import About from "./About/About";
import CourseTabs from "./CourseTabs/CourseTabs";
import TasksList from "./TasksList/TasksList";

interface ISectionsProps {
  course: IGetCourseUserByIdResponse;
}

export default function Sections({ course }: ISectionsProps) {
  const [section, setSection] = useState(0);

  const getSectionComponent = () => {
    switch (section) {
      case 0:
        return <About />;
      case 1:
        return <TasksList course={course} />;

      default:
        return <About />;
    }
  };

  return (
    <Row>
      <Col lg={12} className="mb-5">
        <CourseTabs section={section} setSection={setSection} />
      </Col>

      <Col lg={12}>{getSectionComponent()}</Col>
    </Row>
  );
}

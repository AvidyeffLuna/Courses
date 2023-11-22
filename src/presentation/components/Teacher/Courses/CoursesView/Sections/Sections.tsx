import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import About from "./About/About";
import DeliverablesList from "./DeliverablesList/DeliverablesList";
import LessonsList from "./LessonsList/LessonsList";
import Students from "./StudentsList/Students/Students";
import TasksList from "./TasksList/TasksList";

export default function Sections() {
  const router = useRouter();

  const getSectionComponent = () => {
    switch (router.query?.section) {
      case "about":
        return <About />;
      case "lessons":
        return <LessonsList />;
      case "students":
        return <Students />;
      case "class":
        return <TasksList />;
      case "deliverables":
        return <DeliverablesList />;

      default:
        return <About />;
    }
  };

  return (
    <Row>
      <Col lg={12}>{getSectionComponent()}</Col>
    </Row>
  );
}

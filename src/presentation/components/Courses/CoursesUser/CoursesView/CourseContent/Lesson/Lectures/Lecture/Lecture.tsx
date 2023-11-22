import { ICourseItem } from "domain/core/entities/courseEntity";
import { useRouter } from "next/router";
import { CoursesUserRoutesEnum } from "presentation/routes/coursesRoutes";
import { Col, Row } from "react-bootstrap";
import * as Styles from "./LectureStyles";

interface ILectureProps {
  lecture: ICourseItem;
  index: number;
}

export default function Lecture({ lecture, index }: ILectureProps) {
  const router = useRouter();

  const onRedirectToLecture = () => {
    router.push({
      pathname: CoursesUserRoutesEnum.CoursesView,
      query: {
        slug: router.query.slug,
        lesson: lecture.courseLessonId,
        lecture: lecture.courseItemId,
      },
    });
  };

  const getIsLectureSelected = () => {
    if (router.query?.lecture == lecture.courseItemId) return "true";

    return "false";
  };

  return (
    <Styles.LectureWrapper
      variant=""
      className="py-3 px-3 pb-2 w-100 text-start"
      style={{ borderRadius: 0 }}
      onClick={() => onRedirectToLecture()}
      isselected={getIsLectureSelected()}
    >
      <Row className="px-2">
        <Col lg={12} className="px-0">
          <p className="text-dark">
            {index}. {lecture.title}
          </p>
        </Col>
      </Row>
    </Styles.LectureWrapper>
  );
}

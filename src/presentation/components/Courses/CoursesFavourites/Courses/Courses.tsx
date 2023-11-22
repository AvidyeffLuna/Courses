import { ICourse } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { IGetCoursesResponse } from "domain/core/response/course/courseResponsesEntities";
import Link from "next/link";
import { useRouter } from "next/router";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Paginate from "presentation/components/common/core/Paginate/Paginate";
import CourseCard from "presentation/components/common/Courses/CourseCard/CourseCard";
import {
  CoursesRoutesEnum,
  CoursesUserRoutesEnum,
} from "presentation/routes/coursesRoutes";
import { Col, Row } from "react-bootstrap";

interface ICoursesProps {
  courses: IGetCoursesResponse | ICourseFailure;
}

export default function Courses({ courses }: ICoursesProps) {
  const router = useRouter();

  if ("code" in courses) return <ErrorMessage />;

  if (courses.data.length === 0) {
    return (
      <ErrorEmptyMessage
        title="No posees cursos en tu lista de deseos"
        description="No posees cursos en tu lista de deseos en este momento"
      />
    );
  }

  return (
    <Row>
      {courses.data.map((course: ICourse) => (
        <Col key={course.courseId} lg={6} className="mb-5">
          <Link
            href={{
              pathname: course.isBuying
                ? CoursesUserRoutesEnum.CoursesView
                : CoursesRoutesEnum.CoursesView,
              query: { slug: course.slug },
            }}
          >
            <a>
              <CourseCard course={course} showFavourite={false} />
            </a>
          </Link>
        </Col>
      ))}

      <Col lg={12} className="d-flex justify-content-end mt-4">
        <Paginate
          page={router.query?.page ? router.query.page.toString() : "1"}
          limit={courses.metadata.limit ?? 0}
          total={courses.metadata.total ?? 0}
        />
      </Col>
    </Row>
  );
}

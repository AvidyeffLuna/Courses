import { ICourse, ICourseUser } from "domain/core/entities/courseEntity";
import ICourseFailure from "domain/core/failures/course/courseFailure";
import { IGetCoursesUsersResponse } from "domain/core/response/course/courseResponsesEntities";
import Link from "next/link";
import { useRouter } from "next/router";
import ErrorEmptyMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorEmptyMessage";
import ErrorMessage from "presentation/components/common/core/Error/ErrorMessage/ErrorMessage";
import Paginate from "presentation/components/common/core/Paginate/Paginate";
import CourseUserCard from "presentation/components/common/Courses/CourseUserCard/CourseUserCard";
import { CoursesUserRoutesEnum } from "presentation/routes/coursesRoutes";
import { Col, Row } from "react-bootstrap";

interface ICoursesProps {
  courses: IGetCoursesUsersResponse | ICourseFailure;
}

export default function Courses({ courses }: ICoursesProps) {
  const router = useRouter();

  if ("code" in courses) return <ErrorMessage />;

  if (courses.data.length === 0) {
    return (
      <ErrorEmptyMessage
        title="No se han encontrado cursos en estos momentos"
        description="No posees cursos en tu biblioteca de cursos"
      />
    );
  }

  return (
    <Row>
      {courses.data.map((course: ICourseUser) => (
        <Col key={course.courseUserId} lg={6} className="mb-5">
          <Link
            href={{
              pathname: CoursesUserRoutesEnum.CoursesView,
              query: { slug: course.course?.slug },
            }}
          >
            <a>
              <CourseUserCard course={course} />
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

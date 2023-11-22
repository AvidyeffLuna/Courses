import {
  CoursesViewContext,
  ICoursesViewContext,
} from "application/context/Teacher/Courses/CoursesView/CoursesViewContext";
import { IDeliverable } from "domain/core/entities/deliverableEntity";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { TeacherCoursesWorkRoutesEnum } from "presentation/routes/TeacherRoutes/coursesRoutes";
import { getFullDate } from "presentation/utils/dates/datesUtils";
import { useContext } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";

interface IDeliverableCardProps {
  deliverable: IDeliverable;
}

export default function DeliverableCard({
  deliverable,
}: IDeliverableCardProps) {
  const { state } = useContext<ICoursesViewContext>(CoursesViewContext);
  const { data: course } = state.course;

  const router = useRouter();

  return (
    <Link
      href={{
        pathname: TeacherCoursesWorkRoutesEnum.CoursesWork,
        query: {
          slug: course.slug,
          courseTaskId: deliverable.courseTaskId,
          userId: deliverable.userId,
          deliverable: deliverable.deliverableId,
        },
      }}
    >
      <a className="btn text-start px-0 py-0 w-100">
        <Card className="card--link">
          <Card.Body className="py-3 px-3">
            <Row>
              <Col lg={12}>
                <div className="d-flex">
                  <div
                    style={{
                      position: "relative",
                      width: "50px",
                      height: "50px",
                      borderRadius: "2rem",
                      overflow: "hidden",
                    }}
                  >
                    {deliverable?.userId &&
                    deliverable.user?.profilePictureUrl ? (
                      <Image
                        src={deliverable.user.profilePictureUrl}
                        alt="user-picture"
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      <Image
                        src="/static/media/icons/account-avatar.png"
                        alt="course-icon"
                        layout="fill"
                        objectFit="cover"
                        priority
                      />
                    )}
                  </div>

                  <div className="ms-3 w-100">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h4>{deliverable.courseTask?.title}</h4>
                      </div>

                      <div>
                        <Badge bg={deliverable.readAt ? "success" : "warning"}>
                          {deliverable.readAt
                            ? "Revisada"
                            : "Pendiente por revisar"}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-2">
                      <h5>
                        {deliverable?.teacherId
                          ? `${deliverable.teacher?.firstName} ${deliverable.teacher?.lastName}`
                          : `${deliverable.user?.firstName} ${deliverable.user?.lastName}`}
                      </h5>
                    </div>

                    <div>
                      <p className="font-size-md">
                        {getFullDate(deliverable.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </a>
    </Link>
  );
}

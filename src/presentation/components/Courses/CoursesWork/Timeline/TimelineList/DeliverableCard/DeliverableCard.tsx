import {
  CoursesWorkContext,
  ICoursesWorkContext,
} from "application/context/Courses/CoursesWork/CoursesWorkContext";
import { IDeliverable } from "domain/core/entities/deliverableEntity";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { CoursesWorkRoutesEnum } from "presentation/routes/coursesRoutes";
import { colors } from "presentation/styles/variables/defaultVariables";
import { getFullDate } from "presentation/utils/dates/datesUtils";
import { useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";

interface IDeliverableCardProps {
  deliverable: IDeliverable;
  isSelected: boolean;
}

export default function DeliverableCard({
  deliverable,
  isSelected,
}: IDeliverableCardProps) {
  const { state } = useContext<ICoursesWorkContext>(CoursesWorkContext);
  const { data: course } = state.courseState;

  const router = useRouter();

  return (
    <Link
      href={{
        pathname: CoursesWorkRoutesEnum.CoursesWork,
        query: {
          slug: course.course?.slug,
          courseTaskId: router.query?.courseTaskId
            ? router.query.courseTaskId.toString()
            : "",
          deliverable: deliverable.deliverableId,
        },
      }}
    >
      <a className="btn text-start px-0 py-0 w-100">
        <Card
          className="card--link"
          style={{
            border: isSelected
              ? `1px solid ${colors.primary.main}`
              : "1px solid transparent",
          }}
        >
          <Card.Body className="py-3 px-2">
            <Row>
              <Col lg={12}>
                <div className="d-flex justify-content-sm-center justify-content-center justify-content-lg-start justify-content-md-start">
                  <div
                    style={{
                      position: "relative",
                      width: "50px",
                      height: "50px",
                      borderRadius: "2rem",
                      overflow: "hidden",
                    }}
                  >
                    {deliverable?.teacherId &&
                    deliverable.teacher?.profilePictureUrl ? (
                      <Image
                        src={deliverable.teacher.profilePictureUrl}
                        alt="teacher-picture"
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : deliverable?.userId &&
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

                  <div className="ms-3 d-lg-block d-md-block d-sm-none d-none">
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

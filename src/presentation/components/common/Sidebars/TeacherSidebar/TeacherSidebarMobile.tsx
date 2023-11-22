import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { TeacherCoursesRoutesEnum } from "presentation/routes/TeacherRoutes/coursesRoutes";
import { TeacherDashboardRoutesEnum } from "presentation/routes/TeacherRoutes/dashboardRoutes";
import { useId } from "react";
import { Col, Row, Offcanvas } from "react-bootstrap";

interface ITeacherSidebarMobileProps {
  show: boolean;
  handleClose: () => void;
}

export default function TeacherSidebarMobile({
  show,
  handleClose,
}: ITeacherSidebarMobileProps) {
  const router = useRouter();

  const navs = [
    {
      navId: useId(),
      name: "Tablero",
      icon: "fa-solid fa-chart-pie",
      pathname: TeacherDashboardRoutesEnum.Dashboard,
    },
    {
      navId: useId(),
      name: "Cursos",
      icon: "fa-brands fa-leanpub",
      pathname: TeacherCoursesRoutesEnum.CoursesList,
    },
  ];

  const getCurrentPath = (path: string): boolean => {
    if (router.pathname === path) return true;

    return false;
  };

  return (
    <Offcanvas show={show} onHide={handleClose} style={{ width: "325px" }}>
      <Offcanvas.Header className="d-flex justify-content-center">
        <div
          style={{
            position: "relative",
            width: "250px",
            height: "110px",
          }}
        >
          <Image
            src="/pad-logo.png"
            alt={`${process.env.appName} Logo`}
            title={process.env.appName}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </Offcanvas.Header>

      <Offcanvas.Body className="py-0 px-0">
        <div className="overflow-hidden">
          <Row>
            <Col lg={12} className="mb-4">
              {navs.map((nav: any) => (
                <Link key={nav.navId} href={nav.pathname}>
                  <a className="font-weight-600">
                    <div
                      className={
                        getCurrentPath(nav.pathname)
                          ? "bg-primary d-flex align-items-center py-2 px-3"
                          : "d-flex align-items-center py-2 px-3"
                      }
                    >
                      <div className="me-3">
                        <i
                          className={
                            getCurrentPath(nav.pathname)
                              ? `${nav.icon} icon-white font-size-xl`
                              : `${nav.icon} icon-dark-50 font-size-xl`
                          }
                        />
                      </div>

                      <div>
                        <span
                          className={
                            getCurrentPath(nav.pathname)
                              ? "text-white font-size-md font-weight-600"
                              : "text-dark-50 font-size-md font-weight-600"
                          }
                        >
                          {nav.name}
                        </span>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </Col>
          </Row>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

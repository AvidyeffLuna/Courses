import Image from "next/image";
import Link from "next/link";
import { AccountRoutesEnum } from "presentation/routes/accountRoutes";
import {
  CoursesRoutesEnum,
  CoursesUserRoutesEnum,
} from "presentation/routes/coursesRoutes";
import { TransactionsRoutesEnum } from "presentation/routes/transactionsRoutes";
import { useId } from "react";
import { Col, Offcanvas, Row } from "react-bootstrap";

interface IDefaultSidebarProps {
  isLogged: boolean;
  show: boolean;
  handleClose: () => void;
}

export default function DefaultSidebar({
  isLogged,
  show,
  handleClose,
}: IDefaultSidebarProps) {
  const navItems: any = [
    {
      navItemId: useId(),
      href: {
        pathname: CoursesRoutesEnum.CoursesList,
        query: {},
      },
      name: "Explorar cursos",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.19 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" />
        </svg>
      ),
      show: true,
    },
    {
      navItemId: useId(),
      href: {
        pathname: AccountRoutesEnum.Signin,
        query: {},
      },
      name: "Acceder a mi cuenta",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <g>
            <rect fill="none" height="24" width="24" />
          </g>
          <g>
            <path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" />
          </g>
        </svg>
      ),
      show: !isLogged,
    },
    {
      navItemId: useId(),
      href: {
        pathname: CoursesUserRoutesEnum.CoursesList,
        query: {},
      },
      name: "Mis cursos",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z" />
        </svg>
      ),
      show: isLogged,
    },
    {
      navItemId: useId(),
      href: {
        pathname: CoursesRoutesEnum.CoursesWhiteList,
        query: {},
      },
      name: "Lista de deseos",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
      show: isLogged,
    },
    {
      navItemId: useId(),
      href: {
        pathname: TransactionsRoutesEnum.TransactionsList,
        query: {},
      },
      name: "Transacciones",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-9-1c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-6v11c0 1.1-.9 2-2 2H4v-2h17V7h2z" />
        </svg>
      ),
      show: isLogged,
    },
  ];

  return (
    <Offcanvas show={show} onHide={handleClose} style={{ width: "325px" }}>
      <Offcanvas.Header className="d-flex justify-content-center mb-4">
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

      <Offcanvas.Body>
        <Row className="px-3">
          {navItems.map(
            (navItem: any) =>
              navItem.show && (
                <Col key={navItem.navItemId} lg={12} className="mb-4">
                  <Link
                    href={{
                      pathname: navItem.href.pathname,
                      query: navItem.href.query,
                    }}
                  >
                    <a className="font-weight-600">
                      <div className="d-flex align-items-center">
                        <div className="me-3">{navItem.icon}</div>

                        <div>
                          <span className="font-size-lg">{navItem.name}</span>
                        </div>
                      </div>
                    </a>
                  </Link>
                </Col>
              )
          )}
        </Row>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

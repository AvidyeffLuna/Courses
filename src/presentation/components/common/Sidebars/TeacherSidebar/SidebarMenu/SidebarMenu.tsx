import Link from "next/link";
import { useRouter } from "next/router";
import { TeacherCoursesRoutesEnum } from "presentation/routes/TeacherRoutes/coursesRoutes";
import { TeacherDashboardRoutesEnum } from "presentation/routes/TeacherRoutes/dashboardRoutes";
import { useId } from "react";

export default function SidebarMenu() {
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
    if (router.pathname.includes(path)) return true;

    return false;
  };

  return (
    <div className="px-3">
      {navs.map((nav: any) => (
        <Link key={nav.navId} href={nav.pathname}>
          <a
            className={
              getCurrentPath(nav.pathname)
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <div className="me-3">
              <i className={nav.icon} />
            </div>

            <div className="sidebar-item-text">
              <span>{nav.name}</span>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}

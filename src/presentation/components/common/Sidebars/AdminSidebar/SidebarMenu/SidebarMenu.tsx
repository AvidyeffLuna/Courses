import Link from "next/link";
import { useRouter } from "next/router";
import { AdminDashboardRoutesEnum } from "presentation/routes/AdminRoutes/dashboardRoutes";
import { AdminSalesRoutesEnum } from "presentation/routes/AdminRoutes/salesRoutes";
import { AdminTeachersRoutesEnum } from "presentation/routes/AdminRoutes/teachersRoutes";
import { AdminUsersRoutesEnum } from "presentation/routes/AdminRoutes/usersRoutes";
import { useId } from "react";

export default function SidebarMenu() {
  const router = useRouter();

  const navs = [
    {
      navId: useId(),
      name: "Tablero",
      icon: "fa-solid fa-chart-pie",
      pathname: AdminDashboardRoutesEnum.Dashboard,
    },
    {
      navId: useId(),
      name: "Usuarios",
      icon: "fa-solid fa-user-group",
      pathname: AdminUsersRoutesEnum.UsersList,
    },
    {
      navId: useId(),
      name: "Instructores",
      icon: "fa-solid fa-person-chalkboard",
      pathname: AdminTeachersRoutesEnum.TeachersList,
    },
    {
      navId: useId(),
      name: "Pagos",
      icon: "fa-solid fa-money-bill",
      pathname: AdminSalesRoutesEnum.SalesList,
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

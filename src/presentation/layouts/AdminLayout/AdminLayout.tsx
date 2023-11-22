import AdminNavbar from "presentation/components/common/Navbars/AdminNavbar/AdminNavbar";
import AdminSidebar from "presentation/components/common/Sidebars/AdminSidebar/AdminSidebar";

interface IAdminLayoutProps {
  children: JSX.Element | JSX.Element[];
  isLogged: boolean;
}

export default function AdminLayout({ children, isLogged }: IAdminLayoutProps) {
  return (
    <>
      <aside
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          bottom: "0",
          width: "250px",
          zIndex: 999,
        }}
      >
        <AdminSidebar />
      </aside>

      <main className="main-content--sidebar">
        <header>
          <AdminNavbar isLogged={isLogged} />
        </header>

        <div className="main-content w-100">{children}</div>
      </main>
    </>
  );
}

import TeacherNavbar from "presentation/components/common/Navbars/TeacherNavbar/TeacherNavbar";
import TeacherSidebar from "presentation/components/common/Sidebars/TeacherSidebar/TeacherSidebar";

interface ITeacherLayoutProps {
  children: JSX.Element | JSX.Element[];
  isLogged: boolean;
}

export default function TeacherLayout({
  children,
  isLogged,
}: ITeacherLayoutProps) {
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
        <TeacherSidebar />
      </aside>

      <main className="main-content--sidebar">
        <header>
          <TeacherNavbar isLogged={isLogged} />
        </header>

        <div className="main-content w-100">{children}</div>
      </main>
    </>
  );
}

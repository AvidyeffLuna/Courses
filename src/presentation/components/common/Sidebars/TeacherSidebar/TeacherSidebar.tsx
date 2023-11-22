import SidebarHeader from "./SidebarHeader/SidebarHeader";
import SidebarMenu from "./SidebarMenu/SidebarMenu";

export default function TeacherSidebar() {
  return (
    <div className="sidebar bg-white d-lg-block d-md-none d-sm-none d-none">
      <div className="sidebar-body">
        <div className="sidebar-header">
          <SidebarHeader />
        </div>

        <div className="sidebar-content">
          <SidebarMenu />
        </div>
      </div>
    </div>
  );
}

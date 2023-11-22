import { useState } from "react";
import AdminSidebarMobile from "../../Sidebars/AdminSidebar/AdminSidebarMobile";
import Account from "./Account/Account";
import Logo from "./Logo/Logo";

interface IAdminNavbarProps {
  isLogged: boolean;
}

export default function AdminNavbar({ isLogged }: IAdminNavbarProps) {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleShow = () => setShowSidebar(true);
  const handleClose = () => setShowSidebar(false);

  return (
    <nav className="navbar py-0" style={{ height: "60px" }}>
      <div className="navbar-wrapper">
        <div className="navbar-content">
          <div className="navbar-logo d-lg-none d-md-block d-sm-block d-block py-1">
            <Logo handleShow={handleShow} />
          </div>

          <div className="navbar-logo d-lg-block d-md-none d-sm-none d-none py-1" />

          <div className="navbar-account py-1">
            {/* <div className="me-4">
              <Notifications />
  </div> */}

            <div>
              <Account />
            </div>
          </div>
        </div>
      </div>

      <div>
        <AdminSidebarMobile show={showSidebar} handleClose={handleClose} />
      </div>
    </nav>
  );
}

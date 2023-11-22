import { useState } from "react";
import TeacherSidebarMobile from "../../Sidebars/TeacherSidebar/TeacherSidebarMobile";
import Account from "./Account/Account";
import Logo from "./Logo/Logo";
import Options from "./Options/Options";

interface ITeacherNavbarProps {
  isLogged: boolean;
}

export default function TeacherNavbar({ isLogged }: ITeacherNavbarProps) {
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
            <div>
              <Options isLogged={isLogged} />
            </div>

            <div>
              <Account />
            </div>
          </div>
        </div>
      </div>

      <div>
        <TeacherSidebarMobile show={showSidebar} handleClose={handleClose} />
      </div>
    </nav>
  );
}

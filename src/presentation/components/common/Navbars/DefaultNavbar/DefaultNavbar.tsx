import { useState } from "react";
import DefaultSidebar from "../../Sidebars/DefaultSidebar/DefaultSidebar";
import Account from "./Account/Account";
import Logo from "./Logo/Logo";
import Menu from "./Menu/Menu";
import Options from "./Options/Options";

interface IDefaultNavbarProps {
  isLogged: boolean;
}

export default function DefaultNavbar({ isLogged }: IDefaultNavbarProps) {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleShow = () => setShowSidebar(true);
  const handleClose = () => setShowSidebar(false);

  return (
    <nav className="navbar navbar-fixed">
      <div className="navbar-wrapper">
        <div className="navbar-content">
          <div className="d-flex align-items-center">
            <div className="navbar-logo">
              <Logo handleShow={handleShow} />
            </div>

            <div className="navbar-menu">
              <Menu />
            </div>
          </div>

          <div className="navbar-account">
            <div className="me-4">
              <Options isLogged={isLogged} />
            </div>

            <div>
              <Account isLogged={isLogged} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <DefaultSidebar
          show={showSidebar}
          handleClose={handleClose}
          isLogged={isLogged}
        />
      </div>
    </nav>
  );
}

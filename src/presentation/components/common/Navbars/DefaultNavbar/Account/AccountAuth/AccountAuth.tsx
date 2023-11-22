import {
  AuthContext,
  IAuthContext,
} from "application/context/Auth/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { AccountRoutesEnum } from "presentation/routes/accountRoutes";
import { useContext } from "react";
import { Dropdown } from "react-bootstrap";

export default function AccountAuth() {
  const { state } = useContext<IAuthContext>(AuthContext);
  const { data: user } = state.user;

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant=""
        className="dropdown-toggle--not py-0 px-0"
        id="dropdown-account-options"
        style={{ border: "1px solid transparent", float: "right" }}
      >
        <div className="bg-body-dark">
          <div
            style={{
              position: "relative",
              width: "50px",
              height: "50px",
              borderRadius: "2rem",
              overflow: "hidden",
            }}
          >
            {user?.profilePictureUrl ? (
              <Image
                src={user.profilePictureUrl}
                alt={`profile-${user.firstName}-${user.lastName}`}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <Image
                src="/static/media/icons/account-avatar.png"
                alt="account-icon"
                layout="fill"
                objectFit="cover"
                priority
              />
            )}
          </div>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Link href={AccountRoutesEnum.Edit}>
          <a className="dropdown-item">
            <div className="d-flex px-3">
              <div className="me-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <g>
                    <path d="M0,0h24v24H0V0z" fill="none" />
                  </g>
                  <g>
                    <g>
                      <circle cx="10" cy="8" r="4" />
                      <path d="M10.67,13.02C10.45,13.01,10.23,13,10,13c-2.42,0-4.68,0.67-6.61,1.82C2.51,15.34,2,16.32,2,17.35V20h9.26 C10.47,18.87,10,17.49,10,16C10,14.93,10.25,13.93,10.67,13.02z" />
                      <path d="M20.75,16c0-0.22-0.03-0.42-0.06-0.63l1.14-1.01l-1-1.73l-1.45,0.49c-0.32-0.27-0.68-0.48-1.08-0.63L18,11h-2l-0.3,1.49 c-0.4,0.15-0.76,0.36-1.08,0.63l-1.45-0.49l-1,1.73l1.14,1.01c-0.03,0.21-0.06,0.41-0.06,0.63s0.03,0.42,0.06,0.63l-1.14,1.01 l1,1.73l1.45-0.49c0.32,0.27,0.68,0.48,1.08,0.63L16,21h2l0.3-1.49c0.4-0.15,0.76-0.36,1.08-0.63l1.45,0.49l1-1.73l-1.14-1.01 C20.72,16.42,20.75,16.22,20.75,16z M17,18c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S18.1,18,17,18z" />
                    </g>
                  </g>
                </svg>
              </div>

              <div className="mt-1">
                <p className="font-size-md">Mi perfil</p>
              </div>
            </div>
          </a>
        </Link>

        <Link href={AccountRoutesEnum.Logout}>
          <a className="dropdown-item">
            <div className="d-flex px-3">
              <div className="me-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <g>
                    <path d="M0,0h24v24H0V0z" fill="none" />
                  </g>
                  <g>
                    <path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z" />
                  </g>
                </svg>
              </div>

              <div className="mt-1">
                <p className="font-size-md">Salir de mi cuenta</p>
              </div>
            </div>
          </a>
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
}

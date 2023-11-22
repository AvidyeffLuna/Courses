import {
  AuthContext,
  IAuthContext,
} from "application/context/Auth/AuthContext";
import Image from "next/image";
import Link from "next/link";
import Loading from "presentation/components/common/core/Loading/Loading";
import { AccountRoutesEnum } from "presentation/routes/accountRoutes";
import { useContext } from "react";
import { Dropdown } from "react-bootstrap";

export default function AccountAuth() {
  const { state } = useContext<IAuthContext>(AuthContext);
  const { data: teacher, loading } = state.teacher;

  if (loading || !teacher) return <Loading />;

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
              width: "40px",
              height: "40px",
              borderRadius: "2rem",
              overflow: "hidden",
            }}
          >
            {teacher?.profilePictureUrl ? (
              <Image
                src={teacher.profilePictureUrl}
                alt={`profile-${teacher.firstName}-${teacher.lastName}`}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <Image
                src="/static/media/icons/account-avatar.png"
                alt="project-icon"
                layout="fill"
                objectFit="cover"
                priority
              />
            )}
          </div>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Link href={AccountRoutesEnum.Logout}>
          <a className="dropdown-item">
            <div className="d-flex px-2">
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

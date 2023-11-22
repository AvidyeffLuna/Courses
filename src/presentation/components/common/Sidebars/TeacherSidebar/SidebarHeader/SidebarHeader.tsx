import Image from "next/image";
import Link from "next/link";
import { TeacherDashboardRoutesEnum } from "presentation/routes/TeacherRoutes/dashboardRoutes";

export default function SidebarHeader() {
  return (
    <div className="d-flex justify-content-center w-100">
      <Link href={TeacherDashboardRoutesEnum.Dashboard}>
        <a title={`Inicio de ${process.env.appName}`}>
          <div
            style={{
              position: "relative",
              width: "250px",
              height: "110px",
            }}
          >
            <Image
              src="/pad-logo.png"
              alt={`${process.env.appName} Logo`}
              title={process.env.appName}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </a>
      </Link>
    </div>
  );
}

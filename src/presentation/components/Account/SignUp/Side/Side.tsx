import * as Styles from "./SideStyles";
import Image from "next/image";
import Link from "next/link";
import { MainRoutesEnum } from "presentation/routes/mainRoutes";

export default function Side() {
  return (
    <Styles.SideWrapper>
      <Styles.SideContent>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100%" }}
        >
          <Link href={MainRoutesEnum.Init}>
            <a>
              <div
                style={{
                  position: "relative",
                  width: "500px",
                  height: "200px",
                }}
              >
                <Image
                  src="/pad-logo-white.png"
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
      </Styles.SideContent>

      <Styles.SideBackdrop />
    </Styles.SideWrapper>
  );
}

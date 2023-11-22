import Image from "next/image";
import Link from "next/link";
import { Row, Col } from "react-bootstrap";

export default function Logo() {
  return (
    <Row>
      <Col lg={12} className="mb-5">
        <Link
          href={{
            pathname: "/",
          }}
        >
          <a>
            <div
              style={{
                position: "relative",
                width: "250px",
                height: "110px",
                marginLeft: "-30px",
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
      </Col>

      <Col lg={12}>
        <div className="d-flex align-items-center">
          <Link href="/">
            <a className="btn btn-primary me-3" style={{ padding: "7px 15px" }}>
              <i className="fa-brands fa-facebook-f" />
            </a>
          </Link>

          <Link href="/">
            <a className="btn btn-primary me-3" style={{ padding: "7px 12px" }}>
              <i className="fa-brands fa-instagram" />
            </a>
          </Link>

          <Link href="/">
            <a className="btn btn-primary me-3" style={{ padding: "7px 12px" }}>
              <i className="fa-brands fa-twitter" />
            </a>
          </Link>
        </div>
      </Col>
    </Row>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Col } from "react-bootstrap";
import * as Styles from "./ServiceStyles";

interface IServiceProps {
  title: string;
  icon: string;
  description: string;
  href: string;
}

export default function Service({
  title,
  icon,
  description,
  href,
}: IServiceProps) {
  return (
    <Styles.ServiceWrapper className="text-center">
      <Col lg={12} className="d-flex justify-content-center mb-3">
        <div
          style={{
            position: "relative",
            width: "75px",
            height: "75px",
          }}
        >
          <Image
            src={icon}
            alt="Service item"
            title="Services"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </Col>

      <Col lg={12} className="mb-3">
        <h4 className="text-primary">{title}</h4>
      </Col>

      <Col lg={12} className="mb-3">
        <p className="font-size-md">{description}</p>
      </Col>

      <Col lg={12}>
        <Link href={href}>
          <a className="btn btn-outline-primary">Ver más</a>
        </Link>
      </Col>
    </Styles.ServiceWrapper>
  );
}

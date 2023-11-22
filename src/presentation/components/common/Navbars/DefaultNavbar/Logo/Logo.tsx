import { Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

interface ILogoProps {
  handleShow: () => void;
}

export default function Logo({ handleShow }: ILogoProps) {
  return (
    <div className="d-flex align-items-center">
      <div className="me-3">
        <Button onClick={handleShow} variant="" className="py-0 px-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="28px"
            viewBox="0 0 24 24"
            width="28px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </Button>
      </div>

      <div>
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
    </div>
  );
}

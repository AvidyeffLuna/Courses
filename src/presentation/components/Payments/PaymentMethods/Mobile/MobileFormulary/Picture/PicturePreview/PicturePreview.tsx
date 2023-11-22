import { IFile } from "domain/core/entities/fileEntity";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Button, Col, Row } from "react-bootstrap";

interface IPictureViewProps {
  url: string;
  setFile: Dispatch<SetStateAction<IFile>>;
}

export default function PicturePreview({ url, setFile }: IPictureViewProps) {
  return (
    <Row>
      <Col lg={12} className="mb-3">
        <div
          style={{
            position: "relative",
            width: "250px",
            height: "250px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Image
            src={url}
            alt="profile-picture-preview"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </Col>

      <Col lg={12} className="text-center">
        <div style={{ width: "250px" }}>
          <Button
            type="button"
            variant="danger"
            className="px-3 py-1"
            onClick={() => setFile({} as IFile)}
          >
            <span className="font-size-md font-weight-normal text-white">
              Eliminar foto del comprobante
            </span>
          </Button>
        </div>
      </Col>
    </Row>
  );
}

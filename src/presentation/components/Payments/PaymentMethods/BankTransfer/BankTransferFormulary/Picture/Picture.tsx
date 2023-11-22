import { IFile } from "domain/core/entities/fileEntity";
import { Dispatch, SetStateAction } from "react";
import { Col, Row, Form } from "react-bootstrap";
import PicturePreview from "./PicturePreview/PicturePreview";
import UploadPicture from "./UploadPicture/UploadPicture";

interface IPictureProps {
  file: IFile;
  setFile: Dispatch<SetStateAction<IFile>>;
}

export default function Picture({ file, setFile }: IPictureProps) {
  return (
    <Row>
      <Col lg={12}>
        <Form.Label>Subir comprobante (no obligatorio)</Form.Label>
      </Col>

      <Col lg={12}>
        {file.url ? (
          <PicturePreview setFile={setFile} url={file.url} />
        ) : (
          <UploadPicture setFile={setFile} />
        )}
      </Col>
    </Row>
  );
}

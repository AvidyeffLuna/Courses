import { IFile } from "domain/core/entities/fileEntity";
import FieldFile from "presentation/components/common/Formulary/Field/FieldFile/FieldFile";
import { Dispatch, SetStateAction } from "react";
import { Col, Row } from "react-bootstrap";

interface IUploadPictureProps {
  setFile: Dispatch<SetStateAction<IFile>>;
}

export default function UploadPicture({ setFile }: IUploadPictureProps) {
  return (
    <Row>
      <Col lg={12}>
        <FieldFile
          setFile={setFile}
          accept="image/png, image/gif, image/jpeg"
        />
      </Col>
    </Row>
  );
}

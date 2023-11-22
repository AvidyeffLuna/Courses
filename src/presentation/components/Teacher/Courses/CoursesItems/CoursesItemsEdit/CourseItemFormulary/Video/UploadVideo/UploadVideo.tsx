import { IFile } from "domain/core/entities/fileEntity";
import FieldFile from "presentation/components/common/Formulary/Field/FieldFile/FieldFile";
import { Dispatch, SetStateAction } from "react";
import { Col, Row } from "react-bootstrap";

interface IUploadVideoProps {
  setFile: Dispatch<SetStateAction<IFile>>;
}

export default function UploadVideo({ setFile }: IUploadVideoProps) {
  return (
    <Row>
      <Col lg={12} style={{ height: "400px" }}>
        <FieldFile fileType="video" setFile={setFile} />
      </Col>
    </Row>
  );
}

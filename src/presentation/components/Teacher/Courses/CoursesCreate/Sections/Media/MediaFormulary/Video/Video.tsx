import { IFile } from "domain/core/entities/fileEntity";
import { Dispatch, SetStateAction } from "react";
import { Col, Row, Form } from "react-bootstrap";
import VideoPreview from "./VideoPreview/VideoPreview";
import UploadVideo from "./UploadVideo/UploadVideo";

interface IVideoProps {
  file: IFile;
  setFile: Dispatch<SetStateAction<IFile>>;
}

export default function Video({ file, setFile }: IVideoProps) {
  return (
    <Row>
      <Col lg={12}>
        <Form.Label>Sube un video de presentación para este curso</Form.Label>
      </Col>

      <Col lg={12}>
        {file.url ? (
          <VideoPreview setFile={setFile} url={file.url} />
        ) : (
          <UploadVideo setFile={setFile} />
        )}
      </Col>
    </Row>
  );
}

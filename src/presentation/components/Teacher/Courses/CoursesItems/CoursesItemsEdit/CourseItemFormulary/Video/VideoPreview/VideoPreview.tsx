import { IFile } from "domain/core/entities/fileEntity";
import VideoPlayer from "presentation/components/common/core/Video/VideoPlayer";
import { Button, Col, Row } from "react-bootstrap";

interface IPictureViewProps {
  url: string;
  setFile: (video: IFile) => void;
}

export default function VideoPreview({ url, setFile }: IPictureViewProps) {
  return (
    <Row>
      <Col lg={12} style={{ paddingBottom: "250px" }}>
        <div style={{ height: "400px", width: "100%" }}>
          <VideoPlayer videoUrl={url} autoPlay={false} />
        </div>
      </Col>

      <Col
        lg={12}
        className="text-end d-flex justify-content-end"
        style={{ marginTop: "-50px" }}
      >
        <Button
          type="button"
          variant="danger"
          className="px-5 py-0"
          onClick={() => setFile({} as IFile)}
        >
          <span className="font-size-md font-weight-normal text-white">
            Eliminar video
          </span>
        </Button>
      </Col>
    </Row>
  );
}

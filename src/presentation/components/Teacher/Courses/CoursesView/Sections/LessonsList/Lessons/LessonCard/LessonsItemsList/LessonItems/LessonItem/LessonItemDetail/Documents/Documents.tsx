import { IMedia } from "domain/core/entities/mediaEntity";
import FileDocument from "presentation/components/common/core/Files/FileDocument/FileDocument";
import { Col, Row } from "react-bootstrap";

interface IDocumentsProps {
  mediaList: IMedia[];
}

export default function Documents({ mediaList }: IDocumentsProps) {
  if (mediaList.length === 0) return <div />;

  return (
    <Row>
      <Col lg={12} className="mb-3">
        <h4>Documentos anexados</h4>
      </Col>

      {mediaList.map((media: IMedia) => (
        <Col key={media.url} lg={4} className="mb-4">
          <FileDocument
            name={media.name}
            url={media.url ?? ""}
            downloadButton
          />
        </Col>
      ))}
    </Row>
  );
}

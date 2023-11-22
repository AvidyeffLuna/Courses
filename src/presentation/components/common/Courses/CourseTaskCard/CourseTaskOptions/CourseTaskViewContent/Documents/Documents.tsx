import { IMedia } from "domain/core/entities/mediaEntity";
import FileDocument from "presentation/components/common/core/Files/FileDocument/FileDocument";
import { Col, Row } from "react-bootstrap";

interface IDocumentsProps {
  documents: IMedia[];
}

export default function Documents({ documents }: IDocumentsProps) {
  if (documents.length === 0) return <div />;

  return (
    <Row>
      <Col
        lg={12}
        className="d-flex align-items-center overflow-auto"
        style={{ maxWidth: "1000px" }}
      >
        {documents.length > 0 &&
          documents.map((document: IMedia) => (
            <div key={document.url} className="text-center me-3">
              <div className="d-flex justify-content-center mb-3">
                <FileDocument
                  name={document.name}
                  url={document.url ?? ""}
                  downloadButton
                />
              </div>
            </div>
          ))}
      </Col>
    </Row>
  );
}

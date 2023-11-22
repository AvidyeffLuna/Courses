import { IFile } from "domain/core/entities/fileEntity";
import FileDocument from "presentation/components/common/core/Files/FileDocument/FileDocument";
import FieldFile from "presentation/components/common/Formulary/Field/FieldFile/FieldFile";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button, Col, Row, Form } from "react-bootstrap";

interface IDocumentsProps {
  files: IFile[];
  documents: IFile[];
  setDocuments: Dispatch<SetStateAction<IFile[]>>;
}

const MAX_DOCUMENTS = 3;

export default function Documents({
  files,
  documents,
  setDocuments,
}: IDocumentsProps) {
  const [document, setDocument] = useState<IFile>({} as IFile);

  const onAddDocument = useCallback(() => {
    if (documents.length < MAX_DOCUMENTS) {
      setDocuments([...files, document]);
      setDocument({} as IFile);
    }
  }, [document, documents.length, files, setDocuments]);

  useEffect(() => {
    if (document.file && documents.length < 10) onAddDocument();
  }, [onAddDocument, document.file, documents.length]);

  return (
    <Row>
      <Col lg={12} className="mb-3">
        <Form.Label>Anexar documentos</Form.Label>
      </Col>

      <Col
        lg={12}
        className="d-flex align-items-center overflow-auto"
        style={{ maxWidth: "1000px" }}
      >
        {documents.length > 0 &&
          documents.map((document: IFile) => (
            <div key={document.url} className="text-center me-3">
              <div className="d-flex justify-content-center mb-3">
                <FileDocument
                  name={document.file?.name ?? document.name}
                  url={document.url ?? ""}
                />
              </div>

              <div>
                <Button
                  type="button"
                  variant="danger"
                  onClick={() =>
                    setDocuments(
                      files.filter(
                        (documentDelete) => documentDelete.url !== document.url
                      )
                    )
                  }
                  className="btn-xs"
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}

        {documents.length < MAX_DOCUMENTS && (
          <div>
            <FieldFile
              fileType="document"
              setFile={setDocument}
              size="85px"
              accept="application/pdf, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .doc, .docx, application/msword, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/vnd.openxmlformats-officedocument.presentationml.presentation, .pps, .txt, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
          </div>
        )}
      </Col>
    </Row>
  );
}

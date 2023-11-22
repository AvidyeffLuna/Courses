import { IFile } from "domain/core/entities/fileEntity";
import FileImage from "presentation/components/common/core/Files/FileImage/FileImage";
import FieldFile from "presentation/components/common/Formulary/Field/FieldFile/FieldFile";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";

interface IPictureProps {
  file: IFile;
  setFile: Dispatch<SetStateAction<IFile>>;
}

export default function Picture({ file, setFile }: IPictureProps) {
  const onAddPicture = useCallback(() => {
    setFile(file);
  }, [file, setFile]);

  useEffect(() => {
    if (file.file) onAddPicture();
  }, [file, onAddPicture]);

  return (
    <Row>
      <Col lg={12} className="mb-3">
        <Form.Label>Subir imagen principal del curso</Form.Label>
      </Col>

      <Col
        lg={12}
        className="d-flex align-items-center overflow-auto"
        style={{ width: "100%" }}
      >
        {file.url && (
          <div key={file.url} className="text-center me-3">
            <div className="d-flex justify-content-center mb-3">
              <FileImage url={file.url ?? ""} alt="Course main" size="400px" />
            </div>

            <div>
              <Button
                type="button"
                variant="danger"
                onClick={() => setFile({} as IFile)}
                className="btn-xs"
              >
                Eliminar
              </Button>
            </div>
          </div>
        )}

        {!file.url && (
          <div className="w-100" style={{ height: "400px" }}>
            <FieldFile
              setFile={setFile}
              size="85px"
              accept="image/png, image/gif, image/jpeg"
            />
          </div>
        )}
      </Col>
    </Row>
  );
}

import { IFile } from "domain/core/entities/fileEntity";
import { IMedia } from "domain/core/entities/mediaEntity";
import FileImage from "presentation/components/common/core/Files/FileImage/FileImage";
import ModalMediaList from "presentation/components/common/core/Modals/ModalMediaList";
import FieldFile from "presentation/components/common/Formulary/Field/FieldFile/FieldFile";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button, Col, Row } from "react-bootstrap";

interface IPreviewPicturesProps {
  files: IFile[];
  pictures: IFile[];
  setPictures: Dispatch<SetStateAction<IFile[]>>;
}

const MAX_PICTURES = 6;

export default function PreviewPictures({
  files,
  pictures,
  setPictures,
}: IPreviewPicturesProps) {
  const [picture, setPicture] = useState<IFile>({} as IFile);
  const [mediaSelected, setMediaSelected] = useState<IMedia | null>(null);
  const [mediaList, setMediaList] = useState<IMedia[]>([]);

  const [showModalMediaList, setShowModalMediaList] = useState(false);

  const onShowModalMediaList = (pictureSelected: IFile) => {
    const mediaListMap: IMedia[] = [];

    pictures.map((picture: IFile) => {
      mediaListMap.push({
        url: picture.url,
        type: picture.type,
      } as IMedia);
    });

    setMediaSelected({
      url: pictureSelected.url,
      type: pictureSelected.type,
    } as IMedia);
    setMediaList(mediaListMap);
    setShowModalMediaList(true);
  };

  const onAddPicture = useCallback(() => {
    if (pictures.length < MAX_PICTURES) {
      setPictures([...files, picture]);
      setPicture({} as IFile);
    }
  }, [files, picture, pictures.length, setPictures]);

  useEffect(() => {
    if (picture.file && pictures.length < 10) onAddPicture();
  }, [onAddPicture, picture.file, pictures.length]);

  return (
    <Row>
      <Col lg={12} className="mb-3">
        <h4>Anexar imagenes</h4>
      </Col>

      <Col
        lg={12}
        className="d-flex align-items-center overflow-auto"
        style={{ maxWidth: "825px" }}
      >
        {pictures.length > 0 &&
          pictures.map((picture: IFile) => (
            <div key={picture.url} className="text-center me-3">
              <div className="d-flex justify-content-center mb-3">
                <Button
                  variant=""
                  onClick={() => onShowModalMediaList(picture)}
                  className="py-0 px-0"
                >
                  <FileImage
                    url={picture.url ?? ""}
                    alt="upload-pictures"
                    size="150px"
                  />
                </Button>
              </div>

              <div>
                <Button
                  type="button"
                  variant="danger"
                  onClick={() =>
                    setPictures(
                      files.filter(
                        (pictureDelete) => pictureDelete.url !== picture.url
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

        {pictures.length < MAX_PICTURES && (
          <div>
            <FieldFile
              setFile={setPicture}
              size="85px"
              accept="image/png, image/gif, image/jpeg"
            />
          </div>
        )}
      </Col>

      {showModalMediaList && (
        <ModalMediaList
          show={showModalMediaList}
          onHide={() => setShowModalMediaList(false)}
          mediaList={mediaList}
          initMediaSelected={mediaSelected}
        />
      )}
    </Row>
  );
}

import { IMedia } from "domain/core/entities/mediaEntity";
import { useCallback, useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Header from "./Header/Header";
import ImagesSlider from "./ImagesSlider/ImagesSlider";
import MainImage from "./MainImage/MainImage";

interface IModalMediaListProps {
  show: boolean;
  onHide: () => void;
  mediaList: IMedia[];
  initMediaSelected?: IMedia | null;
}

export default function ModalMediaList({
  show,
  onHide,
  mediaList,
  initMediaSelected,
}: IModalMediaListProps) {
  const [mediaSelected, setMediaSelected] = useState(
    mediaList.length > 0 ? mediaList[0] : ({} as IMedia)
  );

  const getInitMediaSelected = useCallback(() => {
    if (initMediaSelected) {
      setMediaSelected(initMediaSelected);
    } else if (mediaList.length > 0) {
      setMediaSelected(mediaList[0]);
    }
  }, [initMediaSelected, mediaList]);

  useEffect(() => {
    getInitMediaSelected();
  }, [getInitMediaSelected]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      animation={false}
      fullscreen
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="overflow-hidden py-0 px-0">
        <Row className="overflow-hidden bg-dark" style={{ height: "100vh" }}>
          <Col lg={12}>
            <Header onHide={onHide} />
          </Col>

          {mediaSelected.url?.length > 0 && (
            <Col lg={12} className="mb-3">
              <MainImage
                media={mediaSelected}
                mediaList={mediaList}
                setMediaSelected={setMediaSelected}
              />
            </Col>
          )}

          {mediaList.length > 1 && (
            <Col lg={12}>
              <ImagesSlider
                mediaSelected={mediaSelected}
                setMediaSelected={setMediaSelected}
                mediaList={mediaList}
              />
            </Col>
          )}
        </Row>
      </Modal.Body>
    </Modal>
  );
}

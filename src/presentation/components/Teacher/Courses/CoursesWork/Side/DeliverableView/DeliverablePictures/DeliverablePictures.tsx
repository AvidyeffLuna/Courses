import { IMedia } from "domain/core/entities/mediaEntity";
import Image from "next/image";
import ModalMediaList from "presentation/components/common/core/Modals/ModalMediaList";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

interface IDeliverablePicturesProps {
  mediaList: IMedia[];
}

export default function DeliverablePictures({
  mediaList,
}: IDeliverablePicturesProps) {
  const [mediaSelected, setMediaSelected] = useState<IMedia | null | undefined>(
    null
  );
  const [showModalMediaList, setShowModalMediaList] = useState(false);

  const handleShowModalMediaList = (media?: IMedia | null) => {
    setMediaSelected(media);
    setShowModalMediaList(true);
  };

  if (mediaList.length === 0) return <div />;

  return (
    <Row>
      <Col lg={12} className="mb-3">
        <h4>Imagenes anexadas</h4>
      </Col>

      {mediaList.map((media: IMedia) => (
        <Col key={media.url} lg={6}>
          <div
            className="mb-4"
            style={{
              position: "relative",
              width: "300px",
              height: "300px",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <Button
              onClick={() => handleShowModalMediaList(media)}
              variant=""
              className="px-0 py-0"
            >
              <Image
                src={media.url}
                alt="deliverable-picture"
                layout="fill"
                objectFit="cover"
                priority
              />
            </Button>
          </div>
        </Col>
      ))}

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

import { IMedia } from "domain/core/entities/mediaEntity";
import ModalMediaList from "presentation/components/common/core/Modals/ModalMediaList";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

interface ICourseTaskPicturesProps {
  pictures: IMedia[];
}

export default function CourseTaskPictures({
  pictures,
}: ICourseTaskPicturesProps) {
  const [showModalMediaList, setShowModalMediaList] = useState(false);

  return (
    <Row>
      <Col lg={12}>
        <Button
          variant="link"
          className="py-0 px-0"
          onClick={() => setShowModalMediaList(true)}
        >
          <div className="d-flex">
            <div className="me-2">
              <i
                className="fa-solid fa-image icon-primary"
                style={{ fontSize: "20px" }}
              />
            </div>

            <div>
              <p className="text-primary">Ver imagenes</p>
            </div>
          </div>
        </Button>
      </Col>

      {showModalMediaList && (
        <ModalMediaList
          show={showModalMediaList}
          onHide={() => setShowModalMediaList(false)}
          mediaList={pictures}
        />
      )}
    </Row>
  );
}

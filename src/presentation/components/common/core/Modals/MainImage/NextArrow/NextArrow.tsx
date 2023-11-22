import { IMedia } from "domain/core/entities/mediaEntity";
import { Dispatch, SetStateAction } from "react";
import { Button, Col, Row } from "react-bootstrap";

interface INextArrowProps {
  media: IMedia;
  mediaList: IMedia[];
  setMediaSelected: Dispatch<SetStateAction<IMedia>>;
}

export default function NextArrow({
  media,
  mediaList,
  setMediaSelected,
}: INextArrowProps) {
  if (mediaList.length <= 1) return <div />;

  const getMediaSelectedIndex = (): number => {
    return mediaList.findIndex((mediaFind) => mediaFind.url === media.url);
  };

  const handleNextMedia = () => {
    const mediaSelectedIndex = getMediaSelectedIndex();

    if (mediaList[mediaSelectedIndex + 1])
      setMediaSelected(mediaList[mediaSelectedIndex + 1]);
  };

  return (
    <Row className="d-flex align-items-center" style={{ height: "100%" }}>
      <Col lg={12}>
        <Button
          variant="light"
          onClick={() => handleNextMedia()}
          style={{ padding: "4px 12px" }}
          disabled={getMediaSelectedIndex() === mediaList.length - 1}
        >
          <div className="mt-1">
            <i
              className="fa-solid fa-chevron-right icon-primary"
              style={{ fontSize: "25px" }}
            />
          </div>
        </Button>
      </Col>
    </Row>
  );
}

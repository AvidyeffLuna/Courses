import { Dispatch, SetStateAction, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import TagsList from "./TagsList/TagsList";

interface ITasProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

export default function Tags({ tags, setTags }: ITasProps) {
  const [value, setValue] = useState("");

  const onAddTagToList = () => {
    if (tags.indexOf(value) < 0 && tags.length < 5) {
      setTags([...tags, value]);
      setValue("");
    }
  };

  return (
    <Row>
      <Col lg={10} md={8} sm={8}>
        <Form.Group>
          <Form.Label>Escribe tags para este curso (máximo 5 tags)</Form.Label>

          <Form.Control
            type="text"
            value={value}
            onChange={(e: any) => setValue(e.target.value)}
            placeholder=""
          />
        </Form.Group>
      </Col>

      <Col lg={2} md={4} sm={4} className="d-flex align-items-center mt-4">
        <Button
          type="button"
          variant="dark-50"
          onClick={() => onAddTagToList()}
          className="w-100"
          disabled={value.length === 0}
        >
          <i className="fa-solid fa-plus icon-white" />
        </Button>
      </Col>

      <Col lg={12} className="mt-4">
        <TagsList tags={tags} setTags={setTags} />
      </Col>
    </Row>
  );
}

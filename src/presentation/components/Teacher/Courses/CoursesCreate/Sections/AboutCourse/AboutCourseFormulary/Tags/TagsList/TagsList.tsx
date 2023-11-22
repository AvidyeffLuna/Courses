import { Dispatch, SetStateAction } from "react";
import { Badge, Button } from "react-bootstrap";

interface ITagsListProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

export default function TagsList({ tags, setTags }: ITagsListProps) {
  if (tags.length === 0) return <div />;

  const onDeleteTagToList = (tag: string) => {
    setTags(tags.filter((tagDelete) => tagDelete !== tag));
  };

  return (
    <div
      className="overflow-auto d-xl-flex d-lg-block d-md-block d-sm-block align-items-center"
      style={{ maxWidth: "800px" }}
    >
      {tags.map((tag: string) => (
        <div key={tag} className="me-3 mb-3">
          <Badge bg="primary">
            <div className="d-flex justify-content-between align-items-center">
              <div className="me-3">{tag}</div>

              <div>
                <Button
                  type="button"
                  variant=""
                  onClick={() => onDeleteTagToList(tag)}
                  className="py-0 px-0"
                >
                  <svg
                    className="icon icon-white"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                  </svg>
                </Button>
              </div>
            </div>
          </Badge>
        </div>
      ))}
    </div>
  );
}

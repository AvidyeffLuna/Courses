import { Badge } from "react-bootstrap";

interface ICourseTagsProps {
  tags: string[];
}

export default function CourseTags({ tags }: ICourseTagsProps) {
  return (
    <div className="d-flex align-items-center">
      {tags.map((tag) => (
        <Badge key={tag} bg="primary" className="me-2">
          {tag}
        </Badge>
      ))}
    </div>
  );
}

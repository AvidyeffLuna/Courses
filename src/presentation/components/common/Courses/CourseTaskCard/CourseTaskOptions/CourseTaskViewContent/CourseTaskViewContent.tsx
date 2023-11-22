import { IMedia } from "domain/core/entities/mediaEntity";
import Documents from "./Documents/Documents";

interface ICourseTaskViewContentProps {
  show: "document" | "";
  documents?: IMedia[] | null;
}

export default function CourseTaskViewContent({
  show,
  documents,
}: ICourseTaskViewContentProps) {
  const getViewContentComponent = () => {
    switch (show) {
      case "document":
        return <Documents documents={documents ?? []} />;

      default:
        return <div />;
    }
  };

  return getViewContentComponent();
}

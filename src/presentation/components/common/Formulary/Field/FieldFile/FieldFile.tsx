import { IFile } from "domain/core/entities/fileEntity";
import { Dispatch, SetStateAction } from "react";
import { Form } from "react-bootstrap";

interface IFieldFileProps {
  fileType?: "image" | "video" | "document" | null;
  size?: string;
  setFile: Dispatch<SetStateAction<IFile>>;
  accept?: string | undefined;
}

export default function FieldFile({
  fileType = "image",
  size = "40px",
  setFile,
  accept,
}: IFieldFileProps) {
  const handleFile = (e: any) => {
    const fileTarget = e.target.files[0];
    const fileReader = new FileReader();

    const file: IFile = {
      file: null,
      url: null,
    };

    fileReader.readAsDataURL(fileTarget);
    file.file = fileTarget;
    file.url = URL.createObjectURL(fileTarget);
    file.type = fileType;

    setFile(file);
  };

  const getIconByType = () => {
    switch (fileType) {
      case "image":
        return (
          <svg
            className="icon icon-primary"
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            viewBox="0 0 24 24"
            width={size}
            fill="#000000"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
        );
      case "video":
        return (
          <svg
            className="icon icon-primary"
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            viewBox="0 0 24 24"
            width={size}
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
          </svg>
        );
      case "document":
        return (
          <svg
            className="icon icon-primary"
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            viewBox="0 0 24 24"
            width={size}
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
          </svg>
        );

      default:
        return (
          <svg
            className="icon icon-primary"
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            viewBox="0 0 24 24"
            width={size}
            fill="#000000"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
        );
    }
  };

  return (
    <Form.Group className="mb-3" style={{ height: "100%" }}>
      <div className="input-file" style={{ height: "100%" }}>
        <Form.Control
          type="file"
          className="input-file-control"
          onChange={(e: any) => handleFile(e)}
          accept={accept}
        />

        <div className="input-file-content" style={{ height: "100%" }}>
          <div className="d-flex align-items-center">{getIconByType()}</div>
        </div>
      </div>
    </Form.Group>
  );
}

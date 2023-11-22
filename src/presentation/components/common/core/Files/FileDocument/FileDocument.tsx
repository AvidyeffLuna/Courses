interface IFileDocumentProps {
  name?: string | null;
  url: string;
  downloadButton?: boolean;
}

export default function FileDocument({
  name,
  url,
  downloadButton = false,
}: IFileDocumentProps) {
  return (
    <div className="text-center">
      <div className="mb-3">
        <i
          className="fa-solid fa-file icon-primary"
          style={{ fontSize: "40px" }}
        />
      </div>

      <div
        className="text-overflow-vertical w-100"
        style={{ WebkitLineClamp: 2, height: "40px" }}
      >
        <h5>{name}</h5>
      </div>

      {downloadButton && (
        <div style={{ marginLeft: "-20px" }}>
          <a
            href={url}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="btn btn-link text-primary py-0 px-0"
          >
            Descargar
          </a>
        </div>
      )}
    </div>
  );
}

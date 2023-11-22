import Image from "next/image";

interface IStudentImageProps {
  pictureUrl?: string | null;
}

export default function StudentImage({ pictureUrl }: IStudentImageProps) {
  return (
    <div className="d-flex justify-content-center">
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "200px",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {pictureUrl ? (
          <Image
            src={pictureUrl}
            alt="Student port main"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <Image
            src="/static/media/icons/account-avatar-2.png"
            alt="Student port main"
            layout="fill"
            objectFit="contain"
          />
        )}
      </div>
    </div>
  );
}

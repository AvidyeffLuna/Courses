import Image from "next/image";

interface ICourseImageProps {
  pictureUrl: string;
}

export default function CourseImage({ pictureUrl }: ICourseImageProps) {
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
        {pictureUrl && (
          <Image
            src={pictureUrl}
            alt="Course port main"
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
    </div>
  );
}

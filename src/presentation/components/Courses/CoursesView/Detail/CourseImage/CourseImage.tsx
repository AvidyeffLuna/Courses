import Image from "next/image";

interface ICourseImageProps {
  mainPictureUrl: string;
}

export default function CourseImage({ mainPictureUrl }: ICourseImageProps) {
  return (
    <div className="d-flex justify-content-center">
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <Image
          src={mainPictureUrl}
          alt="Course port main"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}

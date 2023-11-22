import Image from "next/image";

interface IProductImageProps {
  pictureUrl: string;
}

export default function ProductImage({ pictureUrl }: IProductImageProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100px",
        height: "100px",
        overflow: "hidden",
        borderRadius: "4px",
      }}
    >
      <Image
        src={pictureUrl}
        alt="hero-image-main"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}

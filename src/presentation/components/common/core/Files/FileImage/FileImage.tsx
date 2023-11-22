import Image from "next/image";

interface IFileImageProps {
  url: string;
  alt: string;
  size: string;
}

export default function FileImage({ url, alt, size }: IFileImageProps) {
  return (
    <div
      className="me-4"
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <Image src={url} alt={alt} layout="fill" objectFit="cover" />
    </div>
  );
}

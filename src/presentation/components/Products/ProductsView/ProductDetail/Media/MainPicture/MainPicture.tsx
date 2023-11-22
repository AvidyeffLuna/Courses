import Image from "next/image";

export default function MainPicture() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "600px",
      }}
    >
      <Image
        src="https://i.pinimg.com/564x/99/a9/fc/99a9fce245dbeb1c8808bc3d4a32c5c6.jpg"
        alt="Product main picture"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}

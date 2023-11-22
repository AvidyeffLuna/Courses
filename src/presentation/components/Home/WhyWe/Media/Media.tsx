import Image from "next/image";
import React from "react";

export default function Media() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        overflow: "hidden",
        borderRadius: "8px",
      }}
    >
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/pad-tech-c127c.appspot.com/o/home%2Fabout_1_2.jpg?alt=media&token=319d2738-0a45-46d7-8c32-93e049e20ee2"
        alt="Innovate media"
        title="Innovate media"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}

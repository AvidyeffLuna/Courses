import Image from "next/image";
import React from "react";

export default function Media() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "700px",
        overflow: "hidden",
        borderRadius: "8px",
      }}
    >
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/pad-tech-c127c.appspot.com/o/home%2Fabout_1_1-1.png?alt=media&token=25cb0db1-a682-4f9b-bb96-5b36634518de"
        alt="Innovate media"
        title="Innovate media"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}

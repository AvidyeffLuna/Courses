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
        src="https://firebasestorage.googleapis.com/v0/b/pad-tech-c127c.appspot.com/o/home%2FStartup%20managers%20presenting%20and%20analyzing%20sales%20growth%20chart.jpg?alt=media&token=501c805a-8957-4763-ac20-92b23fca62b5"
        alt="Trust media"
        title="Trust media"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}

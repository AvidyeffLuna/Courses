/* eslint-disable import/no-named-as-default */
import React, { useRef } from "react";
import VideoJS from "./VideoJS/VideoJS";

export default function VideoPlayer({ videoUrl, autoPlay }) {
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: autoPlay,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoUrl,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("waiting", () => {});

    player.on("dispose", () => {});
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </div>
  );
}

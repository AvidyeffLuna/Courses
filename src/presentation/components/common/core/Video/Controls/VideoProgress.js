import React from "react";
import Slider from "rc-slider";

export default function VideoProgress({ playerState, handleVideoProgress }) {
  return (
    <Slider
      min={0}
      max={100}
      step={0.25}
      value={playerState.progress}
      onChange={(value) => handleVideoProgress(value)}
    />
  );
}

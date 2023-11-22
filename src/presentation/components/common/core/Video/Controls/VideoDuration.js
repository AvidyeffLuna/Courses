import React from "react";

export default function VideoDuration({ playerState }) {
  return (
    <div className="mt-2">
      <span className="text-white">
        {playerState.currentDuration.minutes}:
        {playerState.currentDuration.seconds < 10
          ? `0${playerState.currentDuration.seconds}`
          : playerState.currentDuration.seconds}{" "}
      </span>
      <span className="text-white">/ </span>
      {playerState.duration && (
        <span className="text-white">
          {playerState.duration.minutes}:
          {playerState.duration.seconds < 10
            ? `0${playerState.duration.seconds}`
            : playerState.duration.seconds}
        </span>
      )}
    </div>
  );
}

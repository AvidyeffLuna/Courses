import React from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";

export default function VideoPlayPause({
  playerState,
  togglePlay,
  handleReply,
}) {
  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip
          className="tooltip--video tooltip--video-play"
          id="button-play-pause-video"
        >
          {playerState.isFinish
            ? "Volver a reproducir"
            : !playerState.isPlaying
            ? "Reproducir"
            : "Pausa"}
        </Tooltip>
      }
    >
      <Button
        onClick={
          playerState.isFinish ? () => handleReply() : () => togglePlay()
        }
        variant=""
      >
        {playerState.isFinish ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
          </svg>
        ) : !playerState.isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        )}
      </Button>
    </OverlayTrigger>
  );
}

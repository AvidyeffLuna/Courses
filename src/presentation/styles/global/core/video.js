import { colors, font } from "../../variables/defaultVariables";

export const videoStyles = `
  video {
    width: 100%;
  }

  .vjs {
    &-control-bar {
      background-color: rgba(56, 72, 97, .6) !important;
      height: 4em !important;
    }

    &-control {
      &:focus {
        text-shadow: 0em 0em 0em transparent !important;
      }
    }

    &-paused {
      &:hover {
        .vjs-big-play-button {
          .vjs-icon-placeholder {
            color: ${colors.primary.main} !important;
          }
        }
      }
    }

    &-big-play-button {
      background-color: rgba(56, 72, 97, .6) !important;
      border-color: transparent !important;
      transition: 0.3s;

      .vjs-icon-placeholder {
        font-size: 50px !important;
        transition: 0.3s;
      }
    }

    &-volume-control {
      margin-top: 5px !important;
    }

    &-volume-level,
    &-play-progress {
      background: ${colors.primary.main} !important;
    }

    &-load-progress {
      div {
        &:first-child {
          background-color: rgba(255, 255, 255, 0.3) !important;
        }
      }
    }

    &-remaining-time {
      margin-top: 5px !important;
    }

    &-remaining-time-display,
    &-icon-placeholder {
      font-size: 14px;
      color: ${colors.white} !important;
    }

    &-icon-placeholder {
      font-size: 14px !important;
    }

    &-remaining-time-display {
      font-family: ${font.family.primary} !important;
    }

    &-loading-spinner {
      border: 6px solid rgba(56, 72, 97, .6) !important;

      &:before,
      &:after {
        border-top-color: ${colors.primary.main} !important;
      }
    }
  }

  .video {
      &-wrapper {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        overflow: hidden;

        &:hover {
          .video-controls {
            opacity: 1;
          }
        }
      }

      &-controls {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          transition: 0.3s;

          &-progress {
            width: 100%;
            height: 8px;
            cursor: pointer;

            &:hover {
              .rc-slider-slider,
              .rc-slider-track {
                height: 4px;
              }

              .rc-slider-handle {
                opacity: 1;
              }
            }

            .rc-slider {
              &-rail {
                height: 3px;
                background-color: rgba(255, 255, 255, .2) !important;
              }
            
              &-track {
                height: 3px;
                border-radius: 0;
                background-color: ${colors.primary.main} !important;
              }
            
              &-handle {
                opacity: 0;
                background-color: ${colors.primary.main} !important;
                border: 1px solid ${colors.primary.main} !important;
            
                &:active {
                  box-shadow: none !important;
                }
              }
            }
          }

          &-play {
            svg {
                fill: rgba(255, 255, 255, .8);
                width: 25px;
                height: 25px;
            }
          }

          &-volume {
            svg {
                fill: rgba(255, 255, 255, .8);
                width: 25px;
                height: 25px;
            }

            &-wrapper {
              display: flex;
              align-items: center;
              width: 50px;
              transition: 0.3s;

              &:hover {
                width: 115px;
                transition: 0.3s;

                .video-controls-volume-range {
                  width: 100%;

                  .rc-slider {
                    &-handle {
                      opacity: 1;
                    }
                  }
                }
              }
            }

            &-range {
              width: 0;
              transition: 0.3s;
              
              .rc-slider {
                &-rail {
                  height: 3px;
                  background-color: rgba(255, 255, 255, .6) !important;
                }
              
                &-track {
                  height: 3px;
                  border-radius: 2px;
                  background-color: ${colors.primary.main} !important;
                }
              
                &-handle {
                  opacity: 0;
                  background-color: ${colors.primary.main} !important;
                  border: 1px solid ${colors.primary.main} !important;
                  margin-top: -3px;
                  height: 10px;
                  width: 10px;
              
                  &:active {
                    box-shadow: none !important;
                  }
                }
              }
            }
          }

          &-duration {
            height: 100%;
            margin-left: 15px;
          }

          &-screen {
            svg {
                fill: rgba(255, 255, 255, .8);
                width: 30px;
                height: 30px;
            }
          }

          button {
            padding-left: 10px;
            padding-right: 10px;
            height: 100%;
            border-radius: 0;

            &:hover {
                svg {
                    fill: ${colors.white};
                }
            }
          }

          &--hidden {
            opacity: 0;
          }
      }
  }

  .tooltip {
    &--video {
      margin-left: 20px;

      .tooltip-inner {
        font-size: 11px;
      }
    }
  }
`;

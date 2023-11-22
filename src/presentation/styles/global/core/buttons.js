import {
  colors,
  socialNetworksColors,
  font,
} from "../../variables/defaultVariables";

export const buttonStyles = `
  .btn {
    font-family: ${font.family.primary};
    color: ${colors.white};
    font-size: 20px;
    font-weight: 400;
    border-radius: 2rem;
    padding: 5px 35px;
    transition: 0.4s;
    box-shadow: none;

    @media (max-width: 991px) {
      font-size: 14px;
      padding: 5px 25px;
    }

    &:focus,
    &:active {
        box-shadow: none !important;
    }

    &:disabled {
      cursor: not-allowed;
      pointer-events: all !important;
    }

    &-rounded {
      border-radius: 2rem;
    }

    &-squared {
      border-radius: 0;
    }

    &-scale {
      &:hover {
        transform: scale(0.9);
      }
    }

    &-icon {
      padding: 4px;
      transition: 0.1s;
      box-shadow: none !important;

      &:hover {
        background-color: rgba(0, 0, 0, .05);
      }

      &:active {
        transform: scale(0.97);
      }
    }

    &-indicator {
      position: relative;
    }

    &--shadow {
      box-shadow: 6px 11px 10px -8px rgba(0,0,0,0.4);
    }

    &-primary {
      background-color: ${colors.primary.main};
      border-color: ${colors.primary.main};

      &:focus,
      &:hover {
        color: ${colors.white};
        background-color: ${colors.primary.light};
        border-color: ${colors.primary.light};
      }

      &:active {
        background-color: ${colors.primary.light};
        border-color: ${colors.primary.light};
      }

      &:disabled {
        background-color: ${colors.primary["light-50"]} !important;
        border-color: ${colors.primary["light-50"]} !important;
        opacity: 1;
      }
    }

    &-secondary {
      background-color: ${colors.secondary.main};
      border-color: ${colors.secondary.main};

      &:focus {
        background-color: ${colors.secondary.main};
        border-color: ${colors.secondary.main};
      }
      
      &:hover {
        color: ${colors.secondary.main};
        background-color: transparent;
        border: 1px solid ${colors.secondary.main};
      }

      &:active {
        background-color: ${colors.secondary.light};
        border-color: ${colors.secondary.light};
      }

      &:disabled {
        background-color: ${colors.secondary.light};
        border-color: ${colors.secondary.light};
      }
    }

    &-gray {
      color: ${colors.white};
      background-color: rgba(0, 0, 0, .3);
      border-color: rgba(0, 0, 0, .1);

      &:focus {
        color: ${colors.white};
        background-color: rgba(0, 0, 0, .3);
        border-color: rgba(0, 0, 0, .1);
      }

      &:hover,
      &:disabled {
        color: ${colors.white};
        background-color: rgba(0, 0, 0, .4);
        border-color: rgba(0, 0, 0, .1);
      }

      &:active {
        background-color: rgba(0, 0, 0, .3);
        border-color: rgba(0, 0, 0, .1);
      }
    }

    &-grey {
      color: ${colors.white};
      background-color: ${colors.grey};
      border-color: rgba(0, 0, 0, .1);

      &:focus {
        color: ${colors.white};
        background-color: ${colors.grey};
        border-color: rgba(0, 0, 0, .1);
      }

      &:hover,
      &:disabled {
        color: ${colors.white};
        background-color: rgba(0, 0, 0, .4);
        border-color: rgba(0, 0, 0, .1);
      }

      &:active {
        background-color: ${colors.grey};
        border-color: rgba(0, 0, 0, .1);
      }
    }

    &-danger {
      background-color: ${colors.danger.primary};
      border-color: ${colors.danger.primary};

      &:focus {
        background-color: ${colors.danger.primary};
        border-color: ${colors.danger.primary};
      }

      &:hover {
        background-color: ${colors.danger.primary};
        border-color: ${colors.danger.primary};
      }

      &:active {
        background-color: ${colors.danger.primary};
        border-color: ${colors.danger.primary};
      }

      &:disabled {
        background-color: ${colors.danger.light};
        border-color: ${colors.danger.light};
        opacity: 1;
      }
    }

    &-dark {
      color: ${colors.white};
      background-color: ${colors.dark};
      border-color: ${colors.dark};

      &:focus {
        color: ${colors.white};
        background-color: ${colors.dark};
        border-color: ${colors.dark};
      }

      &:hover,
      &:disabled {
        color: ${colors.white};
        background-color: ${colors.primary.main};
        border-color: ${colors.primary.main};
      }

      &:active {
        background-color: rgba(0, 0, 0, .3);
        border-color: rgba(0, 0, 0, .1);
      }
    }

    &-dark-50 {
      color: ${colors.white};
      background-color: ${colors["dark-50"]};
      border-color: ${colors["dark-50"]};

      &:focus {
        color: ${colors.white};
        background-color: ${colors["dark-50"]};
        border-color: ${colors["dark-50"]};
      }

      &:hover,
      &:disabled {
        color: ${colors.white};
        background-color: ${colors.primary.main};
        border-color: ${colors.primary.main};
      }

      &:active {
        background-color: rgba(0, 0, 0, .3);
        border-color: rgba(0, 0, 0, .1);
      }
    }

    &-light {
      color: ${colors.dark};
      background-color: ${colors.light};
      border-color: ${colors.light};

      &:focus {
        color: ${colors.dark};
        background-color: ${colors.light};
        border-color: ${colors.light};
      }

      &:hover,
      &:disabled {
        color: ${colors.white};
        background-color: ${colors.primary.main};
        border-color: ${colors.primary.main};
      }

      &:active {
        background-color: rgba(0, 0, 0, .3);
        border-color: rgba(0, 0, 0, .1);
      }
    }

    &-outline-primary {
      background-color: transparent;
      border: 1px solid ${colors.primary.main};
      color: ${colors.primary.main};

      &:hover {
        background-color: ${colors.primary.light};
        border: 1px solid ${colors.primary.light};
        color: ${colors.white};
      }
    }

    &-outline-secondary {
      background-color: transparent;
      border: 1px solid ${colors.secondary.main};
      color: ${colors.secondary.main};

      &:hover {
        background-color: ${colors.secondary.main};
        border: 1px solid ${colors.secondary.main};
        color: ${colors.white};
      }
    }

    &-outline-grey {
      background-color: transparent;
      border: 1px solid ${colors.grey};
      color: ${colors.grey};

      &:hover {
        background-color: ${colors.grey};
        border: 1px solid ${colors.grey};
        color: ${colors.white};

        svg {
          fill: ${colors.white} !important;
        }
      }
    }

    &-outline-dark {
      background-color: transparent;
      border: 1px solid ${colors["dark-50"]};
      color: ${colors["dark-50"]};

      &:hover {
        background-color: ${colors["dark-50"]};
        border: 1px solid ${colors["dark-50"]};
        color: ${colors.white};

        svg {
          fill: ${colors.white} !important;
        }
      }
    }

    &-google {
      color: ${colors.dark};
      background-color: ${colors.white};
      border: 1px solid ${colors.dark};
      padding-top: 10px;
      padding-bottom: 10px;

      &:hover {
        color: ${colors.dark};
        background-color: ${colors.white};
        border: 1px solid ${colors.dark};
      }

      svg {
        height: 35px;
        width: 35px;
      }
    }

    &-whatsapp {
      color: ${colors.white};
      background-color: ${socialNetworksColors.whatsapp};

      &:hover {
        color: ${colors.white};
        background-color: ${socialNetworksColors.whatsapp};
      }

      svg {
        height: 35px;
        width: 35px;
      }
    }
  }
`;

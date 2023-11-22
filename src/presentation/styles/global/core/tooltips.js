import { colors, radius, font } from '../../variables/defaultVariables';

export const tooltipsStyles = `
  .tooltip {
      &-arrow {
        display: none !important;
      }

      &-inner {
        font-family: ${font.family.primary};
        font-size: 13px;
        background-color: ${colors.grey};
        border-radius: ${radius.sm};
        padding: 5px 10px;
      }
  }
`;

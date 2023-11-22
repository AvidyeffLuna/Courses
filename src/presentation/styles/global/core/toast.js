import { colors, radius } from '../../variables/defaultVariables';

export const toastStyles = `
  .toast {
      font-size: 13px;
      color: ${colors.grey};
      border-radius: ${radius.lg};
      z-index: 999;

      &-flex {
          display: flex;
          align-items: center;
      }

      &-icon {
          margin-right: 10px;

          svg {
            width: 30px;
            height: 30px;
          }
      }

      &-success {
        border-left: 4px solid ${colors.success.main};
      }

      &-error {
        border-left: 4px solid ${colors.danger.main};
      }
  }
`;

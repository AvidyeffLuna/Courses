import { radius } from '../../variables/defaultVariables';

export const borderStyles = `
  .border {
      &-radius {
        &-circle {
          border-radius: 50%;
        }

        &-xl {
          border-radius: ${radius.xl};
        }

        &-lg {
          border-radius: ${radius.lg};
        }

        &-md {
          border-radius: ${radius.md};
        }

        &-sm {
          border-radius: ${radius.sm};
        }

        &-xs {
          border-radius: ${radius.xs};
        }
      }
  }
`;

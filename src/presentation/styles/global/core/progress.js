import { colors, radius } from '../../variables/defaultVariables';

export const progressStyles = `
    .progress {
        height: 10px;

        &-bar {
            background-color: ${colors.primary.main};
            border-radius: ${radius.sm};
        }

        &--xl {
            height: 14px;
        }

        &--lg {
            height: 10px;
        }

        &--md {
            height: 8px;
        }

        &--sm {
            height: 6px;
        }

        &--xs {
            height: 5px;
        }
    }
`;

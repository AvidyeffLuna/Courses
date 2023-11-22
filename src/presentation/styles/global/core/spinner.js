import { colors } from '../../variables/defaultVariables';

export const spinnerStyles = `
    .spinner-border {
        display: inline-block;
        width: 1.7rem;
        height: 1.7rem;
        vertical-align: text-bottom;
        border: 0.25em solid rgba(0, 0, 0, .1);
        border-right-color: ${colors.primary.main};
        border-radius: 50%;
        animation: 0.90s linear infinite spinner-border;

        &-secondary {
            border-right-color: ${colors.secondary.main};
        }

        &-light {
            border-right-color: ${colors.white};
        }

        &-dark {
            border-right-color: ${colors['dark-50']};
        }

        @keyframes spinner-border {
            100% {
                transform: rotate(360deg);
            }
        }
    }
`;

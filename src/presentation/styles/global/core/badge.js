import { colors } from "presentation/styles/variables/defaultVariables";

export const badgeStyles = `
    .badge {
        font-size: 14px;
        border-radius: 2rem;

        @media (max-width: 991px) {
            font-size: 12px !important;
        }

        &-rounded {
            border-radius: 2rem;
        }

        &-indicator {
            position: absolute !important; 
            &--right {
                top: 0px;
                right: -7px;
            }

            &--left {
                top: 0px;
                left: 0;
            }
        }

        &-success {
            background-color: ${colors.success.main} !important;
            color: ${colors.white};
            border: 1px solid ${colors.success.main};
        }

        &-danger {
            background-color: ${colors.danger.main} !important;
            color: ${colors.white};
            border: 1px solid ${colors.danger.main};
        }

        &-lg {
            padding: 8px 12px;
            font-size: 13px;
        }

        &-md {
            padding: 6px 10px;
            font-size: 11px;
        }

        &-sm {
            padding: 4px 8px;
        }

        &-xs {
            padding: 2px 6px;
        }
    }
`;

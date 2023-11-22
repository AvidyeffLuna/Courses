import { colors, font } from "../../variables/defaultVariables";

export const typographyStyles = `
    h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
        font-family: ${font.family.primary};
        color: ${colors.dark};
    }

    h1,
    .h1 {
        font-size: 48px;
        font-weight: 800;
        line-height: 1.3em;
        letter-spacing: -1px;

        @media (max-width: 991px) {
            font-size: 30px !important;
        }
    }

    h2,
    .h2 {
        font-size: 38px;
        font-weight: 800;
        line-height: 1.3em;
        letter-spacing: -1px;

        @media (max-width: 991px) {
            font-size: 20px !important;
        }
    }

    h3,
    .h3 {
        font-size: 26px;
        font-weight: 800;
        line-height: 1.2em;
        letter-spacing: -0.025em;

        @media (max-width: 991px) {
            font-size: 20px !important;
        }
    }

    h4,
    .h4 {
        font-size: 20px;
        font-weight: 800;
        line-height: 1.2em;
        letter-spacing: -0.025em;

        @media (max-width: 991px) {
            font-size: 16px !important;
        }
    }

    h5,
    .h6 {
        font-size: 16px;
        font-weight: 700;
        line-height: 1.2em;
        letter-spacing: -0.025em;

        @media (max-width: 991px) {
            font-size: 14px !important;
        }
    }

    h6,
    .h6 {
        font-size: 14px;
        font-weight: 600;
        line-height: 1.2em;
        letter-spacing: -0.025em;

        @media (max-width: 991px) {
            font-size: 12px !important;
        }
    }

    span {
        font-family: ${font.family.secondary};
        font-weight: bold;
        font-size: 22px;
        color: ${colors.gray};

        @media (max-width: 991px) {
            font-size: 18px !important;
        }
    }

    p {
        font-family: ${font.family.secondary};
        color: ${colors.gray};
        font-size: 18px;
        font-weight: 500;

        @media (max-width: 991px) {
            font-size: 16px !important;
        }
    }

    strong {
        font-family: ${font.family.secondary};
        font-size: 15px;
        line-height: 1.2em;
        color: ${colors.dark};
        font-weight: 600;
    }

    .text {
        &-primary {
            color: ${colors.primary.main} !important;
        }

        &-primary-dark {
            color: ${colors.primary.dark} !important;
        }

        &-primary-title {
            color: ${colors.primary.title};
        }

        &-secondary {
            color: ${colors.secondary.main} !important;
        }

        &-secondary-dark {
            color: ${colors.secondary.dark} !important;
        }

        &-info {
            color: ${colors.info.main} !important;
        }

        &-info-dark {
            color: ${colors.info.dark} !important;
        }

        &-success {
            color: ${colors.success} !important;
        }

        &-danger {
            color: ${colors.danger} !important;
        }

        &-white {
            color: ${colors.white};
        }

        &-gray {
            color: ${colors.gray};

            &-50 {
                color: ${colors["gray-50"]};
            }

            &-25 {
                color: ${colors["gray-25"]};
            }
        }

        &-grey {
            color: ${colors.grey};
        }

        &-dark {
            color: ${colors.dark} !important;

            &-50 {
                color: ${colors["dark-50"]} !important;
            }
        }

        &-overflow {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis; 
        }

        &-overflow-vertical {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
        }
    }

    .font-size {
        &-xl {
            font-size: 22px;

            @media (max-width: 991px) {
                font-size: 18px !important;
            }
        }
        &-lg {
            font-size: 18px;

            @media (max-width: 991px) {
                font-size: 14px !important;
            }
        }
        &-md {
            font-size: 14px;

            @media (max-width: 991px) {
                font-size: 12px !important;
            }
        }
        &-sm {
            font-size: 12px;

            @media (max-width: 991px) {
                font-size: 11px !important;
            }
        }
        &-xs {
            font-size: 11px;

            @media (max-width: 991px) {
                font-size: 10px !important;
            }
        }
    }

    .font-weight {
        &-100 {
            font-weight: 100 !important;
        }

        &-200 {
            font-weight: 200 !important;
        }

        &-300 {
            font-weight: 300;
        }

        &-400 {
            font-weight: 400 !important;
        }

        &-500 {
            font-weight: 500 !important;
        }

        &-600 {
            font-weight: 600 !important;
        }

        &-700 {
            font-weight: 700 !important;
        }

        &-800 {
            font-weight: 800 !important;
        }

        &-900 {
            font-weight: 900 !important;
        }

        &-bold {
            font-weight: bold !important;
        }

        &-normal {
            font-weight: normal !important;
        }

        &-lighter {
            font-weight: lighter !important;
        }
    }

    .letter-spacing {
        &-xl {
            letter-spacing: 10px;
        }
        &-lg {
            letter-spacing: 6px;
        }
        &-md {
            letter-spacing: 4px;
        }
        &-xs {
            letter-spacing: 2px;
        }
    }

    .line-height {
        &-xl {
            line-height: 35px;
        }
        &-lg {
            line-height: 30px;
        }
        &-md {
            line-height: 25px;
        }
        &-xs {
            line-height: 20px;
        }
    }

    .text-decoration-line-through {
        text-decoration: line-through;
    }

    .text-decoration-underline {
        text-decoration: underline;
    }

    .font {
        &-family {
            &-primary {
                font-family: ${font.family.primary};
            }
            &-secondary {
                font-family: ${font.family.secondary};
            }
        }
    }
`;

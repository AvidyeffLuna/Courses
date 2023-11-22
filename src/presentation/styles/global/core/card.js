import { colors, radius } from "../../variables/defaultVariables";

export const cardStyles = `
    .card {
        background-color: ${colors.white};
        border: 1px solid transparent;
        box-shadow: -5px 5px 25px 0px rgb(0 0 0 / 18%);
        border-radius: 30px;

        &-header {
            background-color: ${colors.white};
            border: 1px solid transparent;

            &-image {
                padding: 0;

                img {
                    border-radius: ${radius.sm} !important;
                }
            }
        }

        &-body {
            padding: 30px 30px;
        }

        &-footer {
            padding: 10px 10px;
            background-color: transparent;
            border: 1px solid transparent;
            border-bottom-left-radius: ${radius.sm};
            border-bottom-right-radius: ${radius.sm};

            &--not-spacing {
                padding: 0;
            }
        }

        &-primary--hover {
            transition: 0.3s;

            svg {
                fill: ${colors.primary.main};
            }

            &:hover {
                background-color: ${colors.primary.main};
                
                svg {
                    fill: ${colors.white};
                }

                h1, h2, h3, h4, h5, h6,
                span {
                    color: ${colors.white} !important;
                }
            }
        }

        &-translate--hover {
            transition: 0.3s;

            &:hover {
                transform: translateY(-10px);
            }
        }

        &--link {
            transition: 0.3s;

            &:hover {
                box-shadow: -5px 5px 25px 20px rgb(0 0 0 / 8%);
            }
        }
    }
`;

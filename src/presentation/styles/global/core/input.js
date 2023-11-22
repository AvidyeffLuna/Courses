import { colors, radius, font } from "../../variables/defaultVariables";

export const inputStyles = `
    form {
        font-family: ${font.family.secondary};

        label {
            font-size: 13px;
            font-weight: lighter;
        }

        select {
            -webkit-appearance: none;
            -moz-appearance: none;
            background: transparent;
            background-image: url("data:image/svg+xml;utf8, <svg xmlns='http://www.w3.org/2000/svg' height='22px' viewBox='0 0 24 24' width='22px' fill='gray'><path d='M0 0h24v24H0z' fill='none'/><path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z'/></svg>");
            background-repeat: no-repeat;
            background-position-x: 95%;
            background-position-y: 5px;
        }

        .form {
            &-control {
                color: ${colors.gray}; !important;
                font-size: 15px;
                font-weight: 400;
                background-color: ${colors.body};
                border: 1px solid rgba(0, 0, 0, .2);
                border-radius: 2rem;
                padding: 10px 15px;
                caret-color: ${colors.primary.main};

                @media (max-width: 991px) {
                    font-size: 12px;
                    padding: 5px 10px;
                }

                &-rounded {
                    border-radius: 2rem;
                }
                &-pill {
                    border-radius: 0px;
                }

                &--lighter {
                    border: 1px solid rgba(0, 0, 0, .1);
                    box-shadow: none;

                    &:hover {
                        border: 1px solid ${colors.primary.main};
                    }
                }

                &--bg {
                    background-color: rgba(0, 0, 0, .03);
                    box-shadow: none;
                }

                &::placeholder {
                    font-size: 15px;
                    color: ${colors.gray};

                    @media (max-width: 991px) {
                        font-size: 12px;
                    }
                }

                &:focus {
                    color: black !important;
                    background-color: ${colors.body};
                    border: 1px solid ${colors.primary.main};
                    box-shadow: none;
                }

                &--lg {
                    padding: 12px 15px;
                    font-size: 14px;
                }

                &--md {
                    padding: 10px 15px;
                    font-size: 13px;
                }

                &--xs {
                    font-size: 12px;
                }

                &[aria-invalid="true"] {
                    border: 1px solid ${colors.danger.main};

                    ~ .input-group {
                        &-text {
                            border-left: 1px solid transparent;
                            border-right: 1px solid ${colors.danger.main};
                            border-top: 1px solid ${colors.danger.main};
                            border-bottom: 1px solid ${colors.danger.main};
                        }
                    }

                    &.form-control--group {
                        border-right: 1px solid transparent;

                        &:focus {
                            ~ .input-group-text {
                                border-left: 1px solid transparent;
                                border-right: 1px solid ${colors.danger.main};
                                border-top: 1px solid ${colors.danger.main};
                                border-bottom: 1px solid ${colors.danger.main};
                            }
                        }
                    }
                }

                &--light {
                    background-color: ${colors.white};
                    border: 1px solid ${colors.white};

                    &:focus {
                        background-color: ${colors.white};
                    }
                }
            }

            &-text {
                color: ${colors.white} !important;
                font-weight: 500;

                &--error {
                    color: ${colors.danger.main} !important;
                    font-size: 15px;

                    @media (max-width: 991px) {
                        font-size: 12px !important;
                    }
                }
            }

            &-label {
                font-size: 16px;
                font-weight: 400;
                color: ${colors.dark};

                @media (max-width: 991px) {
                    font-size: 12px;
                }
            }

            &-check {
                &-label {
                    font-size: 13px;
                    font-weight: normal;
                    color: rgba(0, 0, 0, .6);
                }
            }
        }
    }

    .input-group {
        &-text {
            padding-top: 0px;
            padding-bottom: 0px;
            background-color: ${colors.white};
            border-radius: ${radius.sm};
            border-left: 1px solid transparent;
            border-right: 1px solid rgba(0, 0, 0, .05);
            border-top: 1px solid rgba(0, 0, 0, .05);
            border-bottom: 1px solid rgba(0, 0, 0, .05);

            &-rounded {
                border-top-left-radius: 2rem !important;
                border-bottom-left-radius: 2rem !important;
            }

            button {
                border-radius: 0;
            }
        }

        .form-control {
            box-shadow: none;
            transition: border-right .05s;

            &:focus {
                border-right: 1px solid ${colors.primary.main};

                .input-group-text {
                    border-top: 1px solid ${colors.primary.main} !important;
                    border-bottom: 1px solid ${colors.primary.main} !important;
                    border-left: 1px solid ${colors.primary.main} !important;
                    border-right: 1px solid transparent !important;
                }
            }
        }

        button {
            box-shadow: none;
        }

        &--lighter {
            .input-group-text {
                border-right: 1px solid rgba(0, 0, 0, .1);
                border-top: 1px solid rgba(0, 0, 0, .1);
                border-bottom: 1px solid rgba(0, 0, 0, .1);
            }

            .form-control {
                border-right: 1px solid transparent;
                box-shadow: none;
                transition: border-right .15s ease-in-out;
    
                &:focus {
                    border-right: 1px solid transparent;
    
                    ~ .input-group-text {
                        border-top: 1px solid ${colors.primary.main};
                        border-bottom: 1px solid ${colors.primary.main};
                        border-right: 1px solid ${colors.primary.main};
                    }
                }
            }
        }

        &--not-bg-append {
            .input-group-text {
                background-color: #fff;
                border-left: 1px solid transparent;
            }
        }

        &--not-bg-prepend {
            .input-group-text {
                background-color: #fff;
                border-right: 1px solid transparent;
            }
        }
    }

    input[type=checkbox] {
        border: 1px solid rgba(0, 0, 0, .2);

        &:focus {
            border: 1px solid rgba(0, 0, 0, .2);
            box-shadow: none;
        }

        &:hover {
            border: 1px solid ${colors.primary.main};
        }

        &:checked {
            background-color: ${colors.primary.main};
            border: 1px solid ${colors.primary.main};
        }
    }
      
    input[type='range']::-webkit-slider-thumb {
        background: ${colors.primary.main};
    }

    .input-file {
        position: relative;
        padding: 15px 15px;
        background-color: ${colors.white};
        border: 1px solid rgba(0, 0, 0, .09);
        border-radius: 8px;

        .input-file-control {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }

        .input-file-content {
            display: flex;
            justify-content: center;
            text-align: center;
            padding: 10px 10px;
        }

        &--circle {
            padding: 0;
            border-radius: 50%;

            &:hover {
               .input-file--circle-indicator {
                   opacity: 1;
               }
            }

            &-indicator {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, .7);
                border-radius: 50%;
                opacity: 0;
                transition: 0.3s;
            }

            &-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 0;
                width: 100%;
                height: 100%;
            }

            &-icon {
                svg {
                    fill: ${colors.white};
                    height: 52px;
                    width: 52px;
                }
            }

            &-text {
                margin-top: 10px;
                text-align: center;

                span {
                    color: ${colors.white};
                    font-size: 13px;
                }
            }
        }
    }
`;

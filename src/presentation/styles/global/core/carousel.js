import { colors } from '../../variables/defaultVariables';

export const carouselStyles = `
    .carousel {
        padding: 0px 0px;

        &-indicators {
            [data-bs-target] {
                width: 10px;
                height: 10px;
                background-color: ${colors.primary.main};
                border-radius: 50%;
            }
        }

        &-control-prev {
            &-icon {
                background-image: url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='red'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e)
            }
        }

        &--not-arrow {
            .carousel-control-prev {
                display: none;
            }
            .carousel-control-next {
                display: none;
            }
        }

        &--not-indicators {
            [data-bs-target] {
               display: none;
            }
        }
    }

    .react-multiple-carousel {
        &__arrow {
            background-color: ${colors.white};
            z-index: 998;
            box-shadow: 13px 14px 8px -14px rgba(0, 0, 0, 0.1);

            &:hover {
                background-color: ${colors['gray-25']};
            }

            &--left {
                left: 20px;
            }

            &--right {
                right: 20px;
            }

            &::before {
                color: ${colors.gray};
            }

            &:disabled {
                background-color: ${colors.white};

                &::before {
                    color: ${colors['gray-25']};
                }
            }
        }
    }

    .react-multi-carousel-list {
        position: static;

        &--height {
            height: 125px;
        }

        &--height-schedule {
            height: 175px;
        }

        &--height-hours {
            height: 100px;
        }

        &--relative {
            position: relative !important;
        }
    }

    .react-multi-carousel-dot {
        button {
            background: ${colors.secondary.main};
            border-color: ${colors.secondary.main};
        }

        &--active {
            button {
                background: ${colors.primary.main};
                border-color: ${colors.primary.main};
            }
        }
    }

    .slick-arrow {
        width: 40px;
        height: 40px;      
    }

    .slick-next {
        background-color: ${colors.white};
        box-shadow: 13px 14px 8px -14px rgba(0, 0, 0, 0.1);
        border-radius: 2rem;

        &::before {
            display: block;
            content: url('data:image/svg+xml,<svg width="30px" height="30px" fill="gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.7 11.3l-6-6c-0.4-0.4-1-0.4-1.4 0s-0.4 1 0 1.4l5.3 5.3-5.3 5.3c-0.4 0.4-0.4 1 0 1.4 0.2 0.2 0.4 0.3 0.7 0.3s0.5-0.1 0.7-0.3l6-6c0.4-0.4 0.4-1 0-1.4z"></path></svg>');
        }
    }

    .slick-prev {
        background-color: ${colors.white};
        box-shadow: 13px 14px 8px -14px rgba(0, 0, 0, 0.1);
        border-radius: 2rem;

        &::before {
            display: block;
            content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="gray"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>');
        }
    }
`;

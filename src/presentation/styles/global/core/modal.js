export const modalStyles = `
    .modal {
        &-header {
            align-items: start;
            padding: 0 30px;
            padding-top: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid transparent;

            @media (max-width: 576px) {
                flex-direction: column-reverse;

                div {
                    &:first-child {
                        margin-top: 20px;
                    }
                }
            }
        }

        &-body {
            padding: 0 20px;
            padding-bottom: 30px;
        }

        .btn-close {
            background-color: rgba(0, 0, 0, .2);
            background: transparent url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23ffffff'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e) center/1em auto no-repeat;
            border-radius: 50%;

            svg {
                fill: white;
            }

            &:focus {
                box-shadow: none;
            }
        }
    }
`;

export const mainStyles = `
    .main {
        &-fixed {
            margin-top: 125px;
        }

        &-content {
            &--sidebar {
                margin-left: 250px;

                @media (max-width: 991px) {
                    margin-left: 0;
                }
            }
        }
    }
`;

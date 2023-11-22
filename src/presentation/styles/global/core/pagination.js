import { colors } from "presentation/styles/variables/defaultVariables";

export const paginationStyles = `
    .pagination {
        .page-item {
            margin-right: 10px;

            .page-link {
                border-radius: 10px;
                color: ${colors["dark-50"]};
                border: 1px solid ${colors["dark-50"]};
                transition: 0.3s;

                &:hover {
                    color: ${colors.white};
                    background-color: ${colors["dark-50"]};
                }
            }

            &.active {
                .page-link {
                    color: ${colors.white};
                    background-color: ${colors["dark-50"]};
                }
            }
        }
    }
`;

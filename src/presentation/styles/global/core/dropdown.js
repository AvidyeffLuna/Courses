import { colors } from "../../variables/defaultVariables";

export const dropdownStyles = `
     .dropdown {
        &-menu {
            padding: 10px 0;
            width: 220px;
            border-radius: 4px;
            border: 1px solid rgba(0, 0, 0, .05);
            position: relative;
            z-index: 999;

            &-user {
                display: flex;
                align-items: center;
            }

            &--account {
                width: 250px;
            }
        }

        &-item {
            color: ${colors.grey};
            font-size: 13px;
            padding: 0 0;
            height: 30px;

            &:hover {
                background-color: ${colors.bodyGray};
            }

            &:focus {
                color: ${colors.grey};
                background-color: rgba(0, 0, 0, .03);
            }

            svg {
                fill: ${colors["dark-50"]};
                height: 20px;
                width: 20px;
            }
        }

        &-divider {
            border-top: 1px solid rgba(0, 0, 0, .03);
            opacity: .07;
        }
      
         &-toggle {
             &--not {
                 &::after {
                    content: none;
                 }
             }
         }
     }
`;

import { colors } from "../../variables/defaultVariables";

export const sidebarStyles = `
    .sidebar {
        height: 100vh;

        &-header {
            width: 100%;
            height: 14vh;
            display: flex;
            align-items: center;
            padding-top: 15px;
            padding-bottom: 10px;
            padding-left: 15px;
            padding-right: 15px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        &-content {
            padding: 10px 15px;
            margin-top: 30px;
            height: 72vh;
            overflow-y: auto;

            ::-webkit-scrollbar {
                width: 4px;
            }
            
            ::-webkit-scrollbar-track {
                background: ${(props) => props.theme.colors.primary.main};
            }
            
            ::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.5);
                border-radius: 2rem;
            }
        }

        &-item {
            display: flex;
            padding: 10px 0px;
            border-bottom: 2px solid transparent;
            margin-bottom: 10px;

            div {
                &:first-child {
                    margin-left: 10px;
                }
            }
            
            span {
                font-size: 15px;
                color: ${colors.gray};
            }

            svg {
                fill: rgba(255, 255, 255, .9);
            }

            &.active,
            &:hover {
                background-color: ${colors.primary.main};
                border-radius: 8px;

                span,
                i {
                    color: ${colors.white};
                }

                svg {
                    fill: ${colors.white};
                }
            }

            &--icon {
                display: flex;
                align-items: center;

                div {
                    &:last-child {
                        margin-left: 10px;
                    }
                }
            }
        }

        &-footer {
            height: 14vh;

            &-content {
                display: flex;
                align-items: end;
            }
        }

        &--hide {
           .sidebar-item {
               div {
                   &:last-child {
                       display: none;
                   }
               }
           }
        }
    }

    .sidebar-admin {
        height: 100vh;

        &-header {
            width: 100%;
            height: 70px;
            display: flex;
            align-items: center;
            padding-top: 15px;
            padding-bottom: 10px;
            padding-left: 15px;
            padding-right: 15px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        &-content {
            padding: 10px 15px;
            margin-top: 30px;
            height: 100%;
            overflow-y: auto;

            ::-webkit-scrollbar {
                width: 7px;
            }
            
            ::-webkit-scrollbar-track {
                background: ${colors.primary.main};
            }
            
            ::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.5);
                border-radius: 2rem;
            }
        }

        &-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0px;
            margin-bottom: 10px;

            div {
                &:first-child {
                    margin-left: 10px;
                }
            }
            
            span {
                font-size: 18px;
                color: ${colors.gray};
            }

            svg {
                fill: ${colors.gray};
                width: 26px;
                height: 26px;
            }

            &.active,
            &:hover {
                span {
                    color: ${colors.primary.main};
                }

                svg {
                    fill: ${colors.primary.main};
                }
            }

            &--icon {
                display: flex;
                align-items: center;

                div {
                    &:last-child {
                        margin-left: 10px;
                    }
                }
            }
        }

        &-footer {
            height: 14vh;

            &-content {
                display: flex;
                align-items: end;
            }
        }

        &-arrow {
            width: 18px !important;
            height: 18px !important;
        }

        &--hide {
           .sidebar-item {
               div {
                   &:last-child {
                       display: none;
                   }
               }
           }
        }
    }
`;

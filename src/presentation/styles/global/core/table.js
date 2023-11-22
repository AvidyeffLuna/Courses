import { colors } from "../../variables/defaultVariables";

export const tableStyles = `
    .table {
        border-collapse: collapse;
        border-spacing: 0px 16px;
        border: 1px solid transparent;

        thead {   
            border-width: initial;

            th {
                color: ${colors.grey};
                font-size: 17px;
                font-weight: bold;
                border: 1px solid transparent;
            }

            &.thead-border {
                th {
                    border-collapse: separate;

                    &:first-child {
                        border-top-left-radius: 8px;
                        border-bottom-left-radius: 8px;
                        border-top-right-radius: 0px;
                        border-bottom-right-radius: 0px;
                    }

                    &:last-child {
                        border-top-left-radius: 0px;
                        border-bottom-left-radius: 0px;
                        border-top-right-radius: 8px;
                        border-bottom-right-radius: 8px;
                    }
                }
            }

            &.thead-border-color {
                th {
                    border-top: 1px solid red;
                    border-bottom: 1px solid red;
                }
            }
        }

        tbody {
            background-color: ${colors.white};

            tr {
                border-bottom: 1px solid rgba(0, 0, 0, .06);
            }

            td {
                padding: 15px 0px;
                font-size: 14px;
                font-weight: normal;
                color: ${colors.gray};
                border-bottom: 1px solid rgba(0, 0, 0, .06);
            }

            &.tbody-border-color {
                td {
                    border-top: 1px solid rgba(0, 0, 0, .08);
                    border-bottom: 1px solid rgba(0, 0, 0, .08);
                }
            }
        }

        &-center {
            th,
            td {
                vertical-align: middle;
            }
        }

        .cell-overflow {
            max-width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis; 
            border: none;
        }
    }

    .table > :not(:last-child) > :last-child > * {
        border-bottom-color: transparent;
    }
`;

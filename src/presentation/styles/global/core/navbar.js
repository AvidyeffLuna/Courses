import { colors } from "presentation/styles/variables/defaultVariables";

export const navbarStyles = `
    .navbar {
        width: 100%;
        background-color: ${colors.white};
        transition: 0.2s;
        box-shadow: 0 4px 30px -15px rgba(0, 0, 0, .4);

        @media (max-width: 991px) {
            height: 75px;
        }
        
        &-fixed {
            position: fixed;
            top: 0;
            z-index: 999;
        }

        &-wrapper {
            width: 100%;
            height: 100%;
        }

        &-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 100%;
            padding: 0 30px;

            @media (max-width: 575px) {
                padding: 10px 20px;
            }
        }

        &-logo {
            display: flex;
            align-items: center;
            padding: 0px 0px;
            background-color: ${colors.white};
        }

        &-menu {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 10px 30px;

            @media (max-width: 575px) {
                padding: 10px 20px;
            }
        }

        &-account {
            display: flex;
            align-items: center;
            justify-content: end;
            height: 100%;
        }

        &-items {
            display: flex;
            align-items: center;

            .navbar-item {
                font-size: 20px !important;
                font-weight: 800;
                color: ${colors.dark};
                text-decoration: none;
                margin-right: 35px;

                &:hover {
                    color: ${colors.primary.main} !important;
                }
            }
        }

        &-white {
            background-color: ${colors.white};
        }

        &--not-spacing {
            padding: 0;
        }
        
        &--dark {
            background-color: rgba(26, 26, 26, 0.8);
        }

        &--shadow {
            box-shadow: 13px 14px 11px -12px rgba(0, 0, 0, 0.2);
        }
    }
`;

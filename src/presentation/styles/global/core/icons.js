import { colors, utilsColors } from "../../variables/defaultVariables";

export const iconStyles = `
    svg {
        fill: ${colors["dark-50"]};
    }
    
    .icon {
        &-primary {
            color: ${colors.primary.main} !important;
            fill: ${colors.primary.main} !important;
        }

        &-secondary {
            fill: ${colors.secondary.main};
        }

        &-third {
            fill: ${colors.third.main};
        }

         &-info {
            fill: ${colors.info.main};
        }

        &-success {
            fill: ${colors.success.main};
        }

        &-danger {
            color: ${colors.danger.main} !important;
            fill: ${colors.danger.main};
        }

        &-white {
            fill: ${colors.white};
        }

        &-dark {
            color: ${colors.dark} !important;
            fill: ${colors.dark} !important;
        }

        &-gray {
            color: ${colors.gray} !important;
            fill: ${colors.gray} !important;
        }

        &-grey {
            color: ${colors.grey} !important;
            fill: ${colors.grey} !important;
        }

        &-verified {
            fill: ${utilsColors.verified};
        }

        &-star-rate {
            color: ${utilsColors.starRate} !important;
            fill: ${utilsColors.starRate} !important;
        }

        &-favourite {
            fill: ${utilsColors.favourite} !important;
        }
    }
`;

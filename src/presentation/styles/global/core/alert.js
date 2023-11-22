import { colors, radius } from '../../variables/defaultVariables';

export const alertStyles = `
     .alert {
         font-size: 17px;
         font-weight: 500;
         color: ${colors.white};
         border-radius: 2rem;

         @media (max-width: 991px) {
            font-size: 12px !important;
         }

         &-primary {
            background-color: ${colors.primary.main};
            border: 1px solid ${colors.primary.main};
         }

         &-secondary {
            background-color: ${colors.secondary.main};
            border: 1px solid ${colors.secondary.main};
         }

         &-success {
            background-color: ${colors.success.main};
            border: 1px solid ${colors.success.main};
         }

         &-danger {
             background-color: ${colors.danger.main};
             border: 1px solid ${colors.danger.main};
         }
     }
`;

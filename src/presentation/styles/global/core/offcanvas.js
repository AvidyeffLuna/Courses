import { colors } from 'presentation/styles/variables/defaultVariables';

export const offcanvasStyles = `
    .offcanvas {
        .btn-close {
            &:focus {
                box-shadow: 0 0 0 0.25rem ${colors.secondary['light-50']};
            }
        }
    }
`;

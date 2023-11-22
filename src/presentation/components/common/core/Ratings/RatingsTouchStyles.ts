import { Button } from "react-bootstrap";
import styled from "styled-components";

export const RatingsTouchStarSolidIcon = styled(Button)`
    i {
        color: ${props => props.theme.utilsColors.starRate};
    }
`;

export const RatingsTouchStarRegularIcon = styled(Button)`
    i {
        color: ${props => props.theme.colors.dark};
    }

    &:hover {
        i {
            color: ${props => props.theme.utilsColors.starRate};
        }
    }
`;


import { Row } from "react-bootstrap";
import styled from "styled-components";

export const ServiceWrapper = styled(Row)`
    padding: 20px 20px;
    border-radius: 4px;
    transition: 0.3s;

    &:hover {
        background-color: ${props => props.theme.colors.primary.dark};
        transform: translate(0, -10px);

        h4,
        p,
        .btn {
            color: #fff !important;
        }

        .btn {
            background-color: ${props => props.theme.colors.primary.main} !important;
        }
    }
`;
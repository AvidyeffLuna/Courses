import { Button } from "react-bootstrap";
import styled from "styled-components";

interface ILectureStylesProps {
    isselected: string;
}

export const LectureWrapper = styled(Button)<ILectureStylesProps>`
    background-color: ${props => props.isselected === "true" ? "rgba(0, 0, 0, .1)" : "transaprent"};
    transition: 0.3s;

    &:hover {
        background-color: rgba(0, 0, 0, .1);
    }
`;
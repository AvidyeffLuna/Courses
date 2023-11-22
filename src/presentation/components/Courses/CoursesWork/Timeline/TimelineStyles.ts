import styled from "styled-components";

export const TimelineWrapper = styled.div`
    width: 600px;
    borderRight: 1px solid rgba(0, 0, 0, .1);
    overflowY: auto;
    overflowX: hidden;

    @media (max-width: 767px) {
        width: 300px;
    }
`;
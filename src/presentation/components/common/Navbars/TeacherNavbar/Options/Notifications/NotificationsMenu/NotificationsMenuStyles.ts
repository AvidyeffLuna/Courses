import { Row } from "react-bootstrap";
import styled from "styled-components";

export const NotificationsMenuWrapper = styled(Row)`
    max-height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0px 10px;
    width: 100%;

    ::-webkit-scrollbar {
        width: 6px;
    }
    
    ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, .1);
    }
    
    ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, .2);
        border-radius: 2rem;
    }
`;
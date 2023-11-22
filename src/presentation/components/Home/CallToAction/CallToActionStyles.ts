import styled from "styled-components";

export const CallToActionWrapper = styled.div`
    position: relative;
    padding: 100px 50px;
    background-color: ${props => props.theme.colors.primary.dark};
    background-image: url(https://firebasestorage.googleapis.com/v0/b/pad-tech-c127c.appspot.com/o/home%2Fcta_bg_1.jpg?alt=media&token=f233fcf6-87f3-4ce0-91c0-cde7baeb08e2);
    background-position: center;
    background-repeat: no-repeat; 
    background-size: cover;
    height: 450px;
    z-index: 997;
`;


export const CallToActionBackdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background-image: url(https://firebasestorage.googleapis.com/v0/b/pad-tech-c127c.appspot.com/o/home%2Fbg_overlay_1.png?alt=media&token=f9aa4e4e-1868-4274-870f-7c5f435d445d);
    background-position: center;
    background-repeat: no-repeat; 
    background-size: cover;
    z-index: 998;
`;

export const CallToActionContent = styled.div`
    position: absolute;
    width: 100%;
    z-index: 999;
`;
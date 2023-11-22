import styled from "styled-components";

export const SideWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    background-image: url(https://firebasestorage.googleapis.com/v0/b/pad-tech-c127c.appspot.com/o/sign%2Fdescarga.jpg?alt=media&token=ed1e5bd6-c208-43bd-acb0-201ac8be660b);
    background-color: #cccccc;
    background-position: center;
    background-repeat: no-repeat; 
    background-size: cover;
`;

export const SideBackdrop = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .6);
    z-index: 998;
`;


export const SideContent = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 999;
`;

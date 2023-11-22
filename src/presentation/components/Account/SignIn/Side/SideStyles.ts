import styled from "styled-components";

export const SideWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    background-image: url(https://firebasestorage.googleapis.com/v0/b/pad-tech-c127c.appspot.com/o/sign%2FCompany%20Secretary%20Course%20in%20Bangalore%20_%20CS%20Coaching%20Class.jpg?alt=media&token=7da9feb0-3b89-4581-80f3-b21a3efda959);
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
    background-color: rgba(0, 0, 0, .7);
    z-index: 998;
`;


export const SideContent = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 999;
`;

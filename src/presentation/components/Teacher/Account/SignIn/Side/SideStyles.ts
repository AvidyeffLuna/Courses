import styled from "styled-components";

export const SideWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    background-image: url(https://firebasestorage.googleapis.com/v0/b/pad-tech-c127c.appspot.com/o/sign%2FClaves%20para%20entender%20la%20importancia%20de%20la%20imagen%20en%20la%20empresa.jpg?alt=media&token=a8679065-81ed-40a4-b47d-9ed4420fbddf);
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

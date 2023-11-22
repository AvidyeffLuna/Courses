import styled from "styled-components";

interface IMainImageStylesProps {
    imageurl: string;
}

export const MainImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 600px;
`;

export const MainImageCoverBlur = styled.div<IMainImageStylesProps>`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 997;
`;

export const MainImageContent = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
`;

export const MainImagePreviousArrow = styled.div`
    position: absolute;
    top: 0;
    left: 30px;
    bottom: 0;
    height: 100%;
    z-index: 999;
`;

export const MainImageNextArrow = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 30px;
    height: 100%;
    z-index: 999;
    display: flex;
    justify-content: end;
`;
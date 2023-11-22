import styled from "styled-components";

export const HeroWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 725px;
    background-color: ${props => props.theme.colors.primary.dark};
    background-image: url(https://firebasestorage.googleapis.com/v0/b/pad-tech-c127c.appspot.com/o/home%2Fhero_bg_5_3.jpg?alt=media&token=a9bc586a-21db-4bc4-a503-d94e147126e7);
    background-position: center;
    background-repeat: no-repeat; 
    background-size: cover;
    z-index: 997;
`;

export const HeroBackdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 998;
    background-image: url(https://firebasestorage.googleapis.com/v0/b/pad-tech-c127c.appspot.com/o/home%2Fhero_overlay_5.png?alt=media&token=b032f935-4144-4f96-b3bd-385333815d23);
    background-position: center;
    background-repeat: no-repeat; 
    background-size: cover;
    z-index: 997;
`;

export const HeroContent = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 40px;
    z-index: 999;
`;

export const HeroItemFirst = styled.div`
    position: absolute;
    top: 60px;
    left: 40px;
    width: 75px;
    height: 75px;
    background-image: url(https://firebasestorage.googleapis.com/v0/b/pad-tech-c127c.appspot.com/o/home%2F2.png?alt=media&token=696bb535-2882-445a-887b-426b62c994be);
    background-position: center;
    background-repeat: no-repeat; 
    background-size: cover;
    z-index: 998;
`;

export const HeroItemSecond = styled.div`
    position: absolute;
    top: 100px;
    left: 400px;
    width: 20px;
    height: 20px;
    background-image: url(https://firebasestorage.googleapis.com/v0/b/pad-tech-c127c.appspot.com/o/home%2F4.png?alt=media&token=48d9734a-1849-422c-88da-942c0d24b1d1);
    background-position: center;
    background-repeat: no-repeat; 
    background-size: cover;
`;

export const HeroItemThird = styled.div`
    position: absolute;
    bottom: 120px;
    left: 500px;
    width: 25px;
    height: 25px;
    background-image: url(https://firebasestorage.googleapis.com/v0/b/pad-tech-c127c.appspot.com/o/home%2F3.png?alt=media&token=a96201ba-a8dc-4a2d-908e-bd15431aa337);
    background-position: center;
    background-repeat: no-repeat; 
    background-size: cover;
`;

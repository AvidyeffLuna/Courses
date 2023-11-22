import { createGlobalStyle } from "styled-components";
import { colors, font } from "../variables/defaultVariables";

import { navbarStyles } from "./core/navbar";
import { sidebarStyles } from "./core/sidebar";
import { mainStyles } from "./core/main";
import { typographyStyles } from "./core/typography";
import { cardStyles } from "./core/card";
import { inputStyles } from "./core/input";
import { paginationStyles } from "./core/pagination";
import { badgeStyles } from "./core/badge";
import { alertStyles } from "./core/alert";
import { buttonStyles } from "./core/buttons";
import { dropdownStyles } from "./core/dropdown";
import { offcanvasStyles } from "./core/offcanvas";
import { imageStyles } from "./core/image";
import { tooltipsStyles } from "./core/tooltips";
import { tableStyles } from "./core/table";
import { progressStyles } from "./core/progress";
import { tabsStyles } from "./core/tabs";
import { modalStyles } from "./core/modal";
import { toastStyles } from "./core/toast";
import { stepsStyles } from "./core/steps";
import { mapStyles } from "./core/map";
import { videoStyles } from "./core/video";
import { paddingStyles } from "./core/padding";
import { carouselStyles } from "./core/carousel";
import { spinnerStyles } from "./core/spinner";
import { iconStyles } from "./core/icons";
import { borderStyles } from "./core/border";
import { backgroundStyles } from "./core/background";
import { containerStyles } from "./core/container";

export const DefaultGlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${colors.body};
    font-family: ${font.family.primary};
  }

  a {
    font-family: ${font.family.secondary};
    color: ${colors.dark};
    text-decoration: none;

    &:hover {
      color: ${colors.primary.main};
    }
  }

  .a-primary {
    font-family: ${font.family.secondary} !important;
    color: ${colors.dark} !important;
    text-decoration: none !important;

    &:hover {
      color: ${colors.primary.main} !important;
    }
  }

  ${mainStyles};
  ${containerStyles};
  ${navbarStyles};
  ${sidebarStyles};
  ${typographyStyles};
  ${cardStyles};
  ${inputStyles};
  ${badgeStyles};
  ${alertStyles};
  ${buttonStyles};
  ${dropdownStyles};
  ${offcanvasStyles};
  ${imageStyles};
  ${tooltipsStyles};
  ${tableStyles};
  ${progressStyles};
  ${tabsStyles};
  ${modalStyles};
  ${toastStyles};
  ${paddingStyles};
  ${paginationStyles};
  ${stepsStyles};
  ${mapStyles};
  ${videoStyles};
  ${carouselStyles};
  ${spinnerStyles};
  ${iconStyles};
  ${borderStyles};
  ${backgroundStyles};
`;

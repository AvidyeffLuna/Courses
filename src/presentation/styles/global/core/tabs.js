import { colors } from '../../variables/defaultVariables';

export const tabsStyles = `
  .nav-tabs { 
    .nav-item {
      width: 150px;
    }

    .nav-link {
       color: ${colors.gray};
       font-size: 15px;
       font-weight: 500;
       border-radius: 0;
       border-top: 1px solid transparent;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
       transition: 0.1s;

       @media (max-width: 576px) {
          font-size: 12px;

          svg {
            height: 20px;
            width: 20px;
          }
        }

        &:hover {
          color: ${colors.primary.main};
            border-top: 1px solid transparent;
            border-left: 1px solid transparent;
            border-right: 1px solid transparent;
            border-bottom: 3px solid ${colors.primary.main};

            svg {
              fill: ${colors.primary.main};
            }
        }

       &.active {
           color: ${colors.primary.main};
           border: 1px solid transparent;
           border-bottom: 3px solid ${colors.primary.main};

           svg {
             fill: ${colors.primary.main};
           }
       }
    }

    &--complete {
        padding: 0;
        background-color: ${colors.secondary.main};
        border-bottom: 1px solid ${colors.secondary.main};
        transition: 0.5s;

        .nav-link {
            color: ${colors.white};
            padding: 15px 0;
            width: 100%;
            
            &:hover,
            &.active {
                color: ${colors.white};
                background-color: ${colors.primary.main};
            }
        }
    }

    &--md {
      .nav-item {
        width: 115px;
      }

      .nav-link {
       font-size: 14px;
      }
    }

    &--xs {
      .nav-item {
        width: 100px;
      }

      .nav-link {
       font-size: 13px;
      }
    }
  }
`;

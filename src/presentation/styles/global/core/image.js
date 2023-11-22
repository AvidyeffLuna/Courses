import { colors } from '../../variables/defaultVariables';

export const imageStyles = `
  .image {
      &-avatar {
        border-radius: 50%;
      }

      &-border {
        border-radius: 6px;
      }

      &-opacity {
        opacity: 60%;
        transition: 0.3s;

        &-hover {
          &:hover {
            opacity: 100%;
          }
        }
      }
  }

  .avatar-letters {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: ${colors.grey};

    &-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      border-radius: 50%;

      span {
        color: ${colors.white};
        font-size: 20px;
        font-weight: 600;
      }
    }

    &-primary {
      background-color: ${colors.primary.main};
    }

    &--xl {
      width: 150px;
      height: 150px;

      span {
        font-size: 40px;
      }
    }

    &--lg {
      width: 90px;
      height: 90px;

      span {
        font-size: 30px;
      }
    }

    &--md {
      width: 70px;
      height: 70px;

      span {
        font-size: 26px;
      }
    }

    &--sm {
      width: 45px;
      height: 45px;

      span {
        font-size: 22px;
      }
    }

    &--xs {
      width: 36px;
      height: 36px;

      span {
        font-size: 16px;
      }
    }
  }

  .avatar-group {
    display: flex;
    justify-content: flex-end;
    flex-direction: row-reverse;

    &-item {
      margin-right: -10px;

      .image {
        border: 2px solid ${colors.white} !important;
      }
    }
  }
}
`;

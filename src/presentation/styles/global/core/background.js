import { colors } from '../../variables/defaultVariables';

export const backgroundStyles = `
  .bg-body {
    background-color: ${colors.body} !important;

    &-gray {
      background-color: ${colors.bodyGray} !important;
    }
  }

  .bg-primary {
      background-color: ${colors.primary.main} !important;

      &-light {
        background-color: ${colors.primary.light} !important;
      }

      &-dark {
        background-color: ${colors.primary.dark} !important;
      }

      &-dark-50 {
        background-color: ${colors.primary['dark-50']} !important;
      }
  }

  .bg-secondary {
    background-color: ${colors.secondary.main} !important;

    &-light {
      background-color: ${colors.secondary.light} !important;
    }

    &-dark {
      background-color: ${colors.secondary.dark} !important;
    }

    &-dark-50 {
      background-color: ${colors.secondary['dark-50']} !important;
    }
  }

  .bg-success {
    background-color: ${colors.success.main} !important;
  }

  .bg-danger {
    background-color: ${colors.danger.main} !important;
  }

  .bg-info {
    background-color: ${colors.info.main} !important;
  }

  .bg-gray {
    background-color: ${colors.gray} !important;
  }

  .bg-grey {
    background-color: ${colors.grey} !important;
  }

  .bg-gray-opacity {
    background-color: rgba(0, 0, 0, .03);
  }

  .bg-dark {
    background-color: ${colors.dark};

    &-50 {
      background-color: ${colors['dark-50']} !important;
    }
  }
`;

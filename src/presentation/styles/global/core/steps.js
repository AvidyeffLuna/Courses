import { colors } from '../../variables/defaultVariables';

export const stepsStyles = `
    .steps {
        display: flex;
        justify-content: center;

        &-indicator {
            width: 150px;
            text-align: center;

            @media (max-width: 992px) {
                width: 100px;

                span {
                    font-size: 12px;
                }
            }

            .steps-circle {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
    
                &-icon {
                    padding: 5px 5px;
                    background-color: black;
                    border-radius: 2rem;
        
                    svg {
                        fill: ${colors.white};
                        width: 26px;
                        height: 26px;

                        @media (max-width: 992px) {
                            width: 22px;
                            height: 22px;
                        }
                    }

                    @media (max-width: 992px) {
                        padding: 2px 2px;
                    }
                }

                &-text {
                    padding: 7px 15px;
                    background-color: ${colors.secondary['light-50']};
                    border-radius: 2rem;
        
                    span {
                        color: ${colors.white};
                        width: 26px;
                        height: 26px;
                    }

                    @media (max-width: 992px) {
                        padding: 2px 10px;
                    }
                }
    
                &-progress {
                    position: absolute;
                    left: 90px;
                    width: 150px;
                    height: 5px;
                    background-color: ${colors.secondary['light-50']};

                    @media (max-width: 992px) {
                        width: 80px;
                        left: 60px;
                    }
                }
            }

            &--in-step {
                .steps-circle {
                    &-icon {
                        background-color: ${colors.secondary.main};
                
                        svg {
                            fill: ${colors.white};
                        }
                    }

                    &-text {
                        background-color: ${colors.secondary.main};
                
                        span {
                            color: ${colors.white};
                        }
                    }
        
                    &-progress {
                        background-color: ${colors.secondary.main};
                    }
                }
            }

            &--finish {
                .steps-circle {
                    &-icon {
                        background-color: ${colors.primary.main};
                
                        svg {
                            fill: ${colors.white};
                        }
                    }

                    &-text {
                        background-color: ${colors.primary.main};
                
                        span {
                            color: ${colors.white};
                        }
                    }
        
                    &-progress {
                        background-color: ${colors.primary.main};
                    }
                }
            }
        }
    }
`;

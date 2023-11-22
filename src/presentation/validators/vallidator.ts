interface IFieldValidatorError {
    code: string;
    message: string;
}

export interface IFieldValidator {
    isValid: boolean;
    error?: IFieldValidatorError | null; 
}
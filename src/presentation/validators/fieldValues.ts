export interface IFieldOption {
    value: string;
    text: string;
}

export interface IFieldValue {
    fieldId: number;
    name: string;
    type: string;
    placeholder: string;
    errorMessage?: string | null;
    label: string;
    options?: IFieldOption[] | null;
    row?: any | null;
    text?: string | null;
    icon?: any;
    title?: string | null;
}
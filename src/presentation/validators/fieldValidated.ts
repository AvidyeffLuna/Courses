export const onNumberValidated = (value: string): boolean => {
    if (!/^[0-9\b]+$/.test(value)) return true;

    return false;
}

export const onNumberDecimalsValidated = (value: string): boolean => {
    if (!/^\d*\.?\d*$/.test(value)) return true;

    return false;
}

export const getNumberFormat = (obj: {value: number; lang?: string | null; style: string; currency?: string | null;}) => {
    const formatter = new Intl.NumberFormat(obj.lang ?? "en-US", {
        style: obj.style,
        currency: obj.currency ?? "USD",
    });

    return formatter.format(obj.value);
}
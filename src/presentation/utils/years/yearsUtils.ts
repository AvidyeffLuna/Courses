export const getYearsList = (obj: {minYear: number, maxYear: number}) => {
    const years: any = [];

    if (obj.minYear >= obj.maxYear) return years;

    for (let i = obj.minYear; i < obj.maxYear; i++) {
        years.push({ value: i.toString(), text: i.toString() });        
    }

    years.sort();

    return years;
}

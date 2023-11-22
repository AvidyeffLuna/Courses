type TStatusEnum = {
    [key: string]: string;
}

export const statusColorsEnum: TStatusEnum = {
    "pending": "warning",
    "approved": "success",
    "rejected": "danger",
}

export const salesStatusEnum: TStatusEnum = {
    "pending": "Pendiente por revisión",
    "approved": "Aprobado",
    "rejected": "Rechazado",
}
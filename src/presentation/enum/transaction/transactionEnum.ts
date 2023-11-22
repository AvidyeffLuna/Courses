type TTransactionStatusEnum = {
    [key: string]: string;
}

export const transactionStatusEnum: TTransactionStatusEnum = {
    "pending": "Pendiente por revisión",
    "approved": "Aprobada",
    "rejected": "Rechazada",
}

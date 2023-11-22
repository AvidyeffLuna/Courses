import { ISale } from "domain/core/entities/saleEntity";

export function saleRealmDataToEntity(data: any): ISale {
  return {
    saleId: data?._id ? data?._id.toString() : "",
    userId: data?.userId ?? "",
    courses: data?.courses ?? null,
    paymentMethod: data?.paymentMethod ?? "",
    documentNumber: data?.documentNumber ?? "",
    documentType:  data?.documentType ?? "",
    phoneNumber: data?.phoneNumber ?? "",
    mainPictureUrl: data?.mainPictureUrl ?? "",
    phoneOperatorCode: data?.phoneOperatorCode ?? "",
    reference: data?.reference ?? "",
    amount: data?.amount ?? 0,
    amountBs: data?.amountBs ?? 0,
    status: data?.status ?? "",
    type: data?.type ?? "",
    createdAt: data?.createdAt ?? new Date(),
    rejectedAt: data?.rejectedAt ?? null,
    approvedAt: data?.approvedAt ?? null,
  } as ISale;
}

export function saleFromRealmToDocumentData(sale: ISale): any {
  const documentData = {
    _id: sale.saleId,
    userId: sale.userId,
    courses: sale.courses,
    paymentMethod: sale.paymentMethod,
    amount: sale.amount,
    amountBs: sale.amountBs,
    status: sale.status,
    type: sale.type,
    documentNumber: sale.documentNumber,
    documentType: sale.documentType,
    phoneNumber: sale.phoneNumber,
    phoneOperatorCode: sale.phoneOperatorCode,
    mainPictureUrl: sale.mainPictureUrl,
    reference: sale.reference,
    createdAt: sale.createdAt,
    approvedAt: sale.approvedAt,
    rejectedAt: sale.rejectedAt,
  };

  return documentData;
}

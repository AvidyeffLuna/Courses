import { ITeacher } from "domain/core/entities/teacherEntity";

export function teacherRealmDataToEntity(data: any): ITeacher {
  return {
    teacherId: data?._id ?? "",
    firstName: data?.firstName ?? "",
    lastName: data?.lastName ?? "",
    profilePictureUrl: data?.profilePictureUrl ?? null,
    email: data?.email ?? "",
    provider: data?.provider ?? "",
    phoneCountryCode: data?.phoneCountryCode ?? 0,
    phoneOperatorCode: data?.phoneOperatorCode ?? 0,
    phoneNumber: data?.phoneNumber ?? "",
    genrer: data?.genrer ?? "",
    documentType: data?.documentType ?? "",
    documentNumber: data?.documentNumber ?? "",
    messagingToken: data?.messagingToken ?? "",
    createdAt: data?.createdAt ?? null,
    updatedAt: data?.updatedAt ?? null,
    lastSessionAt: data?.lastSessionAt ?? null,
  } as ITeacher;
}

export function teacherFromRealmToDocumentData(teacher: ITeacher): any {
  const teacherDocumentData = {
    _id: teacher.teacherId,
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    profilePictureUrl: teacher.profilePictureUrl,
    email: teacher.email,
    provider: teacher.provider,
    phoneCountryCode: teacher.phoneCountryCode,
    phoneOperatorCode: teacher.phoneOperatorCode,
    phoneNumber: teacher.phoneNumber,
    genrer: teacher.genrer,
    messagingToken: teacher.messagingToken,
    documentType: teacher.documentType,
    documentNumber: teacher.documentNumber,
    createdAt: teacher.createdAt,
    updatedAt: teacher?.updatedAt,
    lastSessionAt: teacher?.lastSessionAt,
  };

  return teacherDocumentData;
}
